const { Product, Category } = require('../models');

// Listar todos os produtos
exports.findAll = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: Category,
        as: 'category'
      }]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos", error: error.message });
  }
};

// Buscar um produto por ID
exports.findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      include: [{
        model: Category,
        as: 'category'
      }]
    });
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produto", error: error.message });
  }
};

// Criar novo produto
exports.create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar produto", error: error.message });
  }
};

// Atualizar produto
exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Product.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    const product = await Product.findByPk(id);
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar produto", error: error.message });
  }
};

// Remover produto
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Product.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover produto", error: error.message });
  }
};

// Buscar produtos por categoria
exports.findByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.findAll({
      where: { category_id: categoryId },
      include: [{
        model: Category,
        as: 'category'
      }]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos por categoria", error: error.message });
  }
};
