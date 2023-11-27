document.getElementById('meuBotao').addEventListener('click', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Fazendo uma solicitação POST para a API de autenticação
    fetch('http://localhost:8000/auth-token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        // Verifica se a autenticação foi bem-sucedida
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = 'home.html';
            console.log('Autenticação bem-sucedida! Token: ' + data.token);
        } else {
            // Se a autenticação falhar, exibe uma mensagem de erro
            swal("Erro!", "Nome de usuário ou senha incorretos", "error");
        }
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error);
    });
});
