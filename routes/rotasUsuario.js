const { Router } = require("express");

const {
  getUsuario,
  addUsuario,
  deleteUsuario,
  updateUsuario,
  getUsuarioByEmail,
} = require("../controllers/usuarioController");
const { verificaJWT } = require("../controllers/segurancaController");

const rotasUsuario = new Router();

rotasUsuario.route("/usuario").get(verificaJWT, getUsuario).post(addUsuario);

rotasUsuario.route("/usuario/:id").delete(verificaJWT, deleteUsuario);

rotasUsuario.route("/getUsuarioByEmail").post(verificaJWT, getUsuarioByEmail);

module.exports = { rotasUsuario };
