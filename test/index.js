const express             = require('express');
const app                 = express();
const ExpressErrorHandler = require('../lib/express-error-handler');

app.use((req, res, next) => {
  res.locals.metadata = {meta: 777};
  res.locals.errors   = [{message: "(First) Internal Server Error!"}];
  next();
});

app.get('/error', (req, res) => {
  const err = new Error('(Second) Internal Server Error!');
  throw err;
});

app.use(ExpressErrorHandler.middleware);

const port = 3000;
app.listen(port);
console.log('\nListening on port ' + port + '\n');