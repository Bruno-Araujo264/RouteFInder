var posicaoModel = require("../models/posicaoModel");

function cadastrarPosicao(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomePosicaoServer;
    var descricao = req.body.descricaoPosicaoServer;
    var idEmpresa = req.body.idEmpresaServer;
    var nivelAcesso = req.body.nivelAcessoServer;
    var usuarios = req.body.usuariosServer;


    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (descricao == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else if (nivelAcesso == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo posicaoModel.js
        posicaoModel.cadastrarPosicao(nome, descricao, idEmpresa, nivelAcesso)
            .then(resultado => {
                    const idPosicao = resultado.insertId;
                    console.log("ESSE é o ID-posição",idPosicao,"esses são os usuários",usuarios);
                return posicaoModel.associarPosicaoEAcessoAosUsuarios(idPosicao, usuarios);
                
            })
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro da Posição! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizarPosicao(req, res) {
    var idPosicao = req.params.idPosicaoAtual;
    var nome = req.body.name;
    var descricao = req.body.description;
    var nivelAcesso = req.body.fk_access_level;
    var usuarios = req.body.usuarios;

    if (!nome) {
        res.status(400).send("Nome está undefined!");
    } else if (!descricao) {
        res.status(400).send("Descrição está undefined!");
    } else if (nivelAcesso === undefined) {
        res.status(400).send("Nível de acesso está undefined!");
    } else {
        posicaoModel.atualizarDadosPosicao(idPosicao, nome, descricao, nivelAcesso)
            .then(() => posicaoModel.desvincularUsuariosDaPosicao(idPosicao))
            .then(() => {
                if (usuarios.length > 0) {
                    return posicaoModel.vincularUsuariosNaPosicao(idPosicao, usuarios,nivelAcesso);
                }
                return Promise.resolve();
            })
            .then(resultado => {
                res.status(200).json({
                    message: "Posição atualizada com sucesso!",
                    resultado: resultado
                });
            })
            .catch(erro => {
                console.log("Erro ao atualizar posição: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}


function buscarPosicoesPorEmpresa(req, res){
  const idEmpresa = req.params.empresaId
  console.log(idEmpresa)
  
    if (!idEmpresa) {
      return res.status(400).send("O ID da empresa é obrigatório!");
    }

     posicaoModel.buscarPosicoesPorEmpresa(idEmpresa).then(function (resultado) {
    //    if (resultado.length > 0) {
    //     console.log("foi aqui",resultado)
    //      res.status(200).json(resultado);
    //    } else {
    //      res.status(204).send("Nenhuma sala encontrada para a empresa especificada.");
    //    }

       if (resultado.length > 0) {
        console.log("foi aqui",resultado)
        res.status(200).json(resultado);
        } else {
        console.log("nenhuma posição foi encontrada")
        res.status(200).json([]); // Retorna array vazio, evitando erro no front
        }

     })


}

function deletarPosicao(req, res) {
    var idPosicao = req.params.idPosicaoAtual;

    if (!idPosicao) {
        return res.status(400).send("ID da posição está undefined!");
    }

    // 1️ Primeiro, desvincula todos os usuários dessa posição
    posicaoModel.desvincularUsuariosDaPosicao(idPosicao)
        .then(() => {
            // 2️ Depois, deleta a posição
            return posicaoModel.deletarPosicao(idPosicao);
        })
        .then(resultado => {
            res.status(200).json({
                message: "Posição excluída com sucesso!",
                resultado: resultado
            });
        })
        .catch(erro => {
            console.error("Erro ao excluir posição:", erro);
            res.status(500).json({
                message: "Erro ao excluir a posição.",
                erro: erro.sqlMessage || erro
            });
        });
}

module.exports = {
    deletarPosicao,
    cadastrarPosicao,
    buscarPosicoesPorEmpresa,
    atualizarPosicao
}