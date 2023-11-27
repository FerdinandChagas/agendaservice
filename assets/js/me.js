// Função para verificar se o usuário está autenticado
function verificarAutenticacao() {
    var token = localStorage.getItem('token'); // Obtém o token do armazenamento local

    // Verifica se o token está presente
    if (token) {
        // Se o token estiver presente, você pode fazer solicitações autenticadas para a API
        // Exemplo de uma solicitação GET autenticada usando o token no cabeçalho
        fetch('http://localhost:8000/api/users/me', {
            method: 'GET',
            headers: {
                'Authorization': 'Token ' + token // Inclui o token no cabeçalho da solicitação
            }
        })
        .then(response => {
            if (response.ok) {
                // Se a resposta da API for bem-sucedida, o usuário está autenticado
                console.log('Usuário autenticado!');
                return response.json()    
            } else {
                // Se a resposta da API indicar falta de autorização, o token pode ter expirado ou ser inválido
                console.log('Token inválido. O usuário não está autenticado.');
                window.location.href = 'index.html';
            }
        })
        .then(data => {
            if(data.name){
                localStorage.setItem('profile_name', data.name);
                document.getElementById("profile_name").innerHTML = data.name;
            }
        })
        .catch(error => {
            console.error('Erro ao verificar autenticação:', error);
            // Lidar com erros de verificação de autenticação, por exemplo, redirecionando para a página de login
        });
    } else {
        // Se o token não estiver presente, o usuário não está autenticado
        console.log('Usuário não autenticado. Redirecionar para a página de login.');
        window.location.href = 'index.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    verificarAutenticacao(); // Chama a função verificarAutenticacao() ao carregar a página
});

document.getElementById('logOut').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('profile_name');
    window.location.href = 'index.html';
});