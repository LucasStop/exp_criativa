// Função para verificar se um arquivo existe
async function checkFile(path) {
  try {
    const response = await fetch(path);
    return {
      exists: response.ok,
      status: response.status,
      path: path,
    };
  } catch (error) {
    return {
      exists: false,
      status: "Erro",
      error: error.message,
      path: path,
    };
  }
}

// Função para exibir conteúdo do arquivo
async function showFileContent(path, elementId, previewId) {
  const element = document.getElementById(elementId);
  const previewElement = document.getElementById(previewId);

  try {
    const response = await fetch(path);

    if (response.ok) {
      const content = await response.text();
      element.innerHTML = `
                    <div class="success">✓ Arquivo encontrado em ${path}</div>
                    <div class="code-box">${content
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;")}</div>
                `;

      // Adiciona o conteúdo real para visualização
      if (previewElement) {
        previewElement.innerHTML = content;
      }
    } else {
      element.innerHTML = `<div class="error">✗ Falha ao carregar ${path}: ${response.status}</div>`;
    }
  } catch (error) {
    element.innerHTML = `<div class="error">✗ Erro ao acessar ${path}: ${error.message}</div>`;
  }
}

// Verifica os caminhos dos arquivos
async function checkPaths() {
  const pathElement = document.getElementById("path-check");
  pathElement.innerHTML = "<div>Verificando caminhos...</div>";

  const paths = [
    "/components/layout/header.html",
    "/components/layout/footer.html",
    "/components/layout/components.css",
    "/js/index.js",
  ];

  const results = await Promise.all(paths.map((path) => checkFile(path)));

  let html = "";
  let allGood = true;

  results.forEach((result) => {
    if (result.exists) {
      html += `<div class="success">✓ ${result.path} está acessível (${result.status})</div>`;
    } else {
      html += `<div class="error">✗ ${result.path} não está acessível: ${
        result.status || result.error
      }</div>`;
      allGood = false;
    }
  });

  if (allGood) {
    html +=
      '<div class="success" style="margin-top:15px;font-weight:bold">Todos os arquivos estão acessíveis!</div>';
  } else {
    html += `
                <div class="error" style="margin-top:15px;font-weight:bold">
                    Alguns arquivos não estão acessíveis. Verifique:
                    <ul>
                        <li>Se os arquivos existem nos caminhos corretos</li>
                        <li>Se o servidor web está configurado corretamente</li>
                        <li>Se os caminhos no JavaScript estão corretos</li>
                    </ul>
                </div>
            `;
  }

  pathElement.innerHTML = html;
}

// Verificar favicon
async function checkFavicon() {
  const faviconElement = document.getElementById("favicon-check");
  const faviconGrid = document.getElementById("favicon-grid");

  faviconElement.innerHTML = "<div>Verificando favicons...</div>";

  const favicons = [
    // Verificar também relativos à raiz do site
    { path: "assets/ico/favicon.ico", desc: "Favicon relativo (ICO)" },
    {
      path: "assets/ico/favicon-16x16.png",
      desc: "Favicon relativo 16x16 (PNG)",
    },
    {
      path: "assets/ico/favicon-32x32.png",
      desc: "Favicon relativo 32x32 (PNG)",
    },
    {
      path: "assets/ico/apple-touch-icon.png",
      desc: "Apple Touch Icon relativo",
    },
  ];

  const results = await Promise.all(
    favicons.map((item) => checkFile(item.path))
  );

  let html = "";
  let gridHtml = "";
  let foundFavicons = 0;

  results.forEach((result, index) => {
    const favicon = favicons[index];

    if (result.exists) {
      html += `<div class="success">✓ ${favicon.desc} encontrado em ${favicon.path}</div>`;
      gridHtml += `
          <div class="favicon-item">
            <img src="${favicon.path}" alt="${favicon.desc}" />
            <p>${favicon.desc}</p>
          </div>
        `;
      foundFavicons++;
    } else {
      html += `<div class="error">✗ ${favicon.desc} não encontrado: ${
        result.status || result.error
      }</div>`;
    }
  });

  if (foundFavicons > 0) {
    html += `<div class="success" style="margin-top:15px;">Encontrados ${foundFavicons} de ${favicons.length} favicons!</div>`;
  } else {
    html += `
        <div class="error" style="margin-top:15px;">
          Não foi encontrado nenhum favicon! Você deve criar pelo menos um arquivo favicon.ico.
        </div>
        <div class="warning" style="margin-top:10px;">
          Dica: Use um gerador de favicon como <a href="https://favicon.io" target="_blank">favicon.io</a> ou 
          <a href="https://realfavicongenerator.net" target="_blank">realfavicongenerator.net</a>
        </div>
      `;
  }

  faviconElement.innerHTML = html;
  faviconGrid.innerHTML = gridHtml;
}

// Verificar páginas HTML
async function checkPages() {
  const pagesElement = document.getElementById("pages-check");
  const pagesGrid = document.getElementById("pages-grid");

  pagesElement.innerHTML = "<div>Verificando páginas...</div>";

  const pages = [
    { path: "/index.html", name: "Home Principal" },
    { path: "/pages/catalogo.html", name: "Catálogo" },
    { path: "/pages/personalizar.html", name: "Personalizar" },
    { path: "/pages/sobre.html", name: "Sobre" },
    { path: "/pages/contato.html", name: "Contato" },
    { path: "/pages/produto.html", name: "Produto" },
  ];

  const results = await Promise.all(pages.map((page) => checkFile(page.path)));

  let html = "";
  let gridHtml = "";
  let foundPages = 0;

  results.forEach((result, index) => {
    const page = pages[index];

    let statusClass = result.exists ? "status-success" : "status-error";
    let statusText = result.exists ? "Disponível" : "Não encontrada";

    gridHtml += `
        <div class="page-item">
          <h3>${page.name}</h3>
          <div>${page.path}</div>
          <div class="page-status">
            <span class="status-icon ${statusClass}"></span>
            <span>${statusText}</span>
          </div>
          ${
            result.exists
              ? `<button class="toggle-button" onclick="window.open('${page.path}', '_blank')">Abrir</button>`
              : ""
          }
        </div>
      `;

    if (result.exists) {
      foundPages++;
    }
  });

  if (foundPages > 0) {
    html += `<div class="success">Encontradas ${foundPages} de ${pages.length} páginas!</div>`;
  } else {
    html += `<div class="error">Não foi encontrada nenhuma página!</div>`;
  }

  if (foundPages < pages.length) {
    html += `<div class="warning">Algumas páginas ainda não foram criadas ou não estão acessíveis.</div>`;
  }

  pagesElement.innerHTML = html;
  pagesGrid.innerHTML = gridHtml;
}

// Verificar CSS
async function checkCSS() {
  const cssElement = document.getElementById("css-check");

  try {
    const response = await fetch("/components/layout/components.css");

    if (response.ok) {
      const content = await response.text();
      const hasHeaderStyles = content.includes("header {");
      const hasFooterStyles = content.includes("footer {");
      const hasFontFamily = content.includes("font-family");

      let html = '<div class="success">✓ Arquivo CSS encontrado</div>';

      if (hasFontFamily) {
        const fontMatch = content.match(/font-family:([^;]+);/);
        if (fontMatch) {
          html += `<div class="success">✓ Fonte definida: ${fontMatch[1]}</div>`;
        }
      }

      if (hasHeaderStyles) {
        html +=
          '<div class="success">✓ Estilos para o header encontrados</div>';
      } else {
        html +=
          '<div class="error">✗ Estilos para o header não encontrados</div>';
      }

      if (hasFooterStyles) {
        html +=
          '<div class="success">✓ Estilos para o footer encontrados</div>';
      } else {
        html +=
          '<div class="error">✗ Estilos para o footer não encontrados</div>';
      }

      cssElement.innerHTML = html;
    } else {
      cssElement.innerHTML = `<div class="error">✗ Falha ao carregar CSS: ${response.status}</div>`;
    }
  } catch (error) {
    cssElement.innerHTML = `<div class="error">✗ Erro ao acessar CSS: ${error.message}</div>`;
  }
}

// Executar verificações quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  checkPaths();
  checkFavicon();
  checkPages();
  showFileContent(
    "/components/layout/header.html",
    "header-content",
    "header-preview"
  );
  showFileContent(
    "/components/layout/footer.html",
    "footer-content",
    "footer-preview"
  );
  checkCSS();
});
