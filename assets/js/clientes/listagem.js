document.addEventListener("DOMContentLoaded", function() {
    let token = localStorage.getItem('token'); // Obtém o token do armazenamento local

    if (token) {
        // Fazendo uma solicitação GET para a API de categorias
        fetch('http://localhost:8000/api/clientes/', {
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
                data.data.forEach(cliente => {
                    const newRow = dadosTbody.insertRow();
                    newRow.innerHTML = `<td class="text-primary">${cliente.name}</td>
                                       <td class="text-primary">${cliente.email}</td>
                                       <td class="text-primary">${cliente.cpf}</td>
                                       <td class="text-primary">${cliente.telefone}</td>`;
                    console.log(cliente.name);
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
