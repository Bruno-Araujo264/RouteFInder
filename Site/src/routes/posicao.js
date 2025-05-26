var express = require("express");
var router = express.Router();

var posicaoController = require("../controllers/posicaoController");

//Recebendo os dados do html e direcionando para a função cadastrar de posicaoController.js
router.post("/cadastrarPosicao", function (req, res) {
    posicaoController.cadastrarPosicao(req, res);
})

router.post("/alterarDescricao", function (req, res) {
    usuarioController.alterarDescricao(req, res);
})

router.get("/coletarUsuariosDaPosicao", function (req, res) {
    usuarioController.coletarUsuariosDaPosicao(req, res);
})

module.exports = router;