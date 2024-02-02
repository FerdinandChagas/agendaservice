const API_HOST="http://localhost:8000/" //https://ec2-18-223-205-175.us-east-2.compute.amazonaws.com/"

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Fazendo uma solicitação POST para a API de autenticação
    fetch(API_HOST+'auth-token/', {
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
            console.log('Autenticação bem-sucedida! Token: ' + data.token);
            let token = localStorage.getItem('token');
            if (token){
                fetch(API_HOST+'api/users/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + token // Inclui o token no cabeçalho da solicitação
                    }
                })
                .then(response => response.json())
                .then(data => {
                    // Verifica se a autenticação foi bem-sucedida
                    if (data) {
                        localStorage.setItem('groups', data.groups);
                        console.log(data.groups[0]);
                        if (data.groups.includes(8)){
                            console.log("Eh cliente");
                            localStorage.setItem('cpf', data.cpf)
                            console.log(localStorage.getItem('cpf'))
                            window.location.href = 'home_cliente.html';
                        }else if (data.groups.includes(6)){
                            window.location.href = 'home.html';
                            console.log("Eh gerente");
                        }else{
                            console.log("Eh admin");
                        }
                    } else {
                        // Se a autenticação falhar, exibe uma mensagem de erro
                        alert("Erro!", "Nome de usuário ou senha incorretos", "error");
                    }
                })
                .catch(error => {
                    console.error('Erro ao fazer login:', error);
                });
            }
        } else {
            // Se a autenticação falhar, exibe uma mensagem de erro
            swal("Erro!", "Nome de usuário ou senha incorretos", "error");
        }
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error);
    });
    
});
