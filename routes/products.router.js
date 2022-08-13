const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const { size} = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});

// Las rutas especificas debe ir siempre antes de las rutas dinamicas sino chocaran y se confundiran como parametros
router.get('/filter', (req, res) => {
  res.send('I am a filter');
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id === '999') {
    res.status(404).json({
      message: 'NOT FOUND'
    });
  } else {
    res.json({
      id,
      "name": "Product 2",
      "price": "2000"
    });
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: "Product created",
    data: body
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "Product partial updated",
    data: body,
    id
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'Product deleted',
    id
  });
})

module.exports = router;
