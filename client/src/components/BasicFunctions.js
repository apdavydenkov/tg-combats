import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';

function BasicFunctions() {
  const { tg } = useTelegram();
  const [platformInfo, setPlatformInfo] = useState(null);
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);

  useEffect(() => {
    if (tg.platform && tg.version) {
      setPlatformInfo(`Platform: ${tg.platform}, Version: ${tg.version}`);
    }
  }, [tg]);

  const showResult = (title, command, result) => {
    tg.showPopup({
      title: title,
      message: `Command sent: ${command}\n\nResult received: ${result}`,
    });
  };

  const handleSendData = () => {
    const testData = { action: 'test_action', value: 'Hello from Web App!' };
    tg.sendData(JSON.stringify(testData));
    showResult('Send Data to Bot', `tg.sendData(${JSON.stringify(testData)})`, 'Data sent successfully. Check bot logs for received data.');
  };

  const handleCloseApp = useCallback(() => {
    showResult('Close Web App', 'tg.close()', 'The app will close after you dismiss this popup.');
    tg.close();
  }, [tg]);

  const handleShowPopup = () => {
    tg.showPopup({
      title: 'Show Popup',
      message: 'Command sent: tg.showPopup(params)\n\nResult received: This popup is the result of the command.',
      buttons: [
        { type: 'default', text: 'OK' },
        { type: 'cancel' }
      ]
    });
  };

  const handleShowConfirm = () => {
    tg.showConfirm('Are you sure you want to proceed?')
      .then((result) => {
        showResult('Show Confirm', 'tg.showConfirm(message)', `Command sent: tg.showConfirm('Are you sure you want to proceed?')\n\nResult received: User ${result ? 'confirmed' : 'cancelled'} the action.`);
      });
  };

  const handleRequestGeolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          showResult('Request Geolocation', 'navigator.geolocation.getCurrentPosition()', `Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          showResult('Request Geolocation', 'navigator.geolocation.getCurrentPosition()', `Error: ${error.message}`);
        }
      );
    } else {
      showResult('Request Geolocation', 'navigator.geolocation.getCurrentPosition()', 'Geolocation is not supported by this browser or device.');
    }
  };

  const handleToggleBackButton = () => {
    if (isBackButtonVisible) {
      tg.BackButton.hide();
      setIsBackButtonVisible(false);
    } else {
      tg.BackButton.show();
      setIsBackButtonVisible(true);
    }
    showResult('Toggle Back Button', `tg.BackButton.${isBackButtonVisible ? 'hide' : 'show'}()`, `The Back Button is now ${isBackButtonVisible ? 'hidden' : 'visible'}.`);
  };

  useEffect(() => {
    tg.onEvent('backButtonClicked', handleCloseApp);
    return () => {
      tg.offEvent('backButtonClicked', handleCloseApp);
    };
  }, [tg, handleCloseApp]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-block mb-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
          &larr; Back to Main Page
        </Link>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Basic Telegram Mini App Functions</h2>
          <div className="space-y-4">
            <button onClick={handleSendData} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Send Data to Bot
            </button>
            <button onClick={handleCloseApp} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Close Web App
            </button>
            <button onClick={handleShowPopup} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Show Popup
            </button>
            <button onClick={handleShowConfirm} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
              Show Confirm
            </button>
            <button onClick={handleRequestGeolocation} className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
              Request Geolocation
            </button>
            <button onClick={handleToggleBackButton} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
              Toggle Back Button
            </button>
            {platformInfo && (
              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <h3 className="text-lg font-semibold">Platform Info:</h3>
                <p>{platformInfo}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicFunctions;