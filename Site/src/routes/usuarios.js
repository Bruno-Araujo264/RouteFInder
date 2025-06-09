var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
})

router.post("/alterarSenha", function (req, res) {
    usuarioController.alterarSenha(req, res);
})

router.get("/coletarEmail/:email", function (req, res) {
    usuarioController.coletarEmail(req, res);
})

//Rota para atualizar dados do usuário atual
router.put("/atualizarUsuario/:idUsuarioAtual", function (req, res) {
    usuarioController.atualizarUsuario(req, res);
})

//Rota para deletar o usuário especifico
router.delete("/deletarUsuario/:idUsuarioAtual", function (req, res) {
    usuarioController.deletarUsuario(req, res);
});

// Rota para buscar usuários por ID da empresa
router.get("/:empresaId", function (req, res) {
  console.log("Ta indo até aqui - usuários")
  usuarioController.buscarProfissionaisDaEmpresa(req, res);
});

module.exports = router;