const BotController = require('./src/BotController')();
const UserController = require('./src/UserController')();

const bot = BotController.createBot();
let users = [];

bot.on('text', message => {
    const groupId = message.chat.id;
    UserController.handleNewUser(bot, users, groupId, message);
    BotController.handleCommands(bot, users, message);
});

bot.on('photo', message => {
    const groupId = message.chat.id;
    UserController.handleNewUser(bot, users, groupId, message);
    BotController.onNewPhoto(bot, users, groupId, message.from);
});