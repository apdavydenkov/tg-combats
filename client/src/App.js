import React, { useEffect, useState } from 'react';
import axios from 'axios';

const tg = window.Telegram.WebApp;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    tg.ready();
    tg.expand();

    const initData = tg.initData;
    const initDataUnsafe = tg.initDataUnsafe;

    if (initDataUnsafe.user) {
      setUser(initDataUnsafe.user);
      saveUserToDatabase(initDataUnsafe.user);
    }
  }, []);

  const saveUserToDatabase = async (userData) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, userData);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Telegram Mini App</h1>
      {user && (
        <div>
          <h2>Welcome, {user.first_name}!</h2>
          <p>Your Telegram ID: {user.id}</p>
        </div>
      )}
    </div>
  );
}

export default App;