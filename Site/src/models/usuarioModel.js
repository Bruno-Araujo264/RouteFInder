var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id_user, name_user, email, fk_company, fk_position, fk_access_level FROM user WHERE email = '${email}' AND password = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, empresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, empresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO user (name_user, email, password, fk_company, fk_access_level) VALUES ('${nome}', '${email}', '${senha}', '${empresa}', 1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alterarSenha(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function AlterarSenha():", email, senha);
    console.log("Modificando na tabela user:", email, senha);

    var instrucaoSql = `
           UPDATE user SET password = '${senha}' WHERE email = '${email}';
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function coletarEmail(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function AlterarSenha():");

    var instrucaoSql = `
           select name_user, email from user where email = '${email}' limit 1;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Busca posições associadas a uma empresa
function buscarProfissionaisDaEmpresa(idEmpresa) {
  const instrucao = `
    SELECT
        u.id_user,
        u.name_user,
        u.email,
        u.fk_access_level,
        u.fk_position,
        u.fk_company,
        
        p.name AS nome_posicao,
        al.name AS nome_nivel_acesso,
        c.corporate_name AS nome_empresa

    FROM
        routeFinder.user AS u

    -- JOIN com a posição
    LEFT JOIN routeFinder.position AS p
        ON u.fk_position = p.id_position

    -- JOIN com o nível de acesso
    LEFT JOIN routeFinder.access_level AS al
        ON u.fk_access_level = al.id_access_level

    -- JOIN com a empresa
    LEFT JOIN routeFinder.company AS c
        ON u.fk_company = c.id_company

    WHERE
        u.fk_company = ${idEmpresa};
  `;
  return database.executar(instrucao);
}

function deletarUsuario(idUsuario){
    console.log("ACESSEI O USUÁRIO MODEL - deletarUsuario");
     const instrucaoSql = ` DELETE FROM routeFinder.user WHERE id_user = ${idUsuario};
    `;
    return database.executar(instrucaoSql);

}

function atualizarDadosUsuario(idUsuario, nome, email, posicao, nivelAcesso){
    var instrucaoSql = `
            UPDATE user 
            SET name_user = '${nome}', email = '${email}', fk_access_level = ${nivelAcesso}
            WHERE id_user = ${idUsuario};
        `;
        console.log("Executando SQL: " + instrucaoSql);
        return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    alterarSenha,
    coletarEmail,
    buscarProfissionaisDaEmpresa,
    deletarUsuario,
    atualizarDadosUsuario
};
