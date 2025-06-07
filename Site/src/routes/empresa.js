var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.patch("/editarEmpresa", function (req, res) {
    empresaController.editarEmpresa(req, res);
})

router.post("/chamarEmpresa", function (req, res) {
    empresaController.chamarEmpresa(req, res);
})

//Recebendo os dados do html e direcionando para a função cadastrar de empresaController.js
router.post("/cadastrarEmpresa", function (req, res) {
    empresaController.cadastrarEmpresa(req, res);
})

router.delete("/excluirEmpresa", function (req, res) {
    empresaController.excluirEmpresa(req, res);
})

module.exports = router;