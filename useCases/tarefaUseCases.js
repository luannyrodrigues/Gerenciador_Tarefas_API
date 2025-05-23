const { pool } = require("../config");
const { Tarefa } = require("../entities/tarefa");

const getTarefaPorProjetoDB = async (projeto) => {
  try {
    const { rows } = await pool.query(
      `select * from tarefa where id_projeto = $1`,
      [projeto]
    );

    return rows.map((tarefa) => {
      return new Tarefa(
        tarefa.id,
        tarefa.titulo,
        tarefa.descricao,
        tarefa.status,
        tarefa.dtCriacao,
        tarefa.idUsuario,
        tarefa.idProjeto
      );
    });
  } catch (err) {
    throw "Erro : " + err;
  }
};

const addTarefaDB = async (body, id) => {
  try {
    const { titulo, descricao, status, idUsuario, idProjeto } = body;
    const results = await pool.query(
      `INSERT INTO tarefa (titulo, descricao, status, id_usuario, id_projeto) VALUES ($1, $2, $3, $4, $5) 
        RETURNING *`,
      [titulo, descricao, status, idUsuario, idProjeto]
    );
    const tarefa = results.rows[0];
    return new Tarefa(
      tarefa.id,
      tarefa.titulo,
      tarefa.descricao,
      tarefa.status,
      tarefa.dtCriacao,
      tarefa.idUsuario,
      tarefa.idProjeto
    );
  } catch (err) {
    throw "Erro ao inserir tarefa: " + err;
  }
};

const updateTarefaDB = async (body) => {
  try {
    const { id, titulo, descricao, status, idUsuario, idProjeto } = body;
    const results = await pool.query(
      `UPDATE tarefa SET titulo = $1, descricao = $2, status = $3, id_usuario = $4, id_projeto = $5 WHERE id = $6 RETURNING *`,
      [titulo, descricao, status, idUsuario, idProjeto, id]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${id} para ser alterado`;
    }
    const tarefa = results.rows[0];
    return new Tarefa(
      tarefa.id,
      tarefa.titulo,
      tarefa.descricao,
      tarefa.status,
      tarefa.dtCriacao,
      tarefa.idUsuario,
      tarefa.idProjeto
    );
  } catch (err) {
    throw "Erro ao alterar a tarefa: " + err;
  }
};

const deleteTarefaDB = async (id) => {
  try {
    const results = await pool.query(`DELETE FROM tarefa WHERE id = $1`, [id]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${id} para ser removido`;
    } else {
      return "Tarefa removida com sucesso";
    }
  } catch (err) {
    throw "Erro ao remover tarefa: " + err;
  }
};

const getTarefaPorIdDB = async (idTarefa) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM tarefa WHERE id = $1`, [
      idTarefa,
    ]);

    if (rows.length === 0) return null;
    const tarefa = rows[0];
    return new Tarefa(
      tarefa.id,
      tarefa.titulo,
      tarefa.descricao,
      tarefa.status,
      tarefa.dtCriacao,
      tarefa.id_usuario,
      tarefa.id_projeto
    );
  } catch (err) {
    throw "Erro ao buscar tarefa por ID: " + err;
  }
};

module.exports = {
  getTarefaPorProjetoDB,
  addTarefaDB,
  updateTarefaDB,
  deleteTarefaDB,
  getTarefaPorIdDB,
};
