/* config */
const factoryBot = require('./config/botConfig')

/* controllers */
const { startBotListeners } = require('./controller/botController')

/* bot and server instances */
const bot = factoryBot()

/* start bot event listeners */
startBotListeners(bot)
