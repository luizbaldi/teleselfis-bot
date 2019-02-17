/* External modules */
const TelegramBot = require('node-telegram-bot-api')

/* @TODO: Move this token into a separe file (on .gitignore pls) */

/* Telegram Bot Token */
// const token = '338766426:AAFpjZIzU85KQhsujlDjXCC3DovPQIiVocE';

/* Test bot token */
const token = '473533364:AAGwn6f0jwqb58s9XBQuwcgLL6_a-FjcHeU'

const factoryBot = () => new TelegramBot(token, {
  polling: true
})

module.exports = factoryBot
