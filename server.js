const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Carrega variáveis de ambiente do arquivo .env
dotenv.config({ path: path.join(__dirname, 'frontend', '.env') });

const app = express();
const PORT = process.env.PORT || 3001;
const API_URL = process.env.API_URL || process.env.LOCAL_API_URL;

console.log('Iniciando servidor com API_URL:', API_URL);

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'frontend/public')));

// Rota para fornecer a URL da API para o cliente
app.get('/config', (req, res) => {
  res.json({ apiUrl: API_URL });
});

// Rota para páginas principais - todas as rotas são tratadas pelo frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/public', 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`API configurada para: ${API_URL}`);
});
