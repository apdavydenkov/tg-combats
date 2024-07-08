import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';

function MainButtonFunctions() {
  const { tg } = useTelegram();
  const [isMainButtonVisible, setIsMainButtonVisible] = useState(false);
  const [mainButtonText, setMainButtonText] = useState('MAIN BUTTON');

  const showResult = (title, command, result) => {
    tg.showPopup({
      title: title,
      message: `Command sent: ${command}\n\nResult received: ${result}`,
    });
  };

  const handleToggleMainButton = () => {
    if (isMainButtonVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
    setIsMainButtonVisible(!isMainButtonVisible);
    showResult('Toggle Main Button', `tg.MainButton.${isMainButtonVisible ? 'hide' : 'show'}()`, `Main Button is now ${isMainButtonVisible ? 'hidden' : 'visible'}.`);
  };

  const handleChangeMainButtonText = () => {
    const newText = `Button ${Math.random().toString(36).substr(2, 5)}`;
    tg.MainButton.setText(newText);
    setMainButtonText(newText);
    showResult('Change Main Button Text', `tg.MainButton.setText('${newText}')`, `Main Button text changed to '${newText}'.`);
  };

  const handleChangeMainButtonTextColor = () => {
    const newColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    tg.MainButton.setTextColor(newColor);
    showResult('Change Main Button Text Color', `tg.MainButton.setTextColor('${newColor}')`, `Main Button text color changed to ${newColor}.`);
  };

  const handleChangeMainButtonColor = () => {
    const newColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    tg.MainButton.setBackgroundColor(newColor);
    showResult('Change Main Button Color', `tg.MainButton.setBackgroundColor('${newColor}')`, `Main Button color changed to ${newColor}.`);
  };

  const handleToggleMainButtonEnable = () => {
    if (tg.MainButton.isActive) {
      tg.MainButton.disable();
    } else {
      tg.MainButton.enable();
    }
    showResult('Toggle Main Button Enable', `tg.MainButton.${tg.MainButton.isActive ? 'disable' : 'enable'}()`, `Main Button is now ${tg.MainButton.isActive ? 'disabled' : 'enabled'}.`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-block mb-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
          &larr; Back to Main Page
        </Link>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Main Button Functions</h2>
          <div className="space-y-4">
            <button onClick={handleToggleMainButton} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              {isMainButtonVisible ? 'Hide' : 'Show'} Main Button
            </button>
            <button onClick={handleChangeMainButtonText} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Change Main Button Text
            </button>
            <button onClick={handleChangeMainButtonTextColor} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
              Change Main Button Text Color
            </button>
            <button onClick={handleChangeMainButtonColor} className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
              Change Main Button Color
            </button>
            <button onClick={handleToggleMainButtonEnable} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
              Enable/Disable Main Button
            </button>
          </div>
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded">
            <h3 className="text-lg font-semibold mb-2">Current Main Button State:</h3>
            <p><strong>Visible:</strong> {isMainButtonVisible ? 'Yes' : 'No'}</p>
            <p><strong>Text:</strong> {mainButtonText}</p>
            <p><strong>Enabled:</strong> {tg.MainButton.isActive ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainButtonFunctions;