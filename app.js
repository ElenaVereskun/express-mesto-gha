const express = require('express');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;

const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => console.log('Сервер работает'))
  .catch(() => console.log('Сервер не работает'));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  req.user = {
    _id: '64b3eb5a45e5e820f3041746'
  };
  next();
});

app.use(routesUsers);
app.use(routesCards);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
