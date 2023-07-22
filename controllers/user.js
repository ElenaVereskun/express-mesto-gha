const { default: mongoose } = require('mongoose');
const validator = require('validator');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const JWT = require('jsonwebtoken');
const User = require('../models/user');

const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_INTERNAL_SERVER = 500;
const STATUS_OK = 200;

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  /* const hash = bcryptjs.hash(password, 10); */

  return User.create({
    name, about, avatar, email, password,
  })
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные  при создании пользователя' });
      }
      if (err === validator) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные почта или пароль' });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(STATUS_OK).send(users))
    .catch(() => res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('DocumentNotFoundError'))
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      if (err.message === 'DocumentNotFoundError') {
        return res.status(ERROR_NOT_FOUND).send({ message: ' Пользователь по указанному _id не найден' });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('DocumentNotFoundError'))
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      if (err.message === 'DocumentNotFoundError') {
        return res.status(ERROR_NOT_FOUND).send({ message: ' Пользователь по указанному _id не найден' });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('DocumentNotFoundError'))
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: ' Переданы некорректные данные при обновлении профиля' });
      }
      if (err.message === 'DocumentNotFoundError') {
        return res.status(ERROR_NOT_FOUND).send({ message: ' Пользователь по указанному _id не найден' });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('DocumentNotFoundError'))
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: ' Переданы некорректные данные при обновлении аватара' });
      }
      if (err.message === 'DocumentNotFoundError') {
        return res.status(ERROR_NOT_FOUND).send({ message: ' Пользователь с указанным _id не найден.' });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};

// eslint-disable-next-line consistent-return
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).send({ message: 'Email or password is empty' });
    return;
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(400).send({ message: 'Пользователь не найден' });
      }

      const token = JWT.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      const passwordHash = bcrypt.hash(req.body.password, 10);
      const result = bcrypt.compare(req.body.password, passwordHash);
      if (!result) {
        res.status(400).send({ message: 'Неправильное имя пользователя или пароль' });
        return;
      }
      res.status(200).send({ _id: token });
    });
};
