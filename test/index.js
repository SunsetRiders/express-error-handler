const express             = require('express');
const app                 = express();
const ExpressErrorHandler = require('../lib/express-error-handler');
const Logger              = require('logger');

// process.env.NODE_ENV = 'development';
process.env.NODE_ENV = 'production';

app.use(Logger.injectLogger({}.logs));

app.use((req, res, next) => {
  const anyData = 777;
  res.locals.metadata = {meta: anyData};
  res.locals.errors   = [{message: "(First) Internal Server Error!"}];
  next();
});

app.get('/error', (req, res, next) => {
  const err = new Error('(Second) Internal Server Error!');
  next(err);
});

app.use(ExpressErrorHandler.middleware);

const port = 3000;
app.listen(port);
console.log('\nListening on port ' + port + '\n');