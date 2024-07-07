import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash/debounce';

const tg = window.Telegram.WebApp;

function MainPage() {
  const [user, setUser] = useState(null);
  const [counter, setCounter] = useState(0);
  const [techInfo, setTechInfo] = useState(null);
  const [isTechInfoVisible, setIsTechInfoVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const lastSentCounter = useRef(0);

  useEffect(() => {
    tg.ready();
    tg.expand();

    const initData = tg.initData;
    
    axios.post(`${process.env.REACT_APP_API_URL}/api/auth/verify`, { initData })
      .then(response => {
        if (response.data.authenticated) {
          setUser(response.data.user);
          fetchUserInfo(response.data.user.id);
        }
      })
      .catch(error => console.error('Authentication error:', error));
  }, []);

  const fetchUserInfo = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userId}`);
      setCounter(response.data.counter);
      setTechInfo(response.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const updateCounterOnServer = useCallback(
    debounce((userId, counterValue) => {
      if (counterValue !== lastSentCounter.current) {
        setIsUpdating(true);
        axios.post(`${process.env.REACT_APP_API_URL}/api/users/updateCounter`, { userId, counter: counterValue })
          .then(() => {
            lastSentCounter.current = counterValue;
          })
          .catch(error => console.error('Error updating counter:', error))
          .finally(() => {
            setIsUpdating(false);
          });
      }
    }, 10000),
    []
  );

  const handleClick = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
    updateCounterOnServer(user.id, newCounter);
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen text-tg-theme-text">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-tg-theme-bg text-tg-theme-text p-4">
      <div className="max-w-md mx-auto bg-tg-theme-bg-secondary rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Telegram Mini App</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">User Information:</h2>
            <p><span className="font-medium">Name:</span> {user.first_name} {user.last_name}</p>
            <p><span className="font-medium">Username:</span> @{user.username}</p>
            <p><span className="font-medium">User ID:</span> {user.id}</p>
            <p><span className="font-medium">Language Code:</span> {user.language_code}</p>
            {user.is_premium && <p className="text-yellow-400 font-semibold">Premium User</p>}
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Click Counter:</h2>
            <p className="mb-2">Current count: <span className="font-bold text-lg">{counter}</span></p>
            <button 
              onClick={handleClick}
              className={`w-full bg-tg-theme-button text-tg-theme-button-text font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 ${isUpdating ? 'animate-pulse' : ''}`}
            >
              Increase Counter
            </button>
          </div>
          <div>
            <button
              onClick={() => setIsTechInfoVisible(!isTechInfoVisible)}
              className="w-full bg-tg-theme-button text-tg-theme-button-text font-bold py-2 px-4 rounded mt-4"
            >
              {isTechInfoVisible ? 'Hide' : 'Show'} Technical Info
            </button>
            {isTechInfoVisible && techInfo && (
              <div className="mt-4 p-4 bg-tg-theme-bg rounded">
                <p><span className="font-medium">Server Counter:</span> {techInfo.counter}</p>
                <p><span className="font-medium">Created At:</span> {new Date(techInfo.createdAt).toLocaleString()}</p>
                <p><span className="font-medium">Last Updated:</span> {new Date(techInfo.updatedAt).toLocaleString()}</p>
              </div>
            )}
          </div>
          <Link to="/test" className="block w-full text-center bg-tg-theme-button text-tg-theme-button-text font-bold py-2 px-4 rounded mt-4">
            Go to Test Functions
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainPage;