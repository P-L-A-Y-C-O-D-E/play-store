const boom = require('@hapi/boom');

// I need the schema and property to pass them to the middleware returned
// 1. Since the info we need to validate could be in:
//    a) req.query, req.body, req.params
//    b) property will help us to dinamically specify where it is the info in req
function validatorHandler(schema, property) {
  // Clousers = Clausuras = Creacion de un middleware de forma dinamica
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error)); // enviamos el middleware a los demas middlewares
    }
    next(); // continue to the next middleware if there is no error.
  }
}

module.exports = validatorHandler;
