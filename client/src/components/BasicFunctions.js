import React, { useState, useEffect, useCallback } from 'react';
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

  const handleSendData = () => {
    const testData = { action: 'test_action', value: 'Hello from Web App!' };
    tg.sendData(JSON.stringify(testData));
    tg.showPopup({
      title: 'Data Sent',
      message: `Command used: tg.sendData(${JSON.stringify(testData)})\n\nThis data will be received by the bot. Check the bot's console or logs to see the received data.`,
    });
  };

  const handleCloseApp = useCallback(() => {
    tg.showPopup({
      title: 'Closing App',
      message: 'Command used: tg.close()\n\nThe app will close after you dismiss this popup.',
      buttons: [{ type: 'close' }]
    });
    tg.close();
  }, [tg]);

  const handleShowPopup = () => {
    tg.showPopup({
      title: 'Test Popup',
      message: 'Command used: tg.showPopup(params)\n\nThis is how a popup looks like in Telegram Mini Apps.',
      buttons: [
        { type: 'default', text: 'OK' },
        { type: 'cancel' }
      ]
    });
  };

  const handleShowConfirm = () => {
    tg.showConfirm('Command used: tg.showConfirm(message)\n\nAre you sure you want to proceed?')
      .then((result) => {
        tg.showPopup({
          title: 'Confirmation Result',
          message: `You ${result ? 'confirmed' : 'cancelled'} the action.`,
        });
      });
  };

  const handleRequestGeolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          tg.showPopup({
            title: 'Geolocation',
            message: `Command used: navigator.geolocation.getCurrentPosition()\n\nLatitude: ${latitude}\nLongitude: ${longitude}`,
          });
        },
        (error) => {
          tg.showPopup({
            title: 'Geolocation Error',
            message: `Failed to get location: ${error.message}`,
          });
        }
      );
    } else {
      tg.showPopup({
        title: 'Geolocation Not Supported',
        message: 'Geolocation is not supported by this browser or device.',
      });
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
    tg.showPopup({
      title: 'Back Button Toggled',
      message: `Command used: tg.BackButton.${isBackButtonVisible ? 'hide' : 'show'}()\n\nThe Back Button is now ${isBackButtonVisible ? 'hidden' : 'visible'}.`,
    });
  };

  const handleExpandApp = () => {
    tg.expand();
    tg.showPopup({
      title: 'App Expanded',
      message: 'Command used: tg.expand()\n\nThe app should now be expanded to full screen.',
    });
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
        {platformInfo && (
          <div className="mt-6 p-4 bg-white dark:bg-gray-700 rounded shadow">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Platform Info:</h3>
            <p className="text-gray-600 dark:text-gray-300">{platformInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BasicFunctions;