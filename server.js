/* Config */
const botConfig = require('./src/config/botConfig')();
const http = require('http');
const port = process.env.PORT || 5000;

/* Controllers */
const BotController = require('./src/controller/botController')();

/* Bot Instance */
const bot = botConfig.factoryBot();

/* Start bot event listeners */
BotController.startBotListeners(bot);
http.createServer((request, response) => {
    console.log(`Starting server at port: ${port}`);
}).listen(port);