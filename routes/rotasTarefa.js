const { Router } = require("express");
const {
  getTarefaPorProjeto,
  addTarefa,
  updateTarefa,
  deleteTarefa,
  getTarefaPorId,
} = require("../controllers/tarefaController");
const { verificaJWT } = require("../controllers/segurancaController");

const rotasTarefa = new Router();

rotasTarefa
  .route("/tarefaProjeto/:projeto")
  .get(verificaJWT, getTarefaPorProjeto);

rotasTarefa.route("/tarefa").post(addTarefa).put(verificaJWT, updateTarefa);

rotasTarefa
  .route("/tarefa/:id")
  .delete(deleteTarefa)
  .get(verificaJWT, getTarefaPorId);

module.exports = { rotasTarefa };
