const mongoose = require('mongoose');

const BattleSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  opponent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['waiting', 'in_progress', 'finished', 'cancelled'],
    default: 'waiting'
  },
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  rounds: [{
    creatorMove: { attack: String, defense: [String] },
    opponentMove: { attack: String, defense: [String] },
    result: { creatorDamage: Number, opponentDamage: Number }
  }],
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Battle', BattleSchema);