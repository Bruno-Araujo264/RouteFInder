var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.patch("/editarEmpresa", function (req, res) {
    dashboardController.editarEmpresa(req, res);
})

router.post("/chamarEmpresa", function (req, res) {
    dashboardController.chamarEmpresa(req, res);
})

//Recebendo os dados do html e direcionando para a função cadastrar de dashboardController.js
router.post("/cadastrarEmpresa", function (req, res) {
    dashboardController.cadastrarEmpresa(req, res);
})

router.delete("/excluirEmpresa", function (req, res) {
    dashboardController.excluirEmpresa(req, res);
})

router.get("/carregarRuas", function (req, res) {
    dashboardController.carregarRuas(req, res);
})

router.get("/carregarTop5Ruas", function (req, res) {
    dashboardController.carregarTop5Ruas(req, res);
})


module.exports = router;