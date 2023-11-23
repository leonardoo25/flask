document.addEventListener('DOMContentLoaded', function () {
  console.log('Página carregada');
  carregarTarefas();

  function carregarTarefas() {
    console.log('Carregando tarefas...');
    fetch('http://localhost:5000/tasks')
      .then(response => response.json())
      .then(data => {
        console.log('Tarefas carregadas:', data);
        document.getElementById('lista-tarefas').innerHTML = '';

        for (const task of data) {
          adicionarTarefaNaLista(task.description, task.id);
        }
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  }

  function adicionarTarefaNaLista(tarefa, taskId) {
    var listaTarefas = document.getElementById('lista-tarefas');
    var linhaTarefa = document.createElement('tr');
    linhaTarefa.innerHTML = '<td>' + tarefa + '</td>' +
      '<td>' +
      '<button onclick="editarTarefa(' + taskId + ')">Editar</button>' +
      '<button onclick="removerTarefa(' + taskId + ')">Excluir</button>' +
      '</td>';
    listaTarefas.appendChild(linhaTarefa);
  }

  function adicionarTarefa() {
    console.log('Adicionando tarefa...');
    var entradaTarefa = document.getElementById('entrada-tarefa');
    var novaTarefa = { "description": entradaTarefa.value };

    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novaTarefa),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Tarefa adicionada:', data);
        carregarTarefas();
      })
      .catch(error => {
        console.error('Erro na requisição POST:', error);
      });

    entradaTarefa.value = '';
  }

  function removerTarefa(taskId) {
    console.log('Removendo tarefa:', taskId);
    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Tarefa removida:', data);
        carregarTarefas();
      })
      .catch(error => {
        console.error('Erro na requisição DELETE:', error);
      });
  }

  function editarTarefa(taskId) {
    console.log('Editando tarefa:', taskId);
    var novoNomeTarefa = prompt('Editar tarefa:');
    if (novoNomeTarefa !== null) {
      fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "description": novoNomeTarefa }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Tarefa editada:', data);
          carregarTarefas();
        })
        .catch(error => {
          console.error('Erro na requisição PUT:', error);
        });
    }
  }
});
