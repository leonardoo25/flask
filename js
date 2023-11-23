function adicionarTarefa() {
  var entradaTarefa = document.getElementById("entrada-tarefa");
  var listaTarefas = document.getElementById("lista-tarefas");

  if (entradaTarefa.value.trim() !== "") {
    var linhaTarefa = document.createElement("tr");
    linhaTarefa.className = "item-tarefa";
    linhaTarefa.innerHTML =
      '<td>' + entradaTarefa.value + '</td>' +
      '<td>' +
      '<button onclick="editarTarefa(this)">Editar</button>' +
      '<button onclick="removerTarefa(this)">Excluir</button>' +
      '</td>';
    listaTarefas.appendChild(linhaTarefa);
    entradaTarefa.value = "";
  }
}

function removerTarefa(botao) {
  var linhaTarefa = botao.closest("tr");
  linhaTarefa.parentNode.removeChild(linhaTarefa);
}

function editarTarefa(taskId) {
  console.log('Editando tarefa:', taskId);
  var novoNomeTarefa = prompt('Editar tarefa:');
  if (novoNomeTarefa !== null) {
    editarTarefaNoServidor(taskId, novoNomeTarefa);
  }
}

function editarTarefaNoServidor(taskId, novoNomeTarefa) {
  fetch(`http://localhost:5000/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description: novoNomeTarefa }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição PUT');
      }
      return response.json();
    })
    .then(data => {
      console.log('Tarefa editada:', data);
      carregarTarefas();
    })
    .catch(error => {
      console.error('Erro na requisição PUT:', error);
    });
}
