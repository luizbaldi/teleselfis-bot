const TelegramBot = require('node-telegram-bot-api');

const token = '338766426:AAFpjZIzU85KQhsujlDjXCC3DovPQIiVocE';
let bot = new TelegramBot(token, {polling: true});

let users = [];
bot.on('text', message => {
    const groupId = message.chat.id;
    _handleNewUser(groupId, message);
    _handleCommands(message);
});

bot.on('photo', message => {
    const groupId = message.chat.id;
    _handleNewUser(groupId, message);
    _onNewPhoto(groupId, message.from);
});

const _isNewUser = (userId) => {
    return !users.some(user => userId === user.id);
};

const _handleNewUser = (groupId, message) => {
    if (_isNewUser(message.from.id)) {
        const newUser = {
            id: message.from.id,
            name: message.from.first_name,
            username: message.from.username,
            counters: {
                weekImages: 0,
                totalImages: 0
            } 
        };
        users.push(newUser);
        bot.sendMessage(groupId, `Seja bem vindo(a) ao grupo, ${newUser.name} :)`);
    }
};

const _onNewPhoto = (groupId, messageFrom) => {
    let currentUser = _getCurrentUser(messageFrom.id);
    currentUser.counters.weekImages++;
    currentUser.counters.totalImages++;
    bot.sendMessage(groupId, `${currentUser.name}, sua imagem foi computada com sucesso :)`);
};

const _getCurrentUser = (userId) => {
    return users.find(user => user.id === userId);
};

const _handleCommands = ({text, from, chat}) => {
    if (text.startsWith('/')) {
        const groupId = chat.id;
        const currentUser = _getCurrentUser(from.id);
        switch (text) {
            case '/comandos':
                bot.sendMessage(groupId, `Comandos disponíveis: /semana, /total`);
                break;
            case '/semana':
                bot.sendMessage(groupId, `${currentUser.name}, seus pontos da semana são: ${currentUser.counters.weekImages}`);
                break;
            case '/total':
                bot.sendMessage(groupId, `${currentUser.name}, seus pontos totais são: ${currentUser.counters.totalImages}`);
                break;
            case '/ferd':
                bot.sendMessage(groupId, `Esse comando é uma menção honrosa ao mano ferd que foi o cobaia oficial enquanto eu nascia.`);
                break;
            default:
                bot.sendMessage(groupId, `Mano, frago esse comando não :(`);
                break;
        }
    }
};