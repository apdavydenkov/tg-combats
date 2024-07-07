import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import { Link, useHistory, useParams } from 'react-router-dom';
import { createBattle, acceptBattle, makeMove, getLeaderboard, login } from '../services/api';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [activeBattles, setActiveBattles] = useState([]);

  useEffect(() => {
    fetchActiveBattles();
  }, []);

  const fetchActiveBattles = async () => {
    try {
      const response = await api.get('/battles/active');
      setActiveBattles(response.data);
    } catch (error) {
      console.error('Failed to fetch active battles:', error);
    }
  };

  const createBattle = async () => {
    try {
      await api.post('/battles/create', { userId: user._id });
      fetchActiveBattles();
    } catch (error) {
      console.error('Failed to create battle:', error);
    }
  };

  const acceptBattle = async (battleId) => {
    try {
      await api.post('/battles/accept', { battleId, userId: user._id });
      fetchActiveBattles();
    } catch (error) {
      console.error('Failed to accept battle:', error);
    }
  };

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <button onClick={createBattle}>Create Battle</button>
      <h2>Active Battles</h2>
      <ul>
        {activeBattles.map(battle => (
          <li key={battle._id}>
            Battle created by {battle.creator.username}
            {battle.creator._id !== user._id && (
              <button onClick={() => acceptBattle(battle._id)}>Accept</button>
            )}
          </li>
        ))}
      </ul>
      <Link to="/leaderboard">View Leaderboard</Link>
    </div>
  );
};

export default Home;