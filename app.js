const express = require('express');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;

const  users = require('./models/user');
const routes = require('./routes/index');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => console.log('Сервер работает'))
  .catch(() => console.log('Сервер не работает'));

const app = express();

app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
