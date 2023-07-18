const { default: mongoose } = require('mongoose');
const User = require('../models/user');

const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_INTERNAL_SERVER = 500;
const STATUS_OK = 200;

module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные  при создании пользователя' });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(STATUS_OK).send(users))
    .catch(() => res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' }));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      if (err.message === 'NotValidId') {
        return res.status(ERROR_NOT_FOUND).send({ message: ' Пользователь по указанному _id не найден' });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: ' Переданы некорректные данные при обновлении профиля' });
      }
      if (err.message === 'NotValidId') {
        return res.status(ERROR_NOT_FOUND).send({ message: ' Пользователь по указанному _id не найден' });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: ' Переданы некорректные данные при обновлении аватара' });
      }
      if (err.message === 'NotValidId') {
        return res.status(ERROR_NOT_FOUND).send({ message: ' Пользователь с указанным _id не найден.' });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};
