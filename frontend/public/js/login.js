document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const registerLink = document.getElementById('register-link');
  const loginLink = document.getElementById('login-link');
  const loginCard = document.getElementById('login-card');
  const registerCard = document.getElementById('register-card');
  
  // Botões de alternância entre login e cadastro
  registerLink.addEventListener('click', function(e) {
    e.preventDefault();
    loginCard.style.display = 'none';
    registerCard.style.display = 'block';
  });
  
  loginLink.addEventListener('click', function(e) {
    e.preventDefault();
    registerCard.style.display = 'none';
    loginCard.style.display = 'block';
  });
  
  // Formulário de login
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // Aqui você implementaria a lógica de autenticação
      console.log('Tentativa de login:', { email, password });
      
      // Exemplo de validação simples
      if (email && password) {
        // Simulação de login bem-sucedido
        alert('Login realizado com sucesso!');
        window.location.href = '/';
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    });
  }
  
  // Formulário de cadastro
  if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const phone = document.getElementById('register-phone').value;
      const password = document.getElementById('register-password').value;
      
      console.log('Tentativa de cadastro:', { name, email, phone, password });
      
      if (name && email && phone && password) {
        // Validação básica para telefone (você pode expandir conforme necessário)
        if (!/^[0-9]{10,11}$/.test(phone.replace(/\D/g, ''))) {
          alert('Por favor, insira um número de telefone válido.');
          return;
        }
        
        console.log('Cadastro realizado com sucesso:', { name, email, phone });
        alert('Cadastro realizado com sucesso! Faça login para continuar.');
        registerCard.style.display = 'none';
        loginCard.style.display = 'block';
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    });
  }
});
