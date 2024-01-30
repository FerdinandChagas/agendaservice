document.getElementById('cad_categoria').addEventListener('submit', function(event) {
    event.preventDefault();

    var nome = document.getElementById('nome').value;
    var max_passageiros = document.getElementById('max_passageiros').value;
    var combustivel = document.getElementById('combustivel').value

    var token = localStorage.getItem('token'); // Obtém o token do armazenamento local

    // Verifica se o token está presente
    if (token) {
        // Fazendo uma solicitação POST para a API de autenticação
        fetch('http://localhost:8000/api/transportes/categorias/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
            body: JSON.stringify({
                nome: nome,
                max_passageiros: max_passageiros,
                combustivel: combustivel,
                created_by: 'f1bd7279-348c-4db1-8739-45a8eaaaa290'
            })
        })
        .then(response => response.json())
        .then(data => {
            // Verifica se a autenticação foi bem-sucedida
            if (response.ok) {
                window.location.href = 'categorias.html';
                console.log('Nova categoria cadastrada!');
            } else {
                // Se a autenticação falhar, exibe uma mensagem de erro
                swal("Erro!", "Nome de usuário ou senha incorretos", "error");
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
