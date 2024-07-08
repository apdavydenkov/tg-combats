import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const updateCounter = async (userId, counter) => {
  const response = await axios.post(`${API_URL}/api/users/updateCounter`, { userId, counter });
  return response.data;
};

export const getUserInfo = async (userId) => {
  const response = await axios.get(`${API_URL}/api/users/${userId}`);
  return response.data;
};