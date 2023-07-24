const router = require('express').Router();

const {
  getUserId, getUsers, updateProfile, updateAvatar, getUser,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getUser);
router.patch('/me', updateProfile);

router.patch('/me/avatar', updateAvatar);
router.get('/:userId', getUserId);

module.exports = router;
