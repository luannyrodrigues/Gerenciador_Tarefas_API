const {
  getTarefaPorProjetoDB,
  addTarefaDB,
  updateTarefaDB,
  deleteTarefaDB,
  getTarefaPorIdDB,
} = require("../useCases/tarefaUseCases");

const getTarefaPorProjeto = async (request, response) => {
  await getTarefaPorProjetoDB(request.params.projeto)
    .then((data) => response.status(200).json(data))
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: "Erro ao consultar tarefas: " + err,
      })
    );
};

const addTarefa = async (request, response) => {
  await addTarefaDB(request.body)
    .then((data) =>
      response.status(201).json({
        status: "success",
        message: "Tarefa criada",
        objeto: data,
      })
    )
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    );
};

const updateTarefa = async (request, response) => {
  await updateTarefaDB(request.body)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Tarefa atualizada",
        objeto: data,
      })
    )
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    );
};

const deleteTarefa = async (request, response) => {
  await deleteTarefaDB(request.params.id)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: data,
      })
    )
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    );
};

const getTarefaPorId = async (request, response) => {
  await getTarefaPorIdDB(request.params.id)
    .then((data) => {
      if (data) {
        response.status(200).json(data);
      } else {
        response.status(404).json({
          status: "error",
          message: "Projeto não encontrado",
        });
      }
    })
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    );
};

module.exports = {
  getTarefaPorProjeto,
  addTarefa,
  updateTarefa,
  deleteTarefa,
  getTarefaPorId,
};
