const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 3001;

// Configura para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página de login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rota para servir todas as outras páginas
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Acesse: http://localhost:${PORT}`);
});
