const router = require('express').Router();

const {
  getUserId, getUsers, updateProfile, updateAvatar, getUser,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.patch('/me', updateProfile);
router.get('/me', getUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
