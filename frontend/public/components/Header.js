class Header extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    try {
      // Carregar o HTML do arquivo separado
      const response = await fetch("/components/Header.html");
      if (!response.ok) {
        throw new Error(
          `Erro ao carregar o template do Header: ${response.status}`
        );
      }

      const html = await response.text();
      this.innerHTML = html;

      // Configurar os event listeners depois que o HTML foi carregado
      this.setupEventListeners();
      this.highlightCurrentPage();
    } catch (error) {
      console.error("Não foi possível carregar o componente Header:", error);
      this.innerHTML = "<p>Erro ao carregar o componente Header</p>";
    }
  }

  setupEventListeners() {
    const navItems = this.querySelectorAll(".nav-link, .login-btn");
    navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const route = item.getAttribute("data-route");

        // Remover classe 'active' de todos os links
        navItems.forEach((l) => l.classList.remove("active"));

        // Adicionar classe 'active' ao item clicado
        item.classList.add("active");

        // Navegar para a rota
        this.navigateToRoute(route);
      });
    });
  }

  navigateToRoute(route) {
    switch (route) {
      case "home":
        window.location.href = "/";
        break;
      case "produtos":
        window.navegarParaProdutos();
        break;
      case "categorias":
        window.navegarParaCategorias();
        break;
      case "login":
        window.navegarParaLogin();
        break;
      case "registro":
        window.navegarParaRegistro();
        break;
      default:
        console.warn(`Rota desconhecida: ${route}`);
    }
  }

  highlightCurrentPage() {
    const path = window.location.pathname;
    const navItems = this.querySelectorAll(".nav-link, .login-btn");

    navItems.forEach((item) => {
      item.classList.remove("active");

      const route = item.getAttribute("data-route");
      if (
        (path === "/" && route === "home") ||
        (path.includes("/produtos") && route === "produtos") ||
        (path.includes("/categorias") && route === "categorias") ||
        (path.includes("/login") && route === "login")
      ) {
        item.classList.add("active");
      }
    });
  }
}

customElements.define("header-component", Header);
