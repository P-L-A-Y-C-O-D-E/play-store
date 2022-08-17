const express = require('express');
const routerApi = require('./routes');

const { logErrors, errorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

// middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/new', (req, res) => {
  res.send('New route');
});

routerApi(app);

// middlewares after the router is mandatory
app.use(logErrors);
app.use(errorHandler);

app.listen(port, ()=> {
 console.log('PORT: ' + port);
});
