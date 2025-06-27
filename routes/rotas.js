const { Router } = require("express");

const { rotasUsuario } = require("./rotasUsuario");
const { rotasProjeto } = require("./rotasProjeto");
const { rotasTarefa } = require("./rotasTarefa");
const { login } = require("../controllers/segurancaController");

const rotas = new Router();

rotas.use(rotasUsuario);
rotas.use(rotasProjeto);
rotas.use(rotasTarefa);
rotas.route("/login").post(login);

module.exports = rotas;
