document.addEventListener("DOMContentLoaded", function() {
    let token = localStorage.getItem('token'); // Obtém o token do armazenamento local

    if (token) {
        // Fazendo uma solicitação GET para a API de categorias
        fetch('http://localhost:8000/api/agendamentos/notificacoes/', {
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
            const contentDiv = document.getElementById('notificacoes');

            if (contentDiv) {
                data.forEach(notificacao => {
                    const newDiv = document.createElement('div');
                    newDiv.className = 'activity-item d-flex';
                    newDiv.innerHTML = `<div class="activite-label">${notificacao.created_at}</div>
                                        <i class='bi bi-circle-fill activity-badge text-success align-self-start'></i>
                                        <div class="activity-content">
                                            ${notificacao.msg}
                                        </div>`;

                    // Adiciona a nova div à div existente no HTML
                    contentDiv.appendChild(newDiv);
                });
            } else {
                console.error("Div 'conteudo' não encontrada no HTML.");
            }
        })
        .catch(error => {
            console.error('Houve um problema com a sua solicitação:', error);
        });


        // Fazendo uma solicitação GET para a API de categorias
        fetch('http://localhost:8000/api/agendamentos/fila/', {
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
        .then(data2 => {
            const dadosTbody = document.getElementById("agendamentos");
            // Verifica se o elemento com ID 'dados' existe
            if (dadosTbody) {
                // Itera sobre a lista de categorias e insere cada categoria na tabela
                data2.forEach(agendamento => {
                    const newRow = dadosTbody.insertRow();
                    newRow.innerHTML = `</tr><td class="text-primary">${agendamento.id}</td>
                                        <td class="text-primary">${agendamento.date}</td>
                                        <td class="text-primary">${agendamento.services[0]}</td>
                                        <td class="text-primary">Concluído</td></tr>`;
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
