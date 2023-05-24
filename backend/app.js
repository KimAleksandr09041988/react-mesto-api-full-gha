const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();
const router = require('./routes/index');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validateSignup, validateSignin, handleErrors } = require('./middlewares/errors');
const NotFound = require('./customErrors/NotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const cors = require('./cors/cors');

// eslint-disable-next-line import/no-extraneous-dependencies, import/order
const parser = require('cookie-parser');

const allowedCors = [
  'https://kimfrontend.nomoredomains.monster',
  'http://kimfrontend.nomoredomains.monster',
  'https://localhost:3000',
  'http://localhost:3000',
];

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
// app.use(cors);
app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
  // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Origin', '*');
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateSignin, login);
app.post('/signup', validateSignup, createUser);

app.get('/signout', (_, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

app.use(parser());
app.use(auth);

app.use(router);
app.use((req, res, next) => {
  const err = new NotFound('адресс не существует');
  next(err);
});

app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
