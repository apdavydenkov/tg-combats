const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

exports.setupBot = () => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const webAppUrl = process.env.WEB_APP_URL;

    bot.sendMessage(chatId, 'Welcome! Click the button below to open the web app:', {
      reply_markup: {
        inline_keyboard: [[{ text: 'Open Web App', web_app: { url: webAppUrl } }]]
      }
    });
  });
};