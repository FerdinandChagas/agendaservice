document.addEventListener("DOMContentLoaded", function() {
    let token = localStorage.getItem('token'); // Obtém o token do armazenamento local

    if (token) {
        // Fazendo uma solicitação GET para a API de categorias
        fetch('http://localhost:8000/api/agendamentos/servicos/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const dadosTbody = document.getElementById("lista_servicos");
            // Verifica se o elemento com ID 'dados' existe
            if (dadosTbody) {
                // Itera sobre a lista de categorias e insere cada categoria na tabela
                data.forEach(servico => {
                    const newOption = document.createElement("option");
                    newOption.value = servico.name;
                    newOption.text = servico.name;
                    
                    // Adiciona o ID do serviço como um atributo de dados
                    newOption.setAttribute('data-id', servico.id);
                    
                    dadosTbody.appendChild(newOption);
                });
            } else {
                console.error("Elemento com ID 'dados' não encontrado no DOM.");
            }
        })
        .catch(error => {
            console.error('Houve um problema com a sua solicitação:', error);
        });
    }
});

document.getElementById('cad_agendamento').addEventListener('submit', function(event) {
    event.preventDefault();

    var date = document.getElementById('date').value;
    var cpf = document.getElementById('cpf').value;

    var services = [];
    var tabelaServicos = document.getElementById('selected_services');
    var linhas = tabelaServicos.getElementsByTagName('tr');

    for (var i = 1; i < linhas.length; i++) { // Começa de 1 para pular o cabeçalho
        var colunas = linhas[i].getElementsByTagName('td');
        var idServico = colunas[0].getAttribute('data-id'); // Agora obtendo o atributo data-id
        services.push(idServico);
    }

    var token = localStorage.getItem('token'); // Obtém o token do armazenamento local
    var user_id = localStorage.getItem('id');

    // Verifica se o token está presente
    if (token) {
        // Fazendo uma solicitação POST para a API de autenticação
        fetch('http://localhost:8000/api/agendamentos/fila/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
            body: JSON.stringify({
                date: date,
                cpf: cpf,
                total_cost: 0.0,
                total_expected_time: "00:00",
                services: services
            })
            
        })
        .then(data => {
            // Verifica se a autenticação foi bem-sucedida
            if(data){
                window.location.href = 'list_agendamentos.html';
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
        });
    } else {
        // Se o token não estiver presente, o usuário não está autenticado
        console.log('Usuário não autenticado. Redirecionar para a página de login.');
    }
});
