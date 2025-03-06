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

async function cleanDatabase() {
  try {
    // Conectar ao banco de dados
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados.');
    
    // Desativar verificações de chave estrangeira temporariamente
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    
    console.log('Removendo tabelas...');
    
    // Remover tabelas em ordem reversa de dependência
    await sequelize.query('DROP TABLE IF EXISTS order_products');
    await sequelize.query('DROP TABLE IF EXISTS orders');
    await sequelize.query('DROP TABLE IF EXISTS products');
    await sequelize.query('DROP TABLE IF EXISTS categories');
    await sequelize.query('DROP TABLE IF EXISTS addresses');
    await sequelize.query('DROP TABLE IF EXISTS users');
    
    // Remover as definições de ENUM, que podem causar problemas em recriações
    await sequelize.query("DROP TABLE IF EXISTS `ENUM_users_type`");
    await sequelize.query("DROP TABLE IF EXISTS `ENUM_orders_status`");
    
    // Reativar verificações de chave estrangeira
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    
    console.log('Banco de dados limpo com sucesso!');
    
    // Fechar a conexão
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('Erro ao limpar banco de dados:', error);
    process.exit(1);
  }
}

// Executar a função
cleanDatabase();
