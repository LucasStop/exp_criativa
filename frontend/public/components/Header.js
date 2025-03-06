class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <header class="header">
        <div class="container">
          <div class="logo-container">
            <img src="/assets/logo_cakeria.png" alt="Cakeria Logo" class="header-logo">
          </div>
          <nav>
            <ul class="nav-links">
              <li><a href="/" class="nav-link" data-route="home">Home</a></li>
              <li><a href="/produtos" class="nav-link" id="nav-produtos" data-route="produtos">Produtos</a></li>
              <li><a href="/categorias" class="nav-link" id="nav-categorias" data-route="categorias">Categorias</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;

    this.setupEventListeners();
    this.highlightCurrentPage();
  }

  setupEventListeners() {
    const links = this.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        
        // Remover classe 'active' de todos os links
        links.forEach(l => l.classList.remove('active'));
        
        // Adicionar classe 'active' ao link clicado
        link.classList.add('active');
        
        // Navegar para a rota
        if (route === 'home') {
          window.location.href = '/';
        } else if (route === 'produtos') {
          window.navegarParaProdutos();
        } else if (route === 'categorias') {
          window.navegarParaCategorias();
        }
      });
    });
  }

  highlightCurrentPage() {
    const path = window.location.pathname;
    const links = this.querySelectorAll('.nav-link');
    
    links.forEach(link => {
      link.classList.remove('active');
      
      if ((path === '/' && link.getAttribute('data-route') === 'home') ||
          (path.includes('/produtos') && link.getAttribute('data-route') === 'produtos') ||
          (path.includes('/categorias') && link.getAttribute('data-route') === 'categorias')) {
        link.classList.add('active');
      }
    });
  }
}

customElements.define('header-component', Header);
