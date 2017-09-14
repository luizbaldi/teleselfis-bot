const BotController = require('./src/BotController')();
const UserController = require('./src/UserController')();

const bot = BotController.createBot();
let users = [];

bot.on('text', message => {
    UserController.handleNewUser(bot, users, message);
    BotController.handleCommands(bot, users, message);
});

bot.on('photo', message => {
    UserController.handleNewUser(bot, users, message);
    BotController.onNewPhoto(bot, users,message);
});