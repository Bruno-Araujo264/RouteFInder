var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarEmpresa(corporate_name, address, CNPJ) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", corporate_name, address, CNPJ);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO company (corporate_name, address, CNPJ) VALUES ('${corporate_name}', '${address}', '${CNPJ}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function excluirEmpresa(CNPJ) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarEmpresa(): ", CNPJ)
    var instrucaoSql = `
        delete from company WHERE CNPJ = '${CNPJ}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarEmpresa(corporate_name, address, CNPJ) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarEmpresa():", corporate_name, address, CNPJ);
    console.log("Modificando na tabela company:",corporate_name ,address, CNPJ);

    var instrucaoSql = `
           UPDATE company SET address = '${address}', corporate_name = '${corporate_name}', CNPJ = '${CNPJ}' WHERE CNPJ = '${CNPJ}';
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function chamarEmpresa(corporate_name) {
    console.log("Tô buscando a empresa");
    
    var instrucaoSql = `
        select * from company WHERE corporate_name = '${corporate_name}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarEmpresa,
    editarEmpresa,
    excluirEmpresa,
    chamarEmpresa
};