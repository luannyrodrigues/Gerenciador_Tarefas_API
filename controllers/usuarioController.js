const {
  getUsuarioDB,
  addUsuarioDB,
  deleteUsuarioDB,
  updateUsuarioDB,
  getUsuarioByEmailDB,
} = require("../useCases/usuarioUseCases");

const getUsuario = async (request, response) => {
  await getUsuarioDB()
    .then((data) => response.status(200).json(data))
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: "Erro ao consultar usuários: " + err,
      })
    );
};

const addUsuario = async (request, response) => {
  await addUsuarioDB(request.body)
    .then((data) =>
      response.status(201).json({
        status: "success",
        message: "Usuário criado",
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

const updateUsuario = async (request, response) => {
  await updateUsuarioDB(request.body)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Usuário atualizado",
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

const deleteUsuario = async (request, response) => {
  await deleteUsuarioDB(request.params.id)
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

const getUsuarioByEmail = async (request, response) => {
  await getUsuarioByEmailDB(request.body)
    .then((data) =>
      response.status(200).json(data)
    )
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    ); 
}

module.exports = {
  getUsuario,
  addUsuario,
  deleteUsuario,
  updateUsuario,
  getUsuarioByEmail
};
