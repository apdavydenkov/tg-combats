import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL
});

export const login = (userData) => api.post('/api/auth/login', userData);
export const createBattle = (userId) => api.post('/api/battles/create', { userId });
export const acceptBattle = (battleId, userId) => api.post('/api/battles/accept', { battleId, userId });
export const makeMove = (battleId, userId, move) => api.post('/api/battles/move', { battleId, userId, ...move });
export const getLeaderboard = () => api.get('/api/leaderboard');
export const getBattle = (battleId) => api.get(`/api/battles/${battleId}`);

export default api;