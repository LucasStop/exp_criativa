const Navigation = {
  currentPage: "home",

  navegarParaProdutos: function () {
    window.renderizarListaProdutos();
    this.currentPage = "produtos";
    window.history.pushState({}, "", "/produtos");
  },

  navegarParaCategorias: function () {
    window.renderizarListaCategorias();
    this.currentPage = "categorias";
    window.history.pushState({}, "", "/categorias");
  },

  navegarParaLogin: function () {
    window.location.href = "/login.html";
    this.currentPage = "login";
  },

  navegarParaRegistro: function () {
    window.location.href = "/registro.html";
    this.currentPage = "registro";
  },

  handleNavigation: function () {
    const path = window.location.pathname;

    if (path.startsWith("/produtos/") && path.length > 10) {
      const produtoId = path.split("/").pop();
      window.carregarDetalhesProduto(produtoId);
    } else if (path === "/produtos") {
      this.navegarParaProdutos();
    } else if (path === "/categorias") {
      this.navegarParaCategorias();
    }
  },
};

window.navegarParaProdutos = function () {
  Navigation.navegarParaProdutos();
};
window.navegarParaCategorias = function () {
  Navigation.navegarParaCategorias();
};
window.navegarParaLogin = function () {
  Navigation.navegarParaLogin();
};
window.navegarParaRegistro = function () {
  Navigation.navegarParaRegistro();
};
