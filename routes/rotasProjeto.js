const { Router } = require("express");

const {
  getProjetoUsuarioPorId,
  addProjeto,
  deleteProjeto,
  updateProjeto,
  getProjetoPorId,
  adicionarUsuarioPorEmail,
  addUsuarioById,
} = require("../controllers/projetoController");
const rotasProjeto = new Router();

rotasProjeto
  .route("/projeto/:id")
  .post(addProjeto)
  .delete(deleteProjeto)
  .put(updateProjeto);
rotasProjeto.route("/projeto/:id").get(getProjetoPorId);
rotasProjeto.route("/projetoUsuario/:id").get(getProjetoUsuarioPorId);
rotasProjeto.route("/projetoAddUsuario").post(addUsuarioById);

module.exports = { rotasProjeto };
