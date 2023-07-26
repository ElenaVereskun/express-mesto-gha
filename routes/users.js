const router = require('express').Router();

const {
  getUserId, getUsers, updateProfile, updateAvatar, getUserInfo,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.patch('/me', updateProfile);

router.patch('/me/avatar', updateAvatar);
router.get('/:userId', getUserId);

module.exports = router;
