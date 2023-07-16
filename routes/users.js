const router = require('express').Router();
const  users = require('../models/user');

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  // eslint-disable-next-line no-underscore-dangle, no-shadow
  const user = users.find((user) => user._id === userId);
  res.send(user);
});

router.post('/', (req, res) => {
  const { name, about, avatar } = req.body;

  return users.create({ name, about, avatar })
    .then((user) => res.status(201).send({data: user}))
    .catch((err) => res.status(500).send({message:'Ошибка добавления пользователя'}));
});

module.exports = router;
