const { pool } = require("../config");
const { Projeto } = require("../entities/projeto");

const addProjetoDB = async (body, id) => {
  try {
    const { nome, descricao } = body;
    const results = await pool.query(
      `INSERT INTO projeto (nome, descricao) VALUES ($1, $2) RETURNING id, nome, descricao`,
      [nome, descricao]
    );
    const projeto = results.rows[0];
    await pool.query(
      `INSERT INTO projeto_usuario (id_projeto, id_usuario) VALUES ($1, $2) RETURNING id, id_projeto, id_usuario`,
      [projeto.id, id]
    );
    return new Projeto(projeto.id, projeto.nome, projeto.descricao);
  } catch (err) {
    throw "Erro ao inserir projeto: " + err;
  }
};

const getProjetoUsuarioPorIdDB = async (id) => {
  try {
    const { rows } = await pool.query(
      `SELECT projeto.id, projeto.nome, projeto.descricao 
       FROM projeto_usuario 
       INNER JOIN projeto ON projeto.id = id_projeto 
       WHERE id_usuario = $1
       ORDER BY projeto.id`,
      [id]
    );

    return rows.map((projeto) => {
      return new Projeto(projeto.id, projeto.nome, projeto.descricao);
    });
  } catch (err) {
    throw "Erro : " + err;
  }
};

const updateProjetoDB = async (body) => {
  try {
    const { nome, descricao, id } = body;
    const { rows } = await pool.query(
      `UPDATE projeto SET nome = $1, descricao = $2 WHERE id = $3 RETURNING id, nome, descricao`,
      [nome, descricao, id]
    );

    if (rows.length === 0) return null;
    const projeto = rows[0];
    return new Projeto(projeto.id, projeto.nome, projeto.descricao);
  } catch (err) {
    throw "Erro ao atualizar projeto: " + err;
  }
};

const deleteProjetoDB = async (id) => {
  try {
    await pool.query(`DELETE FROM projeto_usuario WHERE id_projeto = $1`, [id]);
    await pool.query(`DELETE FROM projeto WHERE id = $1`, [id]);
    return true;
  } catch (err) {
    throw "Erro ao deletar projeto: " + err;
  }
};

const getProjetoPorIdDB = async (idProjeto) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, nome, descricao FROM projeto WHERE id = $1`,
      [idProjeto]
    );

    if (rows.length === 0) return null;
    const projeto = rows[0];
    return new Projeto(projeto.id, projeto.nome, projeto.descricao);
  } catch (err) {
    throw "Erro ao buscar projeto por ID: " + err;
  }
};

// - clica no botao de add usuario, aparece um formulario para informar o email do usuario que quer adicionar
// - se o email informado for de um usuario existente, ele passará a fazer parte do projeto, senão vai dizer 
// que o usuario nao foi encontrado.
// - o campo de inserir usuario faz uma busca na tabela de usuarios pelo email, tipo a do login, se achar vai pegar o id.
// - projetoUsuario: id do projeto atual e id do usuario informado no campo

const adicionarUsuarioPorEmailDB = async (email, id_projeto) => {
  try {
    const usuarioResult = await pool.query(
      "SELECT id FROM usuario WHERE email = $1",
      [email]
    );

    if (usuarioResult.rowCount === 0) {
      return { sucesso: false, mensagem: "Usuário não encontrado." };
    }

    const id_usuario = usuarioResult.rows[0].id;

    await pool.query(
      `INSERT INTO projeto_usuario (id_projeto, id_usuario)
       VALUES ($1, $2)`,
      [id_projeto, id_usuario]
    );

    return { sucesso: true, mensagem: "Usuário adicionado ao projeto com sucesso." };

  } catch (err) {
    throw "Erro ao adicionar usuário ao projeto: " + err;
  }
};

const addUsuarioByIdDB = async (body) => {
  const {idProjeto, idUsuario} = body; 
  try {
    const result = await pool.query(`INSERT INTO projeto_usuario (id_projeto, id_usuario) VALUES ($1, $2)`, [idProjeto, idUsuario]);    
    return result;
  } catch (err) {
    throw "Erro ao adicionar usuário ao projeto: " + err;
  }
}

module.exports = {
  getProjetoUsuarioPorIdDB,
  addProjetoDB,
  deleteProjetoDB,
  updateProjetoDB,
  getProjetoPorIdDB,
  addUsuarioByIdDB
};
