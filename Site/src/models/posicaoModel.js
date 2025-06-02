var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarPosicao(nome, descricao, idEmpresa, nivelAcesso) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarPosicao():", nome, descricao, idEmpresa, nivelAcesso);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO routeFinder.position (name, description, fk_company, fk_access_level) VALUES ('${nome}', '${descricao}', '${idEmpresa}','${nivelAcesso}');

        
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Busca posições associadas a uma empresa
function buscarPosicoesPorEmpresa(idEmpresa) {
  const instrucao = `
    SELECT
        id_position,
        name,
        description,
        fk_access_level
    FROM
        routeFinder.position
    WHERE
        fk_company = ${idEmpresa};
  `;
  return database.executar(instrucao);
}

// Função para atualizar os dados daquela Posição
function atualizarPosicao(empresa, idPosicao, nome, descricao, nivelAcesso, listaUsuarios) {
    console.log('Atualizando posição:', idPosicao);

    // Monta os comandos SQL:
    return new Promise((resolve, reject) => {
        var instrucaoSql = `
            UPDATE position 
            SET name = '${nome}', description = '${descricao}', fk_access_level = ${nivelAcesso}
            WHERE id_position = ${idPosicao};
        `;

        // 1. Atualiza os dados da posição
        // 2. Remove fk_position de todos os usuários que estavam nessa posição
        // 3. Atribui fk_position para os usuários selecionados

        instrucaoSql += `
            UPDATE user SET fk_position = NULL WHERE fk_position = ${idPosicao};
        `;

        if (listaUsuarios.length > 0) {
            instrucaoSql += `
                UPDATE user SET fk_position = ${idPosicao}
                WHERE id_user IN (${listaUsuarios.join(',')});
            `;
        }

        console.log("Executando SQL:\n", instrucaoSql);
        return database.executar(instrucaoSql)
            .then(resolve)
            .catch(reject);
    });
}

function coletarUsuariosDaPosicao(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function AlterarSenha():");

    var instrucaoSql = `
           select name_user, email from user where email = '${email}' limit 1;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function associarPosicaoEAcessoAosUsuarios(idPosicao, usuarios) {
    console.log("ACESSEI O POSIÇÃO MODEL - associarUsuariosComAcesso");

    const usuariosFormatados = usuarios.join(', ');

    const instrucaoSql = `
        UPDATE user
        SET fk_position = ${idPosicao}, 
            fk_access_level = (
                SELECT fk_access_level 
                FROM position 
                WHERE id_position = ${idPosicao}
            )
        WHERE id_user IN (${usuariosFormatados});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}



module.exports = {
    cadastrarPosicao,
    atualizarPosicao,
    coletarUsuariosDaPosicao,
    buscarPosicoesPorEmpresa,
    associarPosicaoEAcessoAosUsuarios
};
