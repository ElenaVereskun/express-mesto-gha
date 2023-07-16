const router = require('express').Router();

const { postUser, getUserId, getUsers } = require('../controllers/user');

router.post('/users', postUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUserId);

router.use((req, res) => {
  res.status(404).send({ message: `Ресурс по адресу ${req.path} не найден` });
});

module.exports = router;