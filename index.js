const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/new', (req, res) => {
  res.send('New route');
});

routerApi(app);

app.listen(port, ()=> {
 console.log('PORT: ' + port);
});
