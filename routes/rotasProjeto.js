const { Router } = require("express");

const {
  getProjetoUsuarioPorId,
  addProjeto,
  deleteProjeto,
  updateProjeto,
  getProjetoPorId,
  addUsuarioById,
} = require("../controllers/projetoController");
const { verificaJWT } = require("../controllers/segurancaController");
const rotasProjeto = new Router();

rotasProjeto
  .route("/projeto/:id")
  .post(verificaJWT, addProjeto)
  .delete(verificaJWT, deleteProjeto)
  .put(verificaJWT, updateProjeto);
rotasProjeto.route("/projeto/:id").get(verificaJWT, getProjetoPorId);
rotasProjeto
  .route("/projetoUsuario/:id")
  .get(verificaJWT, getProjetoUsuarioPorId);
rotasProjeto.route("/projetoAddUsuario").post(verificaJWT, addUsuarioById);

module.exports = { rotasProjeto };
