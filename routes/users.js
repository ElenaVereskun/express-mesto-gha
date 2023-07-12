const router = require('express').Router();
const { users } = require('../models/user');

router.get('/users', (req, res) => {
  res.send(users);
});

router.get('/users/:userId', (req, res) => {
  const { userId } = req.params;
  // eslint-disable-next-line no-underscore-dangle, no-shadow
  const user = users.find((user) => user._id === userId);
  res.send(user);
});

router.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;

  users.create({ name, about, avatar });

  res.status(201).send(req.body);
});

module.exports = router;
