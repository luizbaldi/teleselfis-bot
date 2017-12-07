/* External modules */
const TelegramBot = require('node-telegram-bot-api');

/* Telegram Bot Token */
// const token = '338766426:AAFpjZIzU85KQhsujlDjXCC3DovPQIiVocE';

/* Test bot token */
const token = '473533364:AAGwn6f0jwqb58s9XBQuwcgLL6_a-FjcHeU';

module.exports = () => {

    this.factoryBot = () => {
        const botParams = {
            polling: true
        };
        return new TelegramBot(token, botParams);
    };

    return this;
};