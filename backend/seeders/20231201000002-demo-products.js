'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Primeiro, buscar os IDs das categorias
    const categories = await queryInterface.sequelize.query(
      'SELECT id, name FROM categories;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    // Mapear nomes para IDs
    const categoriesMap = {};
    categories.forEach(cat => {
      categoriesMap[cat.name] = cat.id;
    });

    // Inserir produtos com referências às categorias
    await queryInterface.bulkInsert('products', [
      {
        name: 'Bolo de Chocolate',
        description: 'Delicioso bolo de chocolate com cobertura de ganache',
        price: 45.90,
        image_url: 'bolo-chocolate.png',
        category_id: categoriesMap['Bolos Tradicionais'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Bolo de Casamento',
        description: 'Bolo de três andares com decoração personalizada',
        price: 350.00,
        image_url: 'bolo-casamento.png',
        category_id: categoriesMap['Bolos Decorados'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Torta de Limão',
        description: 'Torta de limão com merengue',
        price: 39.90,
        image_url: 'torta-limao.png',
        category_id: categoriesMap['Tortas'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Brigadeiro Gourmet',
        description: 'Brigadeiro premium feito com chocolate belga',
        price: 3.50,
        image_url: 'brigadeiro-gourmet.png',
        category_id: categoriesMap['Doces Finos'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Cheesecake de Frutas Vermelhas',
        description: 'Cheesecake gelado com calda de frutas vermelhas',
        price: 55.00,
        image_url: 'cheesecake.png',
        category_id: categoriesMap['Sobremesas Geladas'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Bolo de Cenoura',
        description: 'Bolo caseiro de cenoura com cobertura de chocolate',
        price: 40.00,
        image_url: 'bolo-cenoura.png',
        category_id: categoriesMap['Bolos Tradicionais'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Pudim de Leite',
        description: 'Pudim de leite condensado tradicional',
        price: 35.00,
        image_url: 'pudim-leite.png',
        category_id: categoriesMap['Sobremesas Geladas'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Torta Salgada de Frango',
        description: 'Torta salgada de frango com catupiry',
        price: 45.00,
        image_url: 'torta-frango.png',
        category_id: categoriesMap['Tortas'],
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
