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

function editarTarefa(botao) {
  var linhaTarefa = botao.closest("tr");
  var nomeAntigoTarefa = linhaTarefa.querySelector("td:first-child").innerText;
  
  var novoNomeTarefa = prompt('Editar tarefa:', nomeAntigoTarefa);
  if (novoNomeTarefa !== null) {
    linhaTarefa.querySelector("td:first-child").innerText = novoNomeTarefa;
  }
}
