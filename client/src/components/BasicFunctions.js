import React, { useState, useEffect, useCallback } from 'react';
import { useTelegram } from '../hooks/useTelegram';

function BasicFunctions() {
  const { tg } = useTelegram();
  const [platformInfo, setPlatformInfo] = useState(null);

  useEffect(() => {
    if (tg.platform && tg.version) {
      setPlatformInfo(`Platform: ${tg.platform}, Version: ${tg.version}`);
    }
  }, [tg]);

  const handleSendData = () => {
    // Команда: tg.sendData(data)
    // Отправляет данные в бота
    tg.sendData(JSON.stringify({ action: 'test_action', value: 'test_value' }));
    alert('Data sent to bot. Check bot logs for received data.');
  };

  const handleCloseApp = useCallback(() => {
    // Команда: tg.close()
    // Закрывает веб-приложение
    tg.close();
  }, [tg]);

  const handleShowPopup = () => {
    // Команда: tg.showPopup(params)
    // Отображает всплывающее уведомление
    tg.showPopup({
      title: 'Test Popup',
      message: 'This is a test popup message',
      buttons: [
        { type: 'ok' },
        { type: 'close' }
      ]
    });
  };

  const handleShowConfirm = () => {
    // Команда: tg.showConfirm(message)
    // Отображает подтверждающее всплывающее окно
    tg.showConfirm('Are you sure you want to proceed?')
      .then((result) => {
        alert(`Confirmation result: ${result}`);
      });
  };

  const handleRequestGeolocation = () => {
    // Команда: tg.requestLocation()
    // Запрашивает геолокацию пользователя
    if (tg.isVersionAtLeast('6.2')) {
      tg.requestLocation()
        .then((location) => {
          alert(`Latitude: ${location.latitude}, Longitude: ${location.longitude}`);
        })
        .catch(() => {
          alert('Geolocation request was rejected or failed');
        });
    } else {
      alert('Geolocation is not supported in this Telegram version');
    }
  };

  const handleToggleBackButton = () => {
    // Команда: tg.BackButton.show() / tg.BackButton.hide()
    // Показывает или скрывает кнопку "Назад"
    if (tg.BackButton.isVisible) {
      tg.BackButton.hide();
    } else {
      tg.BackButton.show();
    }
  };

  const handleExpandApp = () => {
    // Команда: tg.expand()
    // Разворачивает веб-приложение на весь экран
    tg.expand();
  };

  useEffect(() => {
    // Устанавливаем обработчик для кнопки "Назад"
    tg.onEvent('backButtonClicked', handleCloseApp);
    return () => {
      tg.offEvent('backButtonClicked', handleCloseApp);
    };
  }, [tg, handleCloseApp]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Basic Telegram Mini App Functions</h2>
      <div className="space-y-4">
        <button onClick={handleSendData} className="btn-primary">Send Data to Bot</button>
        <button onClick={handleCloseApp} className="btn-primary">Close Web App</button>
        <button onClick={handleShowPopup} className="btn-primary">Show Popup</button>
        <button onClick={handleShowConfirm} className="btn-primary">Show Confirm</button>
        <button onClick={handleRequestGeolocation} className="btn-primary">Request Geolocation</button>
        <button onClick={handleToggleBackButton} className="btn-primary">Toggle Back Button</button>
        <button onClick={handleExpandApp} className="btn-primary">Expand App</button>
        {platformInfo && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Platform Info:</h3>
            <p>{platformInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BasicFunctions;