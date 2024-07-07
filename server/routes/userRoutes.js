const express = require('express');
const router = express.Router();
const { createUser, getUsers, updateCounter, getUserInfo } = require('../controllers/userController');

router.post('/', createUser);
router.get('/', getUsers);
router.post('/updateCounter', updateCounter);
router.get('/:userId', getUserInfo);

module.exports = router;