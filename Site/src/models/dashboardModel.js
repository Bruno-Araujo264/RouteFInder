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
    console.log("Estou coletando as ruas")
    var instrucaoSql = `
    -- Dia
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
        t.date_time BETWEEN DATE(NOW() - INTERVAL 9 YEAR)
                        AND DATE(NOW() - INTERVAL 9 YEAR) + INTERVAL 1 DAY - INTERVAL 1 SECOND
    GROUP BY 
        p.region

    UNION ALL

    -- Semana (últimos 7 dias a partir de hoje - 9 anos atrás)
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
        t.date_time BETWEEN NOW() - INTERVAL 9 YEAR - INTERVAL 6 DAY
                        AND NOW() - INTERVAL 9 YEAR
    GROUP BY 
        p.region

    UNION ALL

    -- Mês (últimos 30 dias a partir de hoje - 9 anos atrás)
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
        t.date_time BETWEEN NOW() - INTERVAL 9 YEAR - INTERVAL 30 DAY
                        AND NOW() - INTERVAL 9 YEAR
    GROUP BY 
        p.region;

    `; //Utilizo uma tabela derivada, para selecionar a data limite
        //UNION ALL - Junta os dados dos diferentes selects como um resultado só
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function carregarTop5Ruas(){
    console.log("Estou carregando as top 5 ruas mais congestionadas");
    
    var instrucaoSql = `
        SELECT 
            p.name_passage, p.region, MAX(t.jam_size) AS max_jam
        FROM 
            passage p
        JOIN 
            direction d ON d.fk_passage = p.id_passage
        JOIN 
            segment s ON s.fk_direction = d.id_direction
        JOIN 
            timestamp t ON t.fk_segment = s.id_segment
        WHERE 
            t.date_time 
        BETWEEN 
            DATE(NOW() - INTERVAL 9 YEAR) 
        AND 
            NOW() - INTERVAL 9 YEAR
        GROUP BY 
            p.name_passage, p.region
        ORDER BY 
            max_jam DESC
        LIMIT 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarEmpresa,
    editarEmpresa,
    excluirEmpresa,
    chamarEmpresa,
    carregarRuas,
    carregarTop5Ruas
};
