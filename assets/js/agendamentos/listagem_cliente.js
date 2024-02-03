document.addEventListener("DOMContentLoaded", function() {
    let token = localStorage.getItem('token'); // Obtém o token do armazenamento local

    if (token) {
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
        .then(data => {
            const dadosTbody = document.getElementById("agendamentos");
            let h6posicao = document.getElementById("posicao_fila");
            let h6tempo = document.getElementById("est_tempo");
            // Verifica se o elemento com ID 'dados' existe
            if (dadosTbody) {
                // Itera sobre a lista de categorias e insere cada categoria na tabela
                data.data.forEach(agendamento => {
                    const newRow = dadosTbody.insertRow();
                    newRow.innerHTML = `<td>${agendamento.date}</td>
                                       <td>${agendamento.position}</td>
                                       <td>${agendamento.total_cost}</td>
                                       <td>${agendamento.total_expected_time}</td>
                                       <td>${agendamento.status}</td>
                                       <td>
                                        <button id="cancelar" class="btn btn-danger btn-sm"><i id="bt_cancela" data-id="${agendamento.id}"class="bi bi-backspace-reverse-fill"></i></button>
                                       </td></tr>`;
                    if(agendamento.position>0){
                        h6posicao.textContent = agendamento.position;
                        h6tempo.textContent = agendamento.total_expected_time
                    }
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
