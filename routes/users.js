const router = require('express').Router();

const {
  postUser, getUserId, getUsers, updateProfile, updateAvatar,
} = require('../controllers/user');

router.post('/', postUser);
router.get('/', getUsers);
router.get('/:userId', getUserId);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
