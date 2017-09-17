/* Config */
const botConfig = require('./src/config/botConfig')();

/* Controllers */
const BotController = require('./src/controller/botController')();

const bot = botConfig.factoryBot();
let users = [];

/* Start bot event listeners */
BotController.startBotListeners(bot, users);