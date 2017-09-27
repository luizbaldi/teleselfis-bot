/* Config */
const botConfig = require('./src/config/botConfig')();

/* Controllers */
const BotController = require('./src/controller/botController')();

/* Bot Instance */
const bot = botConfig.factoryBot();

/* Start bot event listeners */
BotController.startBotListeners(bot);