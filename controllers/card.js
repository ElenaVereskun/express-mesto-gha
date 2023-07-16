const router = require('express').Router();
const cards = require('../models/card');

module.exports.getCards = (req, res) => {
  const { name, link } = req.body;
  return cards.create({ name, link })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => res.status(400).send({ message: 'Переданы некорректные данные при получении карточек' }));
}

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;

  return cards.create({ name, link })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => res.status(400).send({ message: ' Переданы некорректные данные при создании карточки' }));
}

module.exports.deleteCard = (req, res) => {
  const { userId } = req.params;
  return cards.find((card) => card._id === userId)
    .then((card) => res.status(201).delete(card))
    .catch((err) => res.status(404).send({ message: 'Карточка с указанным _id не найдена' }));
}