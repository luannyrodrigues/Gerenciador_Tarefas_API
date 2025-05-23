const { Router } = require("express");
const {
  getTarefaPorProjeto,
  addTarefa,
  updateTarefa,
  deleteTarefa,
  getTarefaPorId,
} = require("../controllers/tarefaController");

const rotasTarefa = new Router();

rotasTarefa.route("/tarefaProjeto/:projeto").get(getTarefaPorProjeto);

rotasTarefa.route("/tarefa").post(addTarefa).put(updateTarefa);

rotasTarefa.route("/tarefa/:id").delete(deleteTarefa).get(getTarefaPorId);

module.exports = { rotasTarefa };
