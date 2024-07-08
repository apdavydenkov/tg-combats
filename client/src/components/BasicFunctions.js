import React, { useState, useEffect, useCallback } from 'react';
import { useTelegram } from '../hooks/useTelegram';

function BasicFunctions() {
  const { tg } = useTelegram();
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);

  const showResult = (title, command, result) => {
    tg.showPopup({
      title: title,
      message: `Command sent: ${command}\n\nResult received: ${result}`,
    });
  };

  const handleSendData = () => {
    const testData = { action: 'test_action', value: 'Hello from Web App!' };
    tg.sendData(JSON.stringify(testData));
    showResult('Send Data', `tg.sendData(${JSON.stringify(testData)})`, "Data sent to the bot. Check the bot's logs to see the received data.");
  };

  const handleCloseApp = useCallback(() => {
    showResult('Close App', 'tg.close()', 'The app will close after you dismiss this popup.');
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
        showResult('Show Confirm', 'tg.showConfirm(message)', `You ${result ? 'confirmed' : 'cancelled'} the action.`);
      });
  };

  const handleRequestGeolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          showResult('Request Geolocation', 'navigator.geolocation.getCurrentPosition()', `Latitude: ${latitude}\nLongitude: ${longitude}`);
        },
        (error) => {
          showResult('Request Geolocation', 'navigator.geolocation.getCurrentPosition()', `Failed to get location: ${error.message}`);
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

  const handleExpandApp = () => {
    tg.expand();
    showResult('Expand App', 'tg.expand()', 'The app should now be expanded to full screen.');
  };

  useEffect(() => {
    tg.onEvent('backButtonClicked', handleCloseApp);
    return () => {
      tg.offEvent('backButtonClicked', handleCloseApp);
    };
  }, [tg, handleCloseApp]);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Basic Telegram Mini App Functions</h2>
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
        <button onClick={handleExpandApp} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">
          Expand App
        </button>
      </div>
    </div>
  );
}

export default BasicFunctions;