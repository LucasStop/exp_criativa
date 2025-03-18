// Configurações
const API_URL = "http://localhost:3001/api";

// Script da página de registro
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegisterSubmit);
  }
});

// Função para lidar com o envio do formulário de registro
async function handleRegisterSubmit(e) {
  e.preventDefault();
  
  const userData = {
    name: document.getElementById('register-name').value,
    email: document.getElementById('register-email').value,
    phone: document.getElementById('register-phone').value,
    password: document.getElementById('register-password').value
  };
  
  try {
    await API.auth.registro(userData);
    
    // Mostrar mensagem de sucesso
    alert('Conta criada com sucesso! Você pode fazer login agora.');
    
    // Redirecionar para a página de login
    window.location.href = '/login.html';
  } catch (error) {
    alert(error.message || 'Falha no registro. Por favor, tente novamente.');
  }
}
