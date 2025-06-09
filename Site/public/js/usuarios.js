
// Função para redirecionar para a Tela da Posição específica
    function abrirUsuario(id_usuario) {
      sessionStorage.setItem("ID_USUARIO_ATUAL", id_usuario); // Armazena o ID da posição atual no SessionStorage
      window.location.reload();;
    }

//função para carregar informações do usuário da Sessão
    function carregarInfoUsuarioAtual(id_usuario){

      NOME_USUARIO_ATUAL.innerHTML = 
      EMAIL_USUARIO_FORMULARIO.innerHTML = sessionStorage.EMAIL_USUARIO;
      EMPRESA_USUARIO_FORMULARIO.innerHTML = sessionStorage.ID_EMPRESA;


    }
// Função para carregar a pocições da empresa
    function carregarPosicoes(empresaId) {
      empresaId = sessionStorage.getItem("ID_EMPRESA")
      const apiUrl = `/posicao/${empresaId}`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(posicoes => {
          const container = document.getElementById('containerCards');
  
          // Limpa o container antes de inserir os novos dados
          container.innerHTML = '';
        
  
          // Adiciona os cards das posições retornadas pela API
          posicoes.forEach(posicao => {
            const card = document.createElement('div');
            card.className = 'box';
            card.onclick = () => abrirPosicao(posicao.id_position);
            card.innerHTML = `
              <span>${posicao.name}</span>
            `;
            container.appendChild(card);
          });
  
        //   // Adiciona o card "Adicionar Sala"
        //   const addCard = document.createElement('div');
        //   addCard.className = 'kpi2';
        //   addCard.onclick = () => redirecionarParaCadastroPosicao();
        //   addCard.innerHTML = `
        //     <h1>Adicionar Posição</h1>
        //     <img src="../assets/icon/sinal-de-adicao.png" alt="Adicionar Posição">
        //   `;
        //   container.appendChild(addCard);
        })
        .catch(error => {
          console.error('Erro ao carregar posições:', error);
        });
    }

    function carregarProfissionaisParaEdicao(empresaId) {
      //puxar os ids dos spans
      const NOME_USUARIO_ATUAL = document.getElementById("NOME_USUARIO_ATUAL");
      const EMAIL_USUARIO_ATUAL = document.getElementById("EMAIL_USUARIO_ATUAL");
      const nivelAcesso = document.getElementById("nivelAcesso");
      const POSICAO_USUARIO_ATUAL = document.getElementById("POSICAO_USUARIO_ATUAL");
     

        // document.getElementById('listaTodosProfissionaisEmpresa').style.display = "block";
      empresaId = sessionStorage.getItem("ID_EMPRESA")
      const apiUrl = `/usuarios/${empresaId}`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(profissionais => {
          const tabela = document.getElementById('tabelaProfissionais');
            
          // Limpa a tabela antes de adicionar os profissionais
            tabela.innerHTML = '';
          // Adiciona os usuários a lista 
            profissionais.forEach(profissional => {
            console.log(`Nome: ${profissional.name_user}, ID Usuário: ${profissional.id_user}`);
            const card = document.createElement('div');
            card.className = 'box';
            // card.onclick = () => abrirPosicao(posicao.id_position);
            card.innerHTML = `
            <i onclick="abrirUsuario(${profissional.id_user})" class="fa-regular fa-pen-to-square"></i>
              <span>${profissional.name_user}</span>
              <div class="cargo">
                    ${profissional.nome_posicao}
              </div>
            `;
            tabela.appendChild(card);

            if(profissional.id_user == sessionStorage.ID_USUARIO_ATUAL){
              NOME_USUARIO_ATUAL.value = profissional.name_user;
              EMAIL_USUARIO_ATUAL.value = profissional.email;
              POSICAO_USUARIO_ATUAL.value = profissional.nome_posicao;
              nivelAcesso.value = profissional.fk_access_level;

            }
          });

          // profissionais.forEach(profissional => {
          //   console.log(`Nome: ${profissional.name_user}, ID Usuário: ${profissional.id_user}`);
          //   // tabela.innerHTML += `
          //   //     <tr>
          //   //         <td>${profissional.id_user}</td>
          //   //         <td>${profissional.name_user}</td> 
          //   //     </tr>
          //   // `;
            
          //   const linha = document.createElement('div');

          //    linha.innerHTML = `
          //     <span>${profissional.name_user}</span>
          //     <div>${profissional.fk_position}</div>
          //     `;

          //     tabela.appendChild(linha);
          // });

        })
        .catch(error => {
          console.error('Erro ao carregar profissionais:', error);
        });
      }
    
function excluirUsuario() {
    const idUsuarioAtual = sessionStorage.getItem("ID_USUARIO_ATUAL");

    if (!confirm("Tem certeza que deseja excluir este usuário? Essa ação não poderá ser desfeita.")) {
        return; // Cancela se o usuário desistir
    }

    fetch(`/usuarios/deletarUsuario/${idUsuarioAtual}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir o usuário');
        }
        alert('Usuário excluído com sucesso!');
        // Redireciona para a página principal após 1s
        setTimeout(() => {
            window.location.href = "./posicaoNovo.html";
        }, 1000);
    })
    .catch(error => {
        console.error('Erro ao excluir o usuário:', error);
        alert('Erro ao excluir o usuário. Verifique se há usuários vinculados.');
    });
  }

function editarUsuario() {
    const empresaId = sessionStorage.getItem("ID_EMPRESA");
    const idUsuarioAtual = sessionStorage.getItem("ID_USUARIO_ATUAL");

    // Ler dados dos inputs
    const nome = document.getElementById('NOME_USUARIO_ATUAL').value;
    const email = document.getElementById('EMAIL_USUARIO_ATUAL').value;
    const posicao = document.getElementById('POSICAO_USUARIO_ATUAL').value;
    const nivelAcesso = document.getElementById('nivelAcesso').value;

    // 1️⃣ Atualizar os dados do usuário
    const dadosPosicao = {
        nomeServer: nome,
        emailServer: email,
        posicaoServer: posicao,
        nivelAcessoServer: Number(nivelAcesso)
    };

    fetch(`/usuarios/atualizarUsuario/${idUsuarioAtual}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dadosPosicao)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar usuário');
        }else{
          alert('Usuário attualizado com sucesso!');
        // Redireciona para a página principal após 1s
        setTimeout(() => {
            window.location.href = "./usuarioEditar.html";
        }, 1000);
        }
        console.log('Usuário atualizada com sucesso');


    })

    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao atualizar');
    });

}
