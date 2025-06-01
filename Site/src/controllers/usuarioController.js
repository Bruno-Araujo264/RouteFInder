var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            id: resultadoAutenticar[0].id_user,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].name_user,
                            senha: resultadoAutenticar[0].senha,
                            empresa: resultadoAutenticar[0].fk_company,
                            posicao: resultadoAutenticar[0].fk_position,
                            nivelAcesso: resultadoAutenticar[0].fk_access_level

                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var empresa = req.body.empresaServer


    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if ( empresa == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, empresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
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

function buscarProfissionaisDaEmpresa(req, res){
  const idEmpresa = req.params.empresaId
  console.log(idEmpresa)
  
    if (!idEmpresa) {
      return res.status(400).send("O ID da empresa é obrigatório!");
    }

     usuarioModel.buscarProfissionaisDaEmpresa(idEmpresa).then(function (resultado) {
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
        console.log("nenhuma usuário foi encontrado")
        res.status(200).json([]); // Retorna array vazio, evitando erro no front
        }

     })


}

module.exports = {
    autenticar,
    cadastrar,
    alterarSenha,
    coletarEmail,
    buscarProfissionaisDaEmpresa
}