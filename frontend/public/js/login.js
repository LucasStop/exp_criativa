// Configurações
const API_URL = "http://localhost:3001/api";

// Script da página de login
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }
});

// Função para lidar com o envio do formulário de login
async function handleLoginSubmit(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
    const data = await API.auth.login({ email, password });
    
    // Armazenar token e dados do usuário
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    // Redirecionar para a página inicial
    window.location.href = '/';
  } catch (error) {
    alert(error.message || 'Falha na autenticação. Verifique suas credenciais e tente novamente.');
  }
}
