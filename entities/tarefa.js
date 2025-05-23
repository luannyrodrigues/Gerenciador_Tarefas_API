class Tarefa {
  constructor(
    id,
    titulo,
    descricao,
    status,
    dtCriacao,
    idUsuario,
    idProjeto
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.status = status;
    this.dtCriacao = dtCriacao;
    this.idUsuario = idUsuario;
    this.idProjeto = idProjeto;
  }
}

module.exports = {
  Tarefa,
};
