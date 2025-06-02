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
    var empresa = req.body.fk_empresa;
    var listaUsuarios = req.body.usuarios; // array com IDs dos usuários que ficaram vinculados

    if (!idPosicao || !nome || !descricao || !nivelAcesso) {
        res.status(400).send("Parâmetros ausentes!");
    } else {
        posicaoModel.atualizarPosicao(empresa, idPosicao, nome, descricao, nivelAcesso, listaUsuarios)
            .then(
                resultado => res.json(resultado),
                erro => {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            );
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

module.exports = {
    cadastrarPosicao,
    buscarPosicoesPorEmpresa,
    atualizarPosicao
}