const router = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/card');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);

router.use((req, res) => {
  res.status(404).send({ message: `Ресурс по адресу ${req.path} не найден` });
});

module.exports = router;
