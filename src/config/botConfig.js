/* External modules */
const TelegramBot = require('node-telegram-bot-api');

/* Telegram Bot Token */
const token = '338766426:AAFpjZIzU85KQhsujlDjXCC3DovPQIiVocE';

module.exports = () => {

    this.factoryBot = () => {
        const botParams = {
            polling: true
        };
        return new TelegramBot(token, botParams);
    };

    return this;
};