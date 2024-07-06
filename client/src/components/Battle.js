import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import api from '../services/api';
import io from 'socket.io-client';

const Battle = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [battle, setBattle] = useState(null);
  const [attack, setAttack] = useState('');
  const [defense, setDefense] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);
    socket.on('battleUpdate', updateBattle);

    fetchBattle();

    return () => socket.disconnect();
  }, [id]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (battle && battle.status === 'in_progress') {
      makeMove();
    }
  }, [timeLeft, battle]);

  const fetchBattle = async () => {
    try {
      const response = await api.get(`/battles/${id}`);
      setBattle(response.data);
      if (response.data.status === 'in_progress') {
        setTimeLeft(30);
      }
    } catch (error) {
      console.error('Failed to fetch battle:', error);
    }
  };

  const updateBattle = (updatedBattle) => {
    if (updatedBattle._id === id) {
      setBattle(updatedBattle);
      if (updatedBattle.status === 'in_progress') {
        setTimeLeft(30);
      }
    }
  };

  const makeMove = async () => {
    try {
      await api.post('/battles/move', {
        battleId: id,
        userId: user._id,
        attack,
        defense
      });
      setAttack('');
      setDefense([]);
    } catch (error) {
      console.error('Failed to make move:', error);
    }
  };

  const handleDefenseChange = (zone) => {
    setDefense(prev => 
      prev.includes(zone) 
        ? prev.filter(d => d !== zone)
        : prev.length < 2 ? [...prev, zone] : prev
    );
  };

  if (!battle) return <div>Loading...</div>;

  return (
    <div>
      <h1>Battle</h1>
      <p>Status: {battle.status}</p>
      <p>Time left: {timeLeft}</p>
      {battle.status === 'in_progress' && (
        <div>
          <h2>Make your move</h2>
          <div>
            <h3>Attack</h3>
            {ZONES.map(zone => (
              <button 
                key={zone} 
                onClick={() => setAttack(zone)}
                style={{ backgroundColor: attack === zone ? 'lightblue' : 'white' }}
              >
                {zone}
              </button>
            ))}
          </div>
          <div>
            <h3>Defense (choose 2)</h3>
            {ZONES.map(zone => (
              <button 
                key={zone} 
                onClick={() => handleDefenseChange(zone)}
                style={{ backgroundColor: defense.includes(zone) ? 'lightgreen' : 'white' }}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>
      )}
      {battle.rounds.map((round, index) => (
        <div key={index}>
          <h3>Round {index + 1}</h3>
          <p>Your damage: {round.result.opponentDamage}</p>
          <p>Opponent's damage: {round.result.creatorDamage}</p>
        </div>
      ))}
      {battle.status === 'finished' && (
        <h2>{battle.winner === user._id ? 'You won!' : 'You lost!'}</h2>
      )}
    </div>
  );
};

export default Battle;