var dashboardModel = require("../models/dashboardModel");

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

function carregarHoraTamRuas(req, res) {

    dashboardModel.carregarHoraTamRuas()
        .then(
            function (resultado) {
                console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                res.json(resultado);
                }
        );
}

module.exports = {
    carregarRuas,
    carregarTop5Ruas,
    carregarHoraTamRuas
}