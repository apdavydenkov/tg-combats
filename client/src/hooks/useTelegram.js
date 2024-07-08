import { useContext } from 'react';
import { TelegramContext } from '../contexts/TelegramContext';

export const useTelegram = () => {
  return useContext(TelegramContext);
};