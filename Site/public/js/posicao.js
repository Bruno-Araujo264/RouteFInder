NOME_USUARIO_FORMULARIO.innerHTML = sessionStorage.NOME_USUARIO

// Função para redirecionar para a Tela da Posição específica
    function abrirPosicao(id_position) {
      sessionStorage.setItem("ID_POSICAO_ATUAL", id_position); // Armazena o ID da posição atual no SessionStorage
      window.location.href = "posicaoEditar.html";
    }
// função que redireciona para tela de criação de Posição
    function redirecionarParaCadastroPosicao() {
      window.location.href = "posicaoCriarNovo.html";
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
            card.className = 'cargo';
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

    function carregarProfissionais(empresaId) {
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
            card.className = 'cargo';
            // card.onclick = () => abrirPosicao(posicao.id_position);
            card.innerHTML = `
              <span>${profissional.name_user}</span>
              <div>
                    ${profissional.fk_position}
              </div>
            `;
            tabela.appendChild(card);
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