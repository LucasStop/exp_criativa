const { Sequelize } = require('sequelize');
require('dotenv').config();

// Criar uma conexão direta com o banco
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false
  }
);

async function truncateData() {
  try {
    // Conectar ao banco de dados
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados.');
    
    // Desativar verificações de chave estrangeira temporariamente
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    
    console.log('Limpando dados das tabelas...');
    
    // Truncar tabelas em ordem reversa de dependência (mantém a estrutura)
    await sequelize.query('TRUNCATE TABLE order_products');
    await sequelize.query('TRUNCATE TABLE orders');
    await sequelize.query('TRUNCATE TABLE products');
    await sequelize.query('TRUNCATE TABLE categories');
    await sequelize.query('TRUNCATE TABLE addresses');
    await sequelize.query('TRUNCATE TABLE users');
    
    // Reativar verificações de chave estrangeira
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    
    console.log('Dados removidos com sucesso! A estrutura das tabelas foi mantida.');
    
    // Fechar a conexão
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('Erro ao limpar dados do banco de dados:', error);
    process.exit(1);
  }
}

// Executar a função
truncateData();
