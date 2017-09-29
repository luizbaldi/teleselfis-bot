/* Config */
const botConfig = require('./src/config/botConfig')();
const serverConfig = require('./src/config/serverConfig')();

/* Controllers */
const BotController = require('./src/controller/botController')();

/* Bot and server instances */
const bot = botConfig.factoryBot();
const server = serverConfig.factoryServer();

/* Start bot event listeners */
server.listen(process.env.PORT || 5000);
BotController.startBotListeners(bot);