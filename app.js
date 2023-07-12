const express = require('express');
const router = require('./routes/users');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;
const app = express();

/* app.get('/', (req, res) => {
  res.status(404).send('<h1>Страница не найдена</h1>');
}); */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
