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

// function autenticar(req, res) {
//     var address = req.body.addressServer;
//     var CNPJ = req.body.CNPJServer;

//     if (address == undefined) {
//         res.status(400).send("Seu address está undefined!");
//     } else if (CNPJ == undefined) {
//         res.status(400).send("Sua CNPJ está indefinida!");
//     } else {
//         dashboardModel.autenticar(address, CNPJ)
//             .then(
//                 function (resultadoAutenticar) {
//                     console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
//                     console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

//                     if (resultadoAutenticar.length == 1) {
//                         console.log(resultadoAutenticar);
//                         res.json({
//                             id: resultadoAutenticar[0].id_user,
//                             address: resultadoAutenticar[0].address,
//                             corporate_name: resultadoAutenticar[0].name_user,
//                             CNPJ: resultadoAutenticar[0].CNPJ,

//                         });
//                     } else if (resultadoAutenticar.length == 0) {
//                         res.status(403).send("address e/ou CNPJ inválido(s)");
//                     } else {
//                         res.status(403).send("Mais de um usuário com o mesmo login e CNPJ!");
//                     }
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }

// }

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

function carregarRuas(req, res) {

    dashboardModel.carregarRuas()
        .then(
            function (resultado) {
                console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                res.json(resultado);
                }
        );
}

function carregarTop5Ruas(req, res) {

    dashboardModel.carregarTop5Ruas()
        .then(
            function (resultado) {
                console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                res.json(resultado);
                }
        );
}

function obterMaiorHorarioCongestionamento(req, res){
    const region = req.params.region
    dashboardModel.obterMaiorHorarioCongestionamento(region)
        .then(
            function (resultado) {
                console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                res.json(resultado);
                }
        )
}

function obterMenorHorarioCongestionamento(req, res){
    const region = req.params.region
    dashboardModel.obterMenorHorarioCongestionamento(region)
        .then(
            function (resultado) {
                console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                res.json(resultado);
                }
        )
}

module.exports = {
    cadastrarEmpresa,
    editarEmpresa,
    excluirEmpresa,
    chamarEmpresa,
    carregarRuas,
    carregarTop5Ruas,
    obterMaiorHorarioCongestionamento,
    obterMenorHorarioCongestionamento
}