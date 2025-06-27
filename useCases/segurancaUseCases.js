const { pool } = require("../config");
const Usuario = require("../entities/usuario");

const autenticaUsuarioDB = async (body) => {
  try {
    const { email, senha } = body;
    const results = await pool.query(
      `SELECT * FROM usuario WHERE email = $1 AND senha = $2`,
      [email, senha]
    );

    if (results.rowCount == 0) {
      throw "Usuário ou senha inválidos";
    }
    const usuario = results.rows[0];
    return new Usuario(
      usuario.id,
      usuario.nome,
      usuario.email,
      usuario.senha,
      usuario.tipo
    );
  } catch (err) {
    throw "Erro ao autenticar o usuário: " + err;
  }
};

module.exports = {
  autenticaUsuarioDB,
};
