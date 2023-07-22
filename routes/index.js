const router = require('express').Router();
const { login, createUser } = require('../controllers/user');
const { auth } = require('../middlewares/auth');

const userRouter = require('./users');
const cardRouter = require('./cards');

router.post('/signin', login);
router.post('/signup', createUser);

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

module.exports = router;
