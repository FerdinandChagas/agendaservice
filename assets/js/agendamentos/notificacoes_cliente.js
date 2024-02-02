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
            const notificacoesContainer = document.getElementById("notificacoes");

            // Verifica se o elemento com ID 'notificacoes' existe
            if (notificacoesContainer) {
                // Itera sobre a lista de notificações e insere cada notificação no container
                data.forEach(notificacao => {
                    const newDiv = document.createElement("div");
                    newDiv.classList.add("activity-item", "d-flex");
                    newDiv.innerHTML = `<div class="activite-label">${notificacao.created_at}</div>
                                        <i class='bi bi-circle-fill activity-badge text-danger align-self-start'></i>
                                        <div class="activity-content">
                                            ${notificacao.msg}
                                        </div>`;

                    notificacoesContainer.appendChild(newDiv);
                });
            } else {
                console.error("Elemento com ID 'notificacoes' não encontrado no DOM.");
            }
        })
        .catch(error => {
            console.error('Houve um problema com a sua solicitação:', error);
        });
    }
});
