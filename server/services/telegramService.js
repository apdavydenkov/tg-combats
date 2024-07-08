const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

exports.sendMessage = async (chatId, text, options = {}) => {
  try {
    await bot.sendMessage(chatId, text, options);
  } catch (error) {
    console.error('Error sending Telegram message:', error);
  }
};

exports.answerWebAppQuery = async (webAppQueryId, result) => {
  try {
    await bot.answerWebAppQuery(webAppQueryId, result);
  } catch (error) {
    console.error('Error answering Web App query:', error);
  }
};