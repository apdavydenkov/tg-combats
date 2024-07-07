const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCounter = async (req, res) => {
  try {
    const { userId, counter } = req.body;
    const user = await User.findOneAndUpdate(
      { id: userId },
      { $set: { counter: counter } },
      { new: true }
    );
    res.json({ success: true, counter: user.counter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      counter: user.counter,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};