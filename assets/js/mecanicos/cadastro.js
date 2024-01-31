document.getElementById('cad_mecanico').addEventListener('submit', function(event) {
    event.preventDefault();

    var nome = document.getElementById('nome').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var cpf = document.getElementById('cpf').value;
    var telefone = document.getElementById('telefone').value;

    var user_id = localStorage.getItem('id');

    var token = localStorage.getItem('token'); // Obtém o token do armazenamento local

    // Verifica se o token está presente
    if (token) {
        // Fazendo uma solicitação POST para a API de autenticação
        fetch('http://localhost:8000/api/mecanicos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
            body: JSON.stringify({
                name: nome,
                username: username,
	            password: password,
                email: email,
                cpf: cpf,
                telefone: telefone,
                created_by: user_id
            })
        })
        .then(response => response.json())
        .then(data => {
            // Verifica se a autenticação foi bem-sucedida
            if (data) {
                window.location.href = 'list_mecanicos.html';
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
