const users = require('../models/user');

module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return users.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Переданы некорректные данные  при создании пользователя' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Пользователи не найдены' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.getUsers = (req, res) => {
  users.find({})
    // eslint-disable-next-line no-shadow
    .then((users) => res.status(201).send(users))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Пользователи не найдены' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.getUserId = (req, res) => {
  users.findById(req.params.userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: ' Пользователь по указанному _id не найден' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateProfile = (req, res) => {
  users.findByIdAndUpdate(req.params.userId)
    .then((user) => res.status(201).findByIdAndUpdate(user))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateAvatar = (req, res) => {
  users.findByIdAndUpdate(req.params.userId)
    .then((user) => res.status(201).findByIdAndUpdate(user))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};
