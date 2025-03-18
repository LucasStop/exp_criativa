// Configurações da API
const API_URL = "http://localhost:3001/api";

// Estado da aplicação
let produtos = [];
let categorias = [];

// Elementos DOM
const contentEl = document.getElementById("content");
const produtosContainer = document.getElementById("produtos-container");
const categoriasContainer = document.getElementById("categorias-container");
const verProdutosBtn = document.getElementById("ver-produtos");
const navProdutos = document.getElementById("nav-produtos");
const navCategorias = document.getElementById("nav-categorias");

// Exportar funções de navegação para o window para uso pelos componentes
window.navegarParaProdutos = navegarParaProdutos;
window.navegarParaCategorias = navegarParaCategorias;
window.navegarParaLogin = navegarParaLogin; // Adição da exportação da função de login
window.navegarParaRegistro = navegarParaRegistro; // Nova função

// Event Listeners
document.addEventListener("DOMContentLoaded", iniciarAplicacao);
if (verProdutosBtn)
  verProdutosBtn.addEventListener("click", navegarParaProdutos);
if (navProdutos)
  navProdutos.addEventListener("click", (e) => {
    e.preventDefault();
    navegarParaProdutos();
  });
if (navCategorias)
  navCategorias.addEventListener("click", (e) => {
    e.preventDefault();
    navegarParaCategorias();
  });

// Funções principais
async function iniciarAplicacao() {
  // Carregar dados iniciais
  await Promise.all([carregarProdutosDestaque(), carregarCategorias()]);

  // Verificar URL para navegação
  Navigation.handleNavigation();
}

// Funções de carregamento de dados
async function carregarProdutosDestaque() {
  try {
    produtos = await API.produtos.listar();
    renderizarProdutosDestaque(produtos.slice(0, 3)); // Mostrar apenas 3 produtos em destaque
  } catch (error) {
    if (produtosContainer) {
      produtosContainer.innerHTML = '<p class="error">Erro ao carregar produtos. Tente novamente mais tarde.</p>';
    }
  }
}

async function carregarCategorias() {
  try {
    categorias = await API.categorias.listar();
    renderizarCategorias(categorias);
  } catch (error) {
    if (categoriasContainer) {
      categoriasContainer.innerHTML = '<p class="error">Erro ao carregar categorias. Tente novamente mais tarde.</p>';
    }
  }
}

async function carregarDetalhesProduto(id) {
  try {
    const produto = await API.produtos.obterPorId(id);
    renderizarDetalhesProduto(produto);
  } catch (error) {
    if (contentEl) {
      contentEl.innerHTML = '<p class="error">Erro ao carregar detalhes do produto. Tente novamente mais tarde.</p>';
    }
  }
}

// Funções de renderização
function renderizarProdutosDestaque(produtosDestaque) {
  if (!produtosContainer) return;

  if (produtosDestaque.length === 0) {
    produtosContainer.innerHTML = "<p>Nenhum produto encontrado</p>";
    return;
  }

  const html = produtosDestaque
    .map(
      (produto) => `
    <div class="product-card">
      <div class="product-img" style="background-image: url('${
        produto.image_url
          ? `/imgs/${produto.image_url}`
          : "/imgs/placeholder.png"
      }')"></div>
      <div class="product-info">
        <h3>${produto.name}</h3>
        <p class="product-price">R$ ${parseFloat(produto.price).toFixed(2)}</p>
        <button class="btn btn-primary" onclick="verDetalhesProduto(${
          produto.id
        })">Ver Detalhes</button>
      </div>
    </div>
  `
    )
    .join("");

  produtosContainer.innerHTML = html;
}

function renderizarCategorias(categoriasList) {
  if (!categoriasContainer) return;

  if (categoriasList.length === 0) {
    categoriasContainer.innerHTML = "<p>Nenhuma categoria encontrada</p>";
    return;
  }

  const html = categoriasList
    .map(
      (categoria) => `
    <div class="category-card">
      <h3>${categoria.name}</h3>
      <p>${categoria.description || "Sem descrição"}</p>
      <button class="btn btn-outline" onclick="verProdutosPorCategoria(${
        categoria.id
      })">Ver Produtos</button>
    </div>
  `
    )
    .join("");

  categoriasContainer.innerHTML = html;
}

