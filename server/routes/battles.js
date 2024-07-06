const express = require('express');
const router = express.Router();
const Battle = require('../models/Battle');
const User = require('../models/User');

router.post('/create', async (req, res) => {
  try {
    const { userId } = req.body;
    const expiresAt = new Date(Date.now() + 5 * 60000); // 5 minutes from now

    const battle = new Battle({
      creator: userId,
      status: 'waiting',
      expiresAt
    });

    await battle.save();

    setTimeout(async () => {
      const updatedBattle = await Battle.findById(battle._id);
      if (updatedBattle.status === 'waiting') {
        updatedBattle.status = 'cancelled';
        await updatedBattle.save();
      }
    }, 5 * 60000);

    res.status(201).json(battle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/accept', async (req, res) => {
  try {
    const { battleId, userId } = req.body;
    const battle = await Battle.findById(battleId);

    if (!battle || battle.status !== 'waiting') {
      return res.status(400).json({ message: 'Battle not available' });
    }

    battle.opponent = userId;
    battle.status = 'in_progress';
    await battle.save();

    res.json(battle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/move', async (req, res) => {
  try {
    const { battleId, userId, attack, defense } = req.body;
    const battle = await Battle.findById(battleId);

    if (!battle || battle.status !== 'in_progress') {
      return res.status(400).json({ message: 'Invalid battle' });
    }

    const isCreator = battle.creator.toString() === userId;
    const currentRound = battle.rounds[battle.rounds.length - 1] || { creatorMove: {}, opponentMove: {} };

    if (isCreator) {
      currentRound.creatorMove = { attack, defense };
    } else {
      currentRound.opponentMove = { attack, defense };
    }

    if (currentRound.creatorMove.attack && currentRound.opponentMove.attack) {
      // Calculate damage
      const creatorDamage = currentRound.opponentMove.defense.includes(currentRound.creatorMove.attack) ? 0 : 20;
      const opponentDamage = currentRound.creatorMove.defense.includes(currentRound.opponentMove.attack) ? 0 : 20;

      currentRound.result = { creatorDamage, opponentDamage };
      battle.rounds.push(currentRound);

      // Check if battle is finished
      const creatorTotalDamage = battle.rounds.reduce((sum, round) => sum + round.result.creatorDamage, 0);
      const opponentTotalDamage = battle.rounds.reduce((sum, round) => sum + round.result.opponentDamage, 0);

      if (creatorTotalDamage >= 100 || opponentTotalDamage >= 100) {
        battle.status = 'finished';
        battle.winner = creatorTotalDamage >= 100 ? battle.opponent : battle.creator;

        // Update user stats
        const winner = await User.findById(battle.winner);
        const loser = await User.findById(battle.winner.toString() === battle.creator.toString() ? battle.opponent : battle.creator);

        winner.battles.total++;
        winner.battles.won++;
        loser.battles.total++;
        loser.battles.lost++;

        await winner.save();
        await loser.save();
      }
    }

    await battle.save();
    res.json(battle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;