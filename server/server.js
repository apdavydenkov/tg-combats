const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');
const { setupBot } = require('./controllers/botController');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

app.use('/api/users', userRoutes);

// Аутентификация
app.post('/api/auth/verify', (req, res) => {
  const { initData } = req.body;
  
  const parsedData = new URLSearchParams(initData);
  const hash = parsedData.get('hash');
  parsedData.delete('hash');
  
  const dataCheckString = Array.from(parsedData.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(process.env.TELEGRAM_BOT_TOKEN).digest();
  
  const calculatedHash = crypto.createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  if (calculatedHash === hash) {
    const user = JSON.parse(parsedData.get('user'));
    res.json({ authenticated: true, user });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

// Обновление счетчика
app.post('/api/users/updateCounter', async (req, res) => {
  const { userId, counter } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { id: userId },
      { $set: { counter: counter } },
      { new: true }
    );
    res.json({ success: true, counter: user.counter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

setupBot();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});