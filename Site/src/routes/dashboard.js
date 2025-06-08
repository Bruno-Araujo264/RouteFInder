var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/carregarRuas/:region", function (req, res) {
    dashboardController.carregarRuas(req, res);
});

router.get("/carregarTop5Ruas", function (req, res) {
    dashboardController.carregarTop5Ruas(req, res);
})

router.get("/carregarHoraTamRuas", function (req, res) {
    dashboardController.carregarHoraTamRuas(req, res);
})

router.get("/carregarTotalCongestionamentoDia", function (req, res) {
    dashboardController.carregarTotalCongestionamentoDia(req, res);
})

router.get("/obterMaiorHorarioCongestionamento/:region", function (req, res) {
    dashboardController.obterMaiorHorarioCongestionamento(req, res);
})

router.get("/obterMenorHorarioCongestionamento/:region", function (req, res) {
    dashboardController.obterMenorHorarioCongestionamento(req, res);
})

module.exports = router;