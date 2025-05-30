var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarPosicao(nome, descricao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarPosicao():", nome, descricao);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO triade.position (name, description) VALUES ('${nome}', '${descricao}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Busca posições associadas a uma empresa
function buscarPosicoesPorEmpresa(idEmpresa) {
  const instrucao = `
    SELECT * FROM position WHERE fkEmpresa = ${idEmpresa};
  `;
  return database.executar(instrucao);
}

// Função para alterar os dados da Descrição daquela Posição
function alterarDescricao(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function AlterarSenha():", email, senha);
    console.log("Modificando na tabela user:", email, senha);

    var instrucaoSql = `
           UPDATE user SET password = '${senha}' WHERE email = '${email}';
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function coletarUsuariosDaPosicao(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function AlterarSenha():");

    var instrucaoSql = `
           select name_user, email from user where email = '${email}' limit 1;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrarPosicao,
    alterarDescricao,
    coletarUsuariosDaPosicao,
    buscarPosicoesPorEmpresa
};
