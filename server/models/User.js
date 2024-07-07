const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String },
  username: { type: String },
  language_code: { type: String },
  is_premium: { type: Boolean, default: false },
  counter: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);