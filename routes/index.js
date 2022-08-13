// Configuration routes per modules

const productosRouter = require('./products.router');
const usersRouter = require('./users.router.js');
const categoriesRouter = require('./categories.router');

function routerApi(app) {
  // endpoint setup
  app.use('/products', productosRouter);
  app.use('users', usersRouter);
  app.use('categories', categoriesRouter);
}

module.exports = routerApi;
