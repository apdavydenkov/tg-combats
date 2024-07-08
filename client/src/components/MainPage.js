import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import { updateCounter, getUserInfo } from '../services/api';

function MainPage() {
  const { user, tg } = useTelegram();
  const [counter, setCounter] = useState(0);
  const [techInfo, setTechInfo] = useState(null);
  const [isTechInfoVisible, setIsTechInfoVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [platformInfo, setPlatformInfo] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserInfo(user.id);
    }
    if (tg.platform && tg.version) {
      setPlatformInfo(`Platform: ${tg.platform}, Version: ${tg.version}`);
    }
  }, [user, tg]);

  const fetchUserInfo = async (userId) => {
    try {
      const response = await getUserInfo(userId);
      setCounter(response.counter);
      setTechInfo(response);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleClick = useCallback(async () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
    setIsUpdating(true);
    try {
      await updateCounter(user.id, newCounter);
      await fetchUserInfo(user.id);
    } catch (error) {
      console.error('Error updating counter:', error);
    } finally {
      setIsUpdating(false);
    }
  }, [counter, user]);

  if (!user) {
    return <div className="flex justify-center items-center h-screen text-tg-theme-text">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-tg-theme-bg text-tg-theme-text p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Info and Clicks Block */}
        <div className="bg-tg-theme-bg-secondary rounded-lg shadow-lg overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-4">User Information</h2>
          <p><span className="font-medium">Name:</span> {user.first_name} {user.last_name}</p>
          <p><span className="font-medium">Username:</span> @{user.username}</p>
          <p><span className="font-medium">User ID:</span> {user.id}</p>
          <p><span className="font-medium">Language Code:</span> {user.language_code}</p>
          {user.is_premium && <p className="text-yellow-400 font-semibold">Premium User</p>}
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Click Counter</h3>
            <p className="mb-2">Current count: <span className="font-bold text-lg">{counter}</span></p>
            <button 
              onClick={handleClick}
              className={`w-full bg-tg-theme-button text-tg-theme-button-text font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 ${isUpdating ? 'animate-pulse' : ''}`}
            >
              Increase Counter
            </button>
          </div>
        </div>

        {/* Technical Info Block */}
        <div className="bg-tg-theme-bg-secondary rounded-lg shadow-lg overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-4">Technical Information</h2>
          <button
            onClick={() => setIsTechInfoVisible(!isTechInfoVisible)}
            className="w-full bg-tg-theme-button text-tg-theme-button-text font-bold py-2 px-4 rounded mt-4"
          >
            {isTechInfoVisible ? 'Hide' : 'Show'} Technical Info
          </button>
          {isTechInfoVisible && techInfo && (
            <div className="mt-4">
              <p><span className="font-medium">Server Counter:</span> {techInfo.counter}</p>
              <p><span className="font-medium">Created At:</span> {new Date(techInfo.createdAt).toLocaleString()}</p>
              <p><span className="font-medium">Last Updated:</span> {new Date(techInfo.updatedAt).toLocaleString()}</p>
            </div>
          )}
          {platformInfo && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Platform Info:</h3>
              <p>{platformInfo}</p>
            </div>
          )}
        </div>

        {/* Functions Block */}
        <div className="bg-tg-theme-bg-secondary rounded-lg shadow-lg overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-4">Telegram Mini App Functions</h2>
          <Link to="/basic" className="block w-full text-center bg-tg-theme-button text-tg-theme-button-text font-bold py-2 px-4 rounded mt-4">
            Go to Basic Functions
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainPage;