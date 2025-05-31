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
           UPDATE company SET address = '${address}', corporate_name = '${corporate_name}' WHERE CNPJ = '${CNPJ}';
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

function carregarRuas() {
    var instrucaoSql = `
        SELECT 
    'Dia' AS periodo,
    p.region, 
    COUNT(DISTINCT s.id_segment) AS total_ruas
FROM 
    timestamp t
    JOIN segment s ON t.fk_segment = s.id_segment
    JOIN direction d ON s.fk_direction = d.id_direction
    JOIN passage p ON d.fk_passage = p.id_passage
WHERE 
    t.date_time LIKE '2016-04-11%'
GROUP BY 
    p.region

UNION ALL

SELECT 
    'Semana' AS periodo,
    p.region, 
    COUNT(DISTINCT s.id_segment) AS total_ruas
FROM 
    timestamp t
    JOIN segment s ON t.fk_segment = s.id_segment
    JOIN direction d ON s.fk_direction = d.id_direction
    JOIN passage p ON d.fk_passage = p.id_passage
WHERE 
    t.date_time BETWEEN '2016-04-11' AND '2016-04-17 23:59:59'
GROUP BY 
    p.region

UNION ALL

SELECT 
    'Mês' AS periodo,
    p.region, 
    COUNT(DISTINCT s.id_segment) AS total_ruas
FROM 
    timestamp t
    JOIN segment s ON t.fk_segment = s.id_segment
    JOIN direction d ON s.fk_direction = d.id_direction
    JOIN passage p ON d.fk_passage = p.id_passage
WHERE 
    t.date_time BETWEEN '2016-04-01' AND '2016-04-30 23:59:59'
GROUP BY 
    p.region;

    `; //Utilizo uma tabela derivada, para selecionar a data limite
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarEmpresa,
    editarEmpresa,
    excluirEmpresa,
    chamarEmpresa,
    carregarRuas
};
