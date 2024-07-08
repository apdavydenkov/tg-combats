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

  useEffect(() => {
    if (user) {
      fetchUserInfo(user.id);
    }
  }, [user]);

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Info and Clicks Block */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">User Information and Clicks</h2>
          <div className="mb-4">
            <p><span className="font-medium">Name:</span> {user.first_name} {user.last_name}</p>
            <p><span className="font-medium">Username:</span> @{user.username}</p>
            <p><span className="font-medium">User ID:</span> {user.id}</p>
            <p><span className="font-medium">Language Code:</span> {user.language_code}</p>
            {user.is_premium && <p className="text-yellow-500 dark:text-yellow-400 font-semibold">Premium User</p>}
          </div>
          <div>
            <p className="mb-2">Current count: <span className="font-bold text-lg">{counter}</span></p>
            <button 
              onClick={handleClick}
              className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Increase Counter'}
            </button>
          </div>
        </div>

        {/* Technical Info Block */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Technical Information</h2>
          <button
            onClick={() => setIsTechInfoVisible(!isTechInfoVisible)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
          >
            {isTechInfoVisible ? 'Hide' : 'Show'} Technical Info
          </button>
          {isTechInfoVisible && techInfo && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
              <p><span className="font-medium">Server Counter:</span> {techInfo.counter}</p>
              <p><span className="font-medium">Created At:</span> {new Date(techInfo.createdAt).toLocaleString()}</p>
              <p><span className="font-medium">Last Updated:</span> {new Date(techInfo.updatedAt).toLocaleString()}</p>
            </div>
          )}
        </div>

        {/* Function Categories Block */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Function Categories</h2>
          <Link to="/basic" className="block w-full text-center bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mb-2">
            Basic Telegram Functions
          </Link>
          <Link to="/mainbutton" className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mb-2">
            Main Button Functions
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainPage;