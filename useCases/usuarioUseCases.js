const { pool } = require("../config");
const Usuario = require("../entities/usuario");

const getUsuarioDB = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM USUARIO ORDER BY ID");
    return rows.map(
      (usuario) =>
        new Usuario(usuario.id, usuario.nome, usuario.email, usuario.senha)
    );
  } catch (err) {
    throw "Erro : " + err;
  }
};

const addUsuarioDB = async (body) => {
  try {
    const { nome, email, senha } = body;
    const results = await pool.query(
      `INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email, senha`,
      [nome, email, senha]
    );
    const usuario = results.rows[0];
    return new Usuario(usuario.id, usuario.nome, usuario.email, usuario.senha);
  } catch (err) {
    throw "Erro ao inserir usuário: " + err;
  }
};

const updateUsuarioDB = async (body) => {
  try {
    const { id, nome, email, senha } = body;
    const results = await pool.query(
      `UPDATE usuario SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING id, nome, email, senha`,
      [nome, email, senha, id]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${id} para ser alterado`;
    }
    const usuario = results.rows[0];
    return new Usuario(usuario.id, usuario.nome, usuario.email, usuario.senha);
  } catch (err) {
    throw "Erro ao alterar o usuário: " + err;
  }
};

const deleteUsuarioDB = async (id) => {
  try {
    const results = await pool.query(`DELETE FROM usuario WHERE id = $1`, [id]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${id} para ser removido`;
    } else {
      return "Usuário removido com sucesso";
    }
  } catch (err) {
    throw "Erro ao remover usuário: " + err;
  }
};

const getUsuarioByEmailDB = async (body) => {
  try {
    const {email} = body;
    const results = await pool.query(`SELECT id FROM usuario WHERE email = $1`, [email]);
    if (results.rowCount == 0) {
      throw 'Nenhum usuário encontrado com esse email';
    } else {
      return results.rows[0].id;
    }
  } catch (err) {
    throw "Erro ao buscar usuário: " + err;
  }
}

module.exports = {
  getUsuarioDB,
  addUsuarioDB,
  deleteUsuarioDB,
  updateUsuarioDB,
  getUsuarioByEmailDB
};
