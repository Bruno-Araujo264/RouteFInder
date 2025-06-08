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
    const region = req.params.region;
    dashboardModel.carregarTop5Ruas(region)
        .then(
            function (resultado) {
                console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                res.json(resultado);
                }
        );
}

function carregarHoraTamRuas(req, res) {
    const region = req.params.region;
    dashboardModel.carregarHoraTamRuas(region)
        .then(
            function (resultado) {
                console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                res.json(resultado);
                }
        );
}

function carregarTotalCongestionamentoDia(req, res) {
    const region = req.params.region;
    dashboardModel.carregarTotalCongestionamentoDia(region)
        .then(
            function (resultado) {
                console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                res.json(resultado);
                }
        )
}

function obterMaiorHorarioCongestionamento(req, res){
    const region = req.params.region
    const rua = req.query.rua
    dashboardModel.obterMaiorHorarioCongestionamento(region, rua)
        .then(
            function (resultado) {
                console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                res.json(resultado);
                }
        )
}


function obterMenorHorarioCongestionamento(req, res){
    const region = req.params.region
    const rua = req.query.rua
    dashboardModel.obterMenorHorarioCongestionamento(region, rua)
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