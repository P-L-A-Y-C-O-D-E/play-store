// Configuration routes per modules

const productsRouter = require('./products.router');
const usersRouter = require('./users.router.js');
const categoriesRouter = require('./categories.router');

function routerApi(app) {
  // endpoint setup
  const router = require('express').Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;
