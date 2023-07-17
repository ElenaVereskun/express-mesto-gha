const users = require('../models/user');

module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return users.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные  при создании пользователя' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.getUsers = (req, res) => {
  users.find({})
    // eslint-disable-next-line no-shadow
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.getUserId = (req, res) => {
  users.findById(req.params.userId)
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.message === 'NotValidId') {
        return res.status(404).send({ message: ' Пользователь по указанному _id не найден' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  users.findByIdAndUpdate(userId, { name, about })
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: ' Переданы некорректные данные при обновлении профиля' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  users.findByIdAndUpdate(userId, { avatar })
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: ' Переданы некорректные данные при обновлении аватара' });
      }
      if (err.message === 'NotValidId') {
        return res.status(404).send({ message: ' Пользователь с указанным _id не найден.' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};
