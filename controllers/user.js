const router = require('express').Router();
const users = require('../models/user');
//создание пользователя
module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return users.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' }));
}
//получение всех пользователей
module.exports.getUsers = (req, res) => {
  users.find({})
    .then((users) => res.status(201).send(users))
    .catch((err) => res.status(500).send({ message: 'Пользователи не найдены' }));
}
//получение пользователя по айдишнику
module.exports.getUserId = (req, res) => {
  users.findById(req.params.userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(404).send({ message: ' Пользователь по указанному _id не найден' }));
}