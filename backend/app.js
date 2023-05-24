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

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
// app.use(cors);
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
