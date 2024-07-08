import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { TelegramProvider } from './contexts/TelegramContext';

ReactDOM.render(
  <React.StrictMode>
    <TelegramProvider>
      <App />
    </TelegramProvider>
  </React.StrictMode>,
  document.getElementById('root')
);