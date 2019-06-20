/* Config */
const factoryBot = require('./config/botConfig')

/* Controllers */
const { startBotListeners } = require('./controller/botController')

/* Bot and server instances */
const bot = factoryBot()

/* Start bot event listeners */
startBotListeners(bot)
