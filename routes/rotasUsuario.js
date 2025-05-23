const { Router } = require("express");

const {
  getUsuario,
  addUsuario,
  deleteUsuario,
  updateUsuario,
  getUsuarioByEmail,
} = require("../controllers/usuarioController");

const rotasUsuario = new Router();

rotasUsuario.route("/usuario")
  .get(getUsuario)
  .post(addUsuario);
  //.put(updateUsuario);

rotasUsuario.route("/usuario/:id")
  .delete(deleteUsuario);

rotasUsuario.route("/getUsuarioByEmail")
  .post(getUsuarioByEmail);

module.exports = { rotasUsuario };
