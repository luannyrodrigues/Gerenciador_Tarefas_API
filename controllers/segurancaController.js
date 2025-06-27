const { autenticaUsuarioDB } = require("../useCases/segurancaUseCases");
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");

const login = async (request, response) => {
  await autenticaUsuarioDB(request.body)
    .then((usuario) => {
      const token = jwt.sign({ usuario }, process.env.SECRET, {
        expiresIn: 7200, //expira em 2h
      });
      return response.json({
        auth: true,
        token: token,
        id: usuario.id,
        nome: usuario.nome,
        tipo: usuario.tipo,
      });
    })
    .catch((err) => response.status(401).json({ auth: false, message: err }));
};

// verificação do token
function verificaJWT(request, response, next) {
  const token = request.headers["authorization"];
  if (!token)
    return response
      .status(401)
      .json({ auth: false, message: "Nenhum token recebido." });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return response
        .status(401)
        .json({ auth: false, message: "Erro ao autenticar o token." });
    // Se o token for válido, salva no request para uso posterior
    request.usuario = decoded.usuario;
    next();
  });
}

module.exports = {
  verificaJWT,
  login,
};
