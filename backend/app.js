require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importar rotas
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const userRoutes = require('./routes/user.routes');
const addressRoutes = require('./routes/address.routes');
const orderRoutes = require('./routes/order.routes');

// Usar rotas
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/orders', orderRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.send('API Cakeria - Confeitaria');
});

// Sincronizar com o banco de dados e iniciar o servidor
sequelize.sync({ force: false })
  .then(() => {
    // console.log('Conexão com banco de dados estabelecida');
    app.listen(PORT, () => {
      // console.log(`Acesse: http://localhost:${PORT}`);
      // console.log(`Porta recebida do .env: ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });
