const { default: mongoose } = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');

const ERROR_BAD_REQUEST = 400;
/* const ERROR_NOT_FOUND = 404; */
const ERROR_INTERNAL_SERVER = 500;
const STATUS_OK = 200;

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
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

module.exports.getUser = (req, res, next) => {
  const { userId } = req.body;
  User.findOne(userId)
    .orFail(new Error('DocumentNotFoundError'))
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      if (err.message === 'DocumentNotFoundError') {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' });
    })
    .catch(next);
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error('DocumentNotFoundError'))
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      if (err.message === 'DocumentNotFoundError') {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
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
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
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
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      const token = JWT.sign({ userId }, 'some-secret-key', { expiresIn: '7d' });
      res.status(STATUS_OK).send({ _id: token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    })
    .catch(next);
};
