const cards = require('../models/card');

module.exports.getCards = (req, res) => {
  cards.find({})
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
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
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.deleteCard = (req, res) => {
  cards.findByIdAndRemove(req.params.cardId)
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: ' Карточка с указанным _id не найдена.' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.likeCard = (req, res) => cards.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.status(201).send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка.' });
    }
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
    }
    return res.status(500).send({ message: 'Ошибка по умолчанию' });
  });

module.exports.dislikeCard = (req, res) => cards.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.status(201).send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка.' });
    }
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
    }
    return res.status(500).send({ message: 'Ошибка по умолчанию' });
  });
