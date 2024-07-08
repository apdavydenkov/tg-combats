import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';

function TestFunctionsPage() {
  const { tg } = useTelegram();
  const [mainButton, setMainButton] = useState({ visible: false, text: 'MAIN BUTTON' });

  useEffect(() => {
    tg.MainButton.setText(mainButton.text);
    if (mainButton.visible) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  }, [mainButton, tg.MainButton]);

  const toggleMainButton = () => {
    setMainButton(prev => ({ ...prev, visible: !prev.visible }));
  };

  const changeMainButtonText = () => {
    setMainButton(prev => ({ ...prev, text: `BUTTON ${Math.random().toString(36).substr(2, 5)}` }));
  };

  return (
    <div className="min-h-screen bg-tg-theme-bg text-tg-theme-text p-4">
      <div className="max-w-md mx-auto bg-tg-theme-bg-secondary rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Test Functions</h1>
          <button onClick={toggleMainButton} className="w-full bg-tg-theme-button text-tg-theme-button-text font-bold py-2 px-4 rounded mb-4">
            {mainButton.visible ? 'Hide' : 'Show'} Main Button
          </button>
          <button onClick={changeMainButtonText} className="w-full bg-tg-theme-button text-tg-theme-button-text font-bold py-2 px-4 rounded mb-4">
            Change Main Button Text
          </button>
          <Link to="/" className="block w-full text-center bg-tg-theme-button text-tg-theme-button-text font-bold py-2 px-4 rounded">
            Back to Main Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TestFunctionsPage;