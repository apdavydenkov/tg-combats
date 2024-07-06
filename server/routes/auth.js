const express = require('express');
const router = express.Router();
const User = require('../models/User');
const crypto = require('crypto');

router.post('/login', async (req, res) => {
  try {
    const { id, first_name, last_name, username, auth_date, hash } = req.body;

    // Verify the authentication data
    const secret = crypto.createHash('sha256').update(process.env.BOT_TOKEN).digest();
    const dataCheckString = Object.keys(req.body)
      .filter(key => key !== 'hash')
      .sort()
      .map(key => `${key}=${req.body[key]}`)
      .join('\n');
    const hmac = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex');

    if (hmac !== hash) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    let user = await User.findOne({ telegramId: id });
    if (!user) {
      user = new User({
        telegramId: id,
        firstName: first_name,
        lastName: last_name,
        username: username
      });
      await user.save();
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;