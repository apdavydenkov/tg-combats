import React, { useContext, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import AuthContext from '../contexts/AuthContext';
import api from '../services/api';

const Login = () => {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const initData = WebApp.initData;
    if (initData) {
      handleLogin(initData);
    }
  }, []);

  const handleLogin = async (initData) => {
    try {
      const response = await api.post('/auth/login', initData);
      setUser(response.data.user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to Battle Game</h1>
      <p>Please log in using Telegram to continue.</p>
    </div>
  );
};

export default Login;