const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
      .sort({ 'battles.won': -1, 'battles.total': -1 })
      .limit(10)
      .select('username battles');

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;