/* External modules */
const TelegramBot = require('node-telegram-bot-api')
const { token:potatoe } = require('./botTokens.js')

const factoryBot = () => new TelegramBot(potatoe, {
  polling: true
})

module.exports = factoryBot
