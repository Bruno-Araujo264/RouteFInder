var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

//Recebendo os dados do html e direcionando para a função cadastrar de dashboardController.js
router.post("/cadastrarEmpresa", function (req, res) {
    dashboardController.cadastrarEmpresa(req, res);
})

router.post("/editarEmpresa", function (req, res) {
    dashboardController.editarEmpresa(req, res);
})

router.delete("/excluirEmpresa", function (req, res) {
    dashboardController.excluirEmpresa(req, res);
})



module.exports = router;