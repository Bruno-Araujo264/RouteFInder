var express = require("express");
var router = express.Router();

var posicaoController = require("../controllers/posicaoController");

//Recebendo os dados do html e direcionando para a função cadastrar de posicaoController.js
router.post("/cadastrarPosicao", function (req, res) {
    posicaoController.cadastrarPosicao(req, res);
})

//Rota para atualizar dados da posição atual
router.put("/atualizarPosicao/:idPosicaoAtual", function (req, res) {
    posicaoController.atualizarPosicao(req, res);
})

//Rota para deletar a posição especifica
router.delete("/deletarPosicao/:idPosicao", function (req, res) {
    posicaoController.deletarPosicao(req, res);
});


// Rota para buscar posições por ID da empresa
router.get("/:empresaId", function (req, res) {
  console.log("Ta indo até aqui")
  posicaoController.buscarPosicoesPorEmpresa(req, res);
});

router.get("/coletarUsuariosDaPosicao", function (req, res) {
    posicaoController.coletarUsuariosDaPosicao(req, res);
})


module.exports = router;