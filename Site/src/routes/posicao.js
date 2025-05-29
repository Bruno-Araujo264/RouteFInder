var express = require("express");
var router = express.Router();

var posicaoController = require("../controllers/posicaoController");

//Recebendo os dados do html e direcionando para a função cadastrar de posicaoController.js
router.post("/cadastrarPosicao", function (req, res) {
    posicaoController.cadastrarPosicao(req, res);
})

router.post("/alterarDescricao", function (req, res) {
    posicaoController.alterarDescricao(req, res);
})

// Rota para buscar salas de maturação por ID da empresa
router.get("/:empresaId", function (req, res) {
  console.log("Ta indo até aqui")
  posicaoController.buscarPosicoesPorEmpresa(req, res);
});

router.get("/coletarUsuariosDaPosicao", function (req, res) {
    posciaoController.coletarUsuariosDaPosicao(req, res);
})

module.exports = router;