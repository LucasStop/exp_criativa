const express = require("express");
const path = require("path");
const app = express();

// Servir arquivos estáticos da pasta pages e raiz
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, "pages")));

// Servir arquivos de ico da pasta assets/ico
app.use('/assets/ico', express.static(path.join(__dirname, 'assets/ico')));

// Garantir que o favicon.ico na raiz seja encontrado
app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "ico", "favicon.ico"));
});

// Serve o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
