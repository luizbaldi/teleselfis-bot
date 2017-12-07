/* External modules */
import TelegramBot from 'node-telegram-bot-api';

/* Telegram Bot Token */
// const token = '338766426:AAFpjZIzU85KQhsujlDjXCC3DovPQIiVocE';

/* Test bot token */
const token = '473533364:AAGwn6f0jwqb58s9XBQuwcgLL6_a-FjcHeU';

const factoryBot = () => {
    const botParams = {
        polling: true
    };
    return new TelegramBot(token, botParams);
};

export { factoryBot }