const { default: mongoose, MongooseError } = require('mongoose');
const Card = require('../models/card');

const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_INTERNAL_SERVER = 500;
const STATUS_OK = 200;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(STATUS_OK).send({ data: card }))
    .catch(() => res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return Card.create({ name, link, owner })
    .then((card) => res.status(STATUS_OK).send({ data: card }))
    .catch((err) => {
      if (err instanceof MongooseError.ValidationError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(STATUS_OK).send(card))
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      if (err.message === 'NotValidId') {
        return res.status(ERROR_NOT_FOUND).send({ message: ' Карточка с указанным _id не найдена.' });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(new Error('NotValidId'))
  .then((card) => res.status(STATUS_OK).send(card))
  .catch((err) => {
    if (err instanceof mongoose.CastError) {
      return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки лайка.' });
    }
    if (err.message === 'NotValidId') {
      return res.status(ERROR_NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
    }
    return res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' });
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(new Error('NotValidId'))
  .then((card) => res.status(STATUS_OK).send(card))
  .catch((err) => {
    if (err instanceof mongoose.CastError) {
      return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные для снятия лайка.' });
    }
    if (err.message === 'NotValidId') {
      return res.status(ERROR_NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
    }
    return res.status(ERROR_INTERNAL_SERVER).send({ message: 'Ошибка по умолчанию' });
  });
