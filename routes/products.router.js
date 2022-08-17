const express = require('express');
const ProductsService = require('../services/product.service');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

// Las rutas especificas debe ir siempre antes de las rutas dinamicas sino chocaran y se confundiran como parametros
router.get('/filter', (req, res) => {
  res.send('I am a filter');
});

router.get('/:id', async (req, res, next) => {
  // Definiendo el middleware error de forma explicita
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const productId = await service.delete(id);
  res.json(productId);
});

module.exports = router;
