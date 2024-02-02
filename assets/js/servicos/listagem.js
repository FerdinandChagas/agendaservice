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
            const dadosTbody = document.getElementById("dados");
            // Verifica se o elemento com ID 'dados' existe
            if (dadosTbody) {
                // Itera sobre a lista de categorias e insere cada categoria na tabela
                data.forEach(servico => {
                    const newRow = dadosTbody.insertRow();
                    newRow.innerHTML = `<td>${servico.name}</td>
                                       <td>${servico.description}</td>
                                       <td>${servico.expected_end_time}</td></tr>
                                       <td>R$ ${servico.value}</td>
                                       <td>
                                       <button id="cancelar" data-id="${servico.id}" class="btn btn-danger btn-sm"><i id="bt_cancela" class="bi bi-backspace-reverse-fill"></i></button>
                                       </td></tr>`;
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
