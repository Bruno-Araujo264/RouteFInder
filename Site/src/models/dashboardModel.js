var database = require("../database/config")



// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql

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

function carregarHoraTamRuas(){
    console.log("Estou carregando as top 5 ruas mais congestionadas");
    
    var instrucaoSql = `
        SELECT 
            p.name_passage, -- Nome da via (passagem)
            DATE_FORMAT(t.date_time, '%H:%i') AS hora, -- Extrai apenas a hora e minutos do timestamp
            ROUND(AVG(t.jam_size)) AS avg_jam_size -- Calcula a média do congestionamento, arredondada
        FROM 
            passage p
        JOIN 
            direction d ON d.fk_passage = p.id_passage -- Relaciona a via com as direções
        JOIN 
            segment s ON s.fk_direction = d.id_direction -- Relaciona a direção com os segmentos
        JOIN 
            timestamp t ON t.fk_segment = s.id_segment -- Relaciona o segmento com os registros de tempo e congestionamento
        JOIN (
            -- Subquery que pega as 5 vias com maior valor de congestionamento em um período de 9 anos atrás
            SELECT 
                p2.name_passage, -- Nome da via
                MAX(t2.jam_size) AS max_jam -- Maior congestionamento registrado nessa via
            FROM 
                passage p2
            JOIN 
                direction d2 ON d2.fk_passage = p2.id_passage
            JOIN 
                segment s2 ON s2.fk_direction = d2.id_direction
            JOIN 
                timestamp t2 ON t2.fk_segment = s2.id_segment
            WHERE 
                t2.date_time BETWEEN DATE(NOW() - INTERVAL 9 YEAR) AND NOW() - INTERVAL 9 YEAR -- Filtra para dados exatamente de 9 anos atrás
            GROUP BY 
                p2.name_passage -- Agrupa por via
            ORDER BY 
                max_jam DESC -- Ordena da maior para a menor
            LIMIT 5 -- Pega apenas as 5 maiores
        ) AS top5 ON top5.name_passage = p.name_passage -- Relaciona os resultados da subquery com a tabela principal, pegando apenas as top 5 vias
        WHERE 
            t.date_time BETWEEN DATE(NOW() - INTERVAL 9 YEAR) AND NOW() - INTERVAL 9 YEAR -- Aplica o mesmo filtro de tempo para o restante dos dados
        GROUP BY 
            p.name_passage, -- Agrupa por nome da via
            hora -- E por hora (já extraída do timestamp)
        ORDER BY 
            p.name_passage, -- Ordena pelo nome da via
            hora; -- E pela hora do dia

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function carregarTotalCongestionamentoDia(){
    console.log("Estou carregando o total de congestionamentos do dia");
    
    var instrucaoSql = `
    SELECT 
        SUM(t.jam_size) AS total_congestionamento
    FROM 
        timestamp t
    WHERE 
        t.date_time BETWEEN 
            CURDATE() - INTERVAL 9 YEAR
            AND 
            NOW() - INTERVAL 9 YEAR;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    carregarRuas,
    carregarTop5Ruas,
    carregarHoraTamRuas,
    carregarTotalCongestionamentoDia
};
