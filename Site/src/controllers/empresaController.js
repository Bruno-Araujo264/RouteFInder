var dashboardModel = require("../models/dashboardModel");

function cadastrarEmpresa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var corporate_name = req.body.corporateNameServer;
    var address = req.body.addressServer;
    var CNPJ = req.body.cnpjServer;


    // Faça as validações dos valores
    if (corporate_name == undefined) {
        res.status(400).send("Seu corporate_name está undefined!");
    } else if (address == undefined) {
        res.status(400).send("Seu address está undefined!");
    } else if (CNPJ == undefined) {
        res.status(400).send("Sua CNPJ está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo dashboardModel.js
        dashboardModel.cadastrarEmpresa(corporate_name, address, CNPJ)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao adicionar Empresa! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editarEmpresa(req, res) {

    console.log("REQ BODY: ", req.body)
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var corporate_name = req.body.corporateNameServer;
    var address = req.body.addressServer;
    var CNPJ = req.body.cnpjServer;


    // Faça as validações dos valores
    if (corporate_name == undefined) {
        res.status(400).send("Seu corporate_name está undefined!");
    } else if (address == undefined) {
        res.status(400).send("Seu address está undefined!");
    } else if (CNPJ == undefined) {
        res.status(400).send("Sua CNPJ está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo dashboardModel.js
        dashboardModel.editarEmpresa(corporate_name, address, CNPJ)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao editar Empresa! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function excluirEmpresa(req, res) { 
    var CNPJ = req.body.cnpjServer;

    if (CNPJ == undefined) {
        res.status(400).send("Seu CNPJ está undefined!");
    } else {
        dashboardModel.excluirEmpresa(CNPJ)
            .then( 
                function (resultado) {
                    console.log('Empresa Excluida')
                    res.status(200).json({
                        resultado: resultado
                    });
                }
            )
            .catch(
                function (erro) {
                    console.log(erro)
                    console.log(`Teve um erro ao deletar a empresa! Erro: ${erro.sqlMessage}`)
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

function chamarEmpresa(req, res) {
    var corporate_name = req.body.corporateNameServer
    dashboardModel.chamarEmpresa(corporate_name)
        .then(
            function (resultado) {  
                console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                res.json(resultado);
                }
        );
}

module.exports = {
    cadastrarEmpresa,
    editarEmpresa,
    excluirEmpresa,
    chamarEmpresa
}