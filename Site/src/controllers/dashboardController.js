var dashboardModel = require("../models/dashboardModel");

function carregarRuas(req, res) {
    const region = req.params.region;

    
        dashboardModel.carregarRuas(region)
            .then(resultado => {
                console.log(`Resultados (com filtro ${region}): ${JSON.stringify(resultado)}`);
                res.json(resultado);
            })
            .catch(erro => {
                console.error(erro);
                res.status(500).send(erro);
            });
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

function carregarHoraTamRuas(req, res) {

    dashboardModel.carregarHoraTamRuas()
        .then(
            function (resultado) {
                console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                res.json(resultado);
                }
        );
}

function carregarTotalCongestionamentoDia(req, res) {

    dashboardModel.carregarTotalCongestionamentoDia()
        .then(
            function (resultado) {
                console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                res.json(resultado);
                }
        )
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
    carregarRuas,
    carregarTop5Ruas,
    carregarHoraTamRuas,
    carregarTotalCongestionamentoDia,
    obterMaiorHorarioCongestionamento,
    obterMenorHorarioCongestionamento
}