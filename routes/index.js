const router = require('express').Router();
const { login, createUser } = require('../controllers/user');
const auth = require('../middlewares/auth');

const userRouter = require('./users');
const cardRouter = require('./cards');

router.post('/signin', auth, login);
router.post('/signup', createUser);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
