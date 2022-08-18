const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

// middleware
app.use(express.json());

// CORS middleware
// app.use(cors()); // allow everyone like a public API
const whitelist = ['http://localhost:8080', 'http://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if (origin.includes(whitelist)) {
      callback(null, true); // no errors, allow access
    } else {
      callback(new Error('Access not allow'));
    }
  }
}
app.use(cors(options)); // access restricted

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/new', (req, res) => {
  res.send('New route');
});

routerApi(app);

// middlewares after the router is mandatory
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=> {
 console.log('PORT: ' + port);
});
