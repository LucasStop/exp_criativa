/**
 * Carrega os componentes de layout (header e footer) nas páginas
 */
document.addEventListener("DOMContentLoaded", function () {
  // Carrega o header
  const headerPlaceholder = document.getElementById("header-placeholder");
  if (headerPlaceholder) {
    fetch("/components/layout/header.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        headerPlaceholder.innerHTML = data;
        // Atualiza link ativo após carregar o header
        updateActiveNavLink();
      })
      .catch((error) => {
        console.error("Erro ao carregar o header:", error);
        headerPlaceholder.innerHTML =
          '<div class="error">Erro ao carregar o header</div>';
      });
  }

  // Carrega o footer
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    fetch("/components/layout/footer.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        footerPlaceholder.innerHTML = data;
      })
      .catch((error) => {
        console.error("Erro ao carregar o footer:", error);
        footerPlaceholder.innerHTML =
          '<div class="error">Erro ao carregar o footer</div>';
      });
  }
});

/**
 * Atualiza a classe 'active' no link de navegação atual
 */
function updateActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (
      href &&
      (currentPath.includes(href) ||
        (href.includes("index.html") &&
          (currentPath === "/" || currentPath.endsWith("/"))))
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
