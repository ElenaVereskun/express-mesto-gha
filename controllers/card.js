const cards = require('../models/card');

module.exports.getCards = (req, res) => {
  cards.find({})
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Переданы некорректные данные при получении карточек' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return cards.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.deleteCard = (req, res) => {
  cards.findById(req.params.userId)
    .then((card) => res.status(201).delete(card))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: ' Карточка c указанному _id не найдена' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};
