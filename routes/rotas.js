const { Router } = require("express");

const { rotasUsuario } = require("./rotasUsuario");
const { rotasProjeto } = require("./rotasProjeto");
const { rotasTarefa } = require("./rotasTarefa");

const rotas = new Router();

rotas.use(rotasUsuario);
rotas.use(rotasProjeto);
rotas.use(rotasTarefa);

module.exports = rotas;
