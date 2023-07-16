const express = require('express');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

// eslint-disable-next-line import/order
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => console.log('Сервер работает'))
  .catch(() => console.log('Сервер не работает'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '64b3eb5a45e5e820f3041746',
  };
  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
