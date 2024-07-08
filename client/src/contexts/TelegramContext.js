import React, { createContext, useState, useEffect } from 'react';

export const TelegramContext = createContext();

export const TelegramProvider = ({ children }) => {
  const [tg, setTg] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const telegram = window.Telegram.WebApp;
    setTg(telegram);

    if (telegram.initDataUnsafe.user) {
      setUser(telegram.initDataUnsafe.user);
    }

    telegram.ready();
  }, []);

  return (
    <TelegramContext.Provider value={{ tg, user }}>
      {children}
    </TelegramContext.Provider>
  );
};