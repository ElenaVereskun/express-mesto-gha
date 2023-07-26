const router = require('express').Router();
const { login, createUser } = require('../controllers/user');
const auth = require('../middlewares/auth');
const { validationCreateUser, validationLogin } = require('../middlewares/validation');

const userRouter = require('./users');
const cardRouter = require('./cards');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

module.exports = router;
