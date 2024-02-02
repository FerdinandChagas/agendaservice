// Função para tratar os cliques nos botões
function handleButtonClick(event) {
    event.preventDefault();

    let button = event.target.closest('button[data-id]');
    let data_id = button.getAttribute('data-id');
    var token = localStorage.getItem('token'); // Obtém o token do armazenamento local

    // Verifica se o token está presente
    if (token) {

        // Fazendo uma solicitação PATCH para a API de agendamentos
        fetch('http://localhost:8000/api/agendamentos/servicos/' + data_id +'/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            }
        })
        .then(response => {
            // Verifica se a solicitação foi bem-sucedida com base no status da resposta
            if (response.ok) {
                window.location.href = 'list_services.html';
            } else {
                throw new Error('Falha ao processar a solicitação. Status: ' + response.status);
            }
        })
        .catch(error => {
            console.error('Erro ao processar a solicitação:', error.message);
        });
    } else {
        // Se o token não estiver presente, o usuário não está autenticado
        console.log('Usuário não autenticado. Redirecionar para a página de login.');
    }
}

// Adiciona o evento de clique aos botões de concluir e cancelar
document.getElementById('dados').addEventListener('click', function(event) {
    if (event.target.tagName.toLowerCase() === 'i' && (event.target.classList.contains('bi-backspace-reverse-fill'))) {
        handleButtonClick(event);
    }
});
