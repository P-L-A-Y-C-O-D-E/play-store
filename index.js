const express = require('express');
const faker = require('faker');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/new', (req, res) => {
  res.send('New route');
});

app.get('/products', (req, res) => {
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
app.get('/products/filter', (req, res) => {
  res.send('I am a filter');
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    "name": "Product 2",
    "price": "2000"
  });
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  })
});

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if ( limit && offset ) {
    res.json({
      limit,
      offset,
    })
  } else {
    res.send('NO PRODUCTS :/');
  }
});

app.listen(port, ()=> {
 console.log('PORT: ' + port);
});
