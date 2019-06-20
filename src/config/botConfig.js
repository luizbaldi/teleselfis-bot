const TelegramBot = require('node-telegram-bot-api')
const token = require('./botTokens.js')

const factoryBot = () =>
  new TelegramBot(token, {
    polling: true
  })

module.exports = factoryBot
