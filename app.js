const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();

const mongoose = require('mongoose');

const routes = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => console.log('Сервер работает'))
  .catch(() => console.log('Сервер не работает'));

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64b3eb5a45e5e820f3041746',
  };
  next();
});

/* app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards')); */

app.use(routes);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