function renderizarDetalhesProduto(produto) {
  const mainContent = `
    <section class="product-details">
      <div class="product-image">
        <img src="${
          produto.image_url
            ? `/imgs/${produto.image_url}`
            : "/imgs/placeholder.png"
        }" alt="${produto.name}">
      </div>
      <div class="product-details-info">
        <h1>${produto.name}</h1>
        <p class="product-category">Categoria: ${
          produto.category?.name || "Não categorizado"
        }</p>
        <p class="product-details-price">R$ ${parseFloat(produto.price).toFixed(
          2
        )}</p>
        <p class="product-details-description">${
          produto.description || "Sem descrição disponível"
        }</p>
        <button class="btn btn-primary">Adicionar ao Carrinho</button>
        <button class="btn btn-outline" onclick="navegarParaProdutos()">Voltar para Produtos</button>
      </div>
    </section>
  `;

  contentEl.innerHTML = mainContent;
  currentPage = "produto";
  window.history.pushState({}, "", `/produtos/${produto.id}`);
}

function renderizarListaProdutos() {
  const mainContent = `
    <section class="products-list">
      <div class="container">
        <h1 class="section-title">Nossos Produtos</h1>
        <div class="featured-products">
          ${produtos
            .map(
              (produto) => `
            <div class="product-card">
              <div class="product-img" style="background-image: url('${
                produto.image_url
                  ? `/imgs/${produto.image_url}`
                  : "/imgs/placeholder.png"
              }')"></div>
              <div class="product-info">
                <h3>${produto.name}</h3>
                <p class="product-price">R$ ${parseFloat(produto.price).toFixed(
                  2
                )}</p>
                <button class="btn btn-primary" onclick="verDetalhesProduto(${
                  produto.id
                })">Ver Detalhes</button>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;

  contentEl.innerHTML = mainContent;
  currentPage = "produtos";
  window.history.pushState({}, "", "/produtos");
}

function renderizarListaCategorias() {
  const mainContent = `
    <section class="categories-list">
      <div class="container">
        <h1 class="section-title">Nossas Categorias</h1>
        <div class="category-grid">
          ${categorias
            .map(
              (categoria) => `
            <div class="category-card">
              <h3>${categoria.name}</h3>
              <p>${categoria.description || "Sem descrição"}</p>
              <button class="btn btn-outline" onclick="verProdutosPorCategoria(${
                categoria.id
              })">Ver Produtos</button>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;

  contentEl.innerHTML = mainContent;
  currentPage = "categorias";
  window.history.pushState({}, "", "/categorias");
}

// Funções de navegação
function navegarParaProdutos() {
  renderizarListaProdutos();
}

function navegarParaCategorias() {
  renderizarListaCategorias();
}

function navegarParaLogin() {
  // Navegar para a página de login
  window.location.href = "/login.html";
  currentPage = "login";
}

// Nova função de navegação para registro
function navegarParaRegistro() {
  // Navegar para a página de registro
  window.location.href = "/registro.html";
  currentPage = "registro";
}

// Funções auxiliares expostas globalmente
window.carregarDetalhesProduto = carregarDetalhesProduto;
window.renderizarListaProdutos = renderizarListaProdutos;
window.renderizarListaCategorias = renderizarListaCategorias;

window.verDetalhesProduto = async function (id) {
  await carregarDetalhesProduto(id);
};

window.verProdutosPorCategoria = async function (categoriaId) {
  try {
    produtos = await API.produtos.obterPorCategoria(categoriaId);
    renderizarListaProdutos();
  } catch (error) {
    if (contentEl) {
      contentEl.innerHTML = '<p class="error">Erro ao carregar produtos desta categoria. Tente novamente mais tarde.</p>';
    }
  }
};
