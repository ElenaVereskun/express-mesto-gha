const router = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/card');

router.get('/cards', getCards);//возвращает все карточки
router.post('/cards', createCard);//создаёт карточку
router.delete('/cards/:cardId', deleteCard);//создаёт карточку

router.use((req, res) => {
  res.status(404).send({ message: `Ресурс по адресу ${req.path} не найден` });
});

module.exports = router;