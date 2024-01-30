document.getElementById('cad_servico').addEventListener('submit', function(event) {
    event.preventDefault();

    var nome = document.getElementById('nome').value;
    var descricao = document.getElementById('descricao').value;
    var tempo_estimado = document.getElementById('tempo_estimado').value;
    var valor_estimado = document.getElementById('valor_estimado').value;

    var token = localStorage.getItem('token'); // Obtém o token do armazenamento local
    var user_id = localStorage.getItem('id');

    // Verifica se o token está presente
    if (token) {
        // Fazendo uma solicitação POST para a API de autenticação
        fetch('http://localhost:8000/api/agendamentos/servicos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
            body: JSON.stringify({
                name: nome,
                description: descricao,
                expected_start_time: "00:00:00",
                expected_end_time: tempo_estimado,
                value: valor_estimado,
                created_by: user_id
            })
            
        })
        .then(data => {
            // Verifica se a autenticação foi bem-sucedida
            if(data){
                window.location.href = 'list_services.html';
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
