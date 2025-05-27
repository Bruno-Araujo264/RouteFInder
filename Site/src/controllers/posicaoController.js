var posicaoModel = require("../models/posicaoModel");

function cadastrarPosicao(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomePosicaoServer;
    var descricao = req.body.descricaoPosicaoServer;
    var nivelAcesso = req.body.nivelAcessoServer;


    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (descricao == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (nivelAcesso == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo posicaoModel.js
        posicaoModel.cadastrarPosicao(nome, descricao)
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

function alterarSenha(req, res) {
    var email = req.body.emailServer
    var senha = req.body.senhaServer

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.alterarSenha(email, senha)
            .then(
                function (resposta) {
                    res.json(resposta)
                }
            )
            .catch(
                function (erro) {
                    console.log(erro)
                    console.log(`Teve um erro ao realizar a alteração de senha! Erro: ${erro.sqlMessage}`)
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

function coletarEmail(req, res) {
    var email = req.params.email

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        usuarioModel.coletarEmail(email)
            .then( 
                function (resultado) {
                    console.log('Retornei o Model')
                    res.status(200).json({
                        resultado: resultado
                    });
                }
            )
            .catch(
                function (erro) {
                    console.log(erro)
                    console.log(`Teve um erro ao realizar a coleta do Email! Erro: ${erro.sqlMessage}`)
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

module.exports = {
    cadastrarPosicao,
}