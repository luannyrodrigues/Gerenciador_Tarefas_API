const { Projeto } = require("../entities/projeto");
const {
  getProjetoUsuarioPorIdDB,
  addProjetoDB,
  deleteProjetoDB,
  updateProjetoDB,
  getProjetoPorIdDB,
  adicionarUsuarioPorEmailDB,
  addUsuarioByIdDB,
} = require("../useCases/projetoUseCases");

const addProjeto = async (request, response) => {
  await addProjetoDB(request.body, request.params.id)
    .then((data) =>
      response.status(201).json({
        status: "success",
        message: "Projeto criado",
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

const getProjetoUsuarioPorId = async (request, response) => {
  await getProjetoUsuarioPorIdDB(request.params.id)
    .then((data) => response.status(200).json(data))
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: "Erro ao consultar projetos: " + err,
      })
    );
};

const updateProjeto = async (request, response) => {
  await updateProjetoDB(request.body)
    .then((data) => {
      if (data) {
        response.status(200).json({
          status: "success",
          message: "Projeto atualizado",
          objeto: data,
        });
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
        message: "Erro ao atualizar projeto: " + err,
      })
    );
};

const deleteProjeto = async (request, response) => {
  await deleteProjetoDB(request.params.id)
    .then(() =>
      response.status(200).json({
        status: "success",
        message: "Projeto deletado",
      })
    )
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: "Erro ao deletar projeto: " + err,
      })
    );
};

const getProjetoPorId = async (request, response) => {
  await getProjetoPorIdDB(request.params.id)
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
        message: "Erro ao buscar projeto: " + err,
      })
    );
};

const adicionarUsuarioPorEmail = async (request, response) => {
  const { email, id } = request.body;

  await adicionarUsuarioPorEmailDB(email, id)
    .then((resultado) => {
      if (resultado.sucesso) {
        response.status(201).json({
          status: "success",
          message: resultado.mensagem,
        });
      } else {
        response.status(404).json({
          status: "error",
          message: resultado.mensagem,
        });
      }
    })
    .catch((err) =>
      response.status(500).json({
        status: "error",
        message: "Erro ao adicionar usuário ao projeto: " + err,
      })
    );
};

const addUsuarioById = async (request, response) => {
  await addUsuarioByIdDB(request.body)
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
        message: "Erro ao adicionar usuário: " + err,
      })
    );
}

module.exports = {
  getProjetoUsuarioPorId,
  addProjeto,
  updateProjeto,
  deleteProjeto,
  getProjetoPorId,
  addUsuarioById
};
