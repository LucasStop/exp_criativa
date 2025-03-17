class Login extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="login-container">
        <div class="login-card">
          <div class="login-header">
            <img src="/assets/logo_cakeria.png" alt="Cakeria Logo" class="login-logo">
            <h2>Acesse sua conta</h2>
          </div>
          <form id="login-form" class="login-form">
            <div class="form-group">
              <label for="email">E-mail</label>
              <input type="email" id="email" name="email" placeholder="Seu e-mail" required>
            </div>
            <div class="form-group">
              <label for="password">Senha</label>
              <input type="password" id="password" name="password" placeholder="Sua senha" required>
            </div>
            <button type="submit" class="btn btn-primary btn-login">Entrar</button>
          </form>
          <div class="login-footer">
            <p>Não possui uma conta? <a href="#" id="register-link">Cadastre-se</a></p>
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const form = this.querySelector('#login-form');
    if (form) {
      form.addEventListener('submit', this.handleLogin.bind(this));
    }

    const registerLink = this.querySelector('#register-link');
    if (registerLink) {
      registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Funcionalidade de cadastro em desenvolvimento!');
      });
    }
  }

  handleLogin(event) {
    event.preventDefault();
    const email = this.querySelector('#email').value;
    const password = this.querySelector('#password').value;
    
    console.log('Tentativa de login:', { email, password });
    
    if (email && password) {
      alert('Login realizado com sucesso!');
      window.location.href = '/';
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
}

customElements.define('login-component', Login);
