const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();

const ERROR_NOT_FOUND = 404;

const mongoose = require('mongoose');

const routes = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => console.log('Сервер работает'))
  .catch(() => console.log('Сервер не работает'));

app.use(express.json());

app.use(routes);

app.use('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).json({ message: 'Страница не найдена' });
});

process.on('uncaughtException', (err, origin) => {
  console.info(
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`,
  );
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
