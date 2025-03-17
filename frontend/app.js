const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Configurar middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Servir o arquivo index.html para todas as rotas
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
console.log(`Acesse: http://localhost:${PORT}`);

});
