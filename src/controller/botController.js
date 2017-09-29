/* External modules */
const moment = require('moment');

/* Internal modules */
const UserController = require('./userController')();
const Util = require('../helper/util')();

module.exports = () => {

    this.startBotListeners = (bot) => {
        bot.on('text', message => {
            UserController.handleNewUser(bot, message).then(() => {
                _onText(bot, message);
            });
        });
        
        bot.on('photo', message => {
            UserController.handleNewUser(bot, message).then(() => {
                _onNewPhoto(bot, message);
            });
        });
    };

    const _onText = (bot, {text, from, chat}) => {
        const groupId = chat.id;
        const userId = from.id;
        if (text.startsWith('/')) {
            _handleCommands(bot, groupId, text, userId);
        } else {
            _handleMessages(bot, groupId, text);
        }
    };

    const _handleCommands = (bot, groupId, text, userId) => {
        UserController.getUsers().then(users => {
            const currentUser = users.find(user => user.id === userId);
            switch (text) {
                case '/comandos':
                    bot.sendMessage(groupId, `Comandos disponíveis: /semana, /total, /top3`);
                    break;
                case '/semana':
                    bot.sendMessage(groupId, `${currentUser.name}, seus pontos da semana são: ${Util.getWeeklyPostsLength(currentUser)}`);
                    break;
                case '/total':
                    bot.sendMessage(groupId, `${currentUser.name}, seus pontos totais são: ${currentUser.posts.length}`);
                    break;
                case '/ferd':
                    bot.sendMessage(groupId, `Esse comando é uma menção honrosa ao mano ferd que foi o cobaia oficial enquanto eu nascia.`);
                    break;
                case '/top3':
                    bot.sendMessage(groupId, `Os top 3 membros do grupo das teleselfies são: ${Util.getTopThreeRank(users)}`);
                    break;
                default:
                    bot.sendMessage(groupId, `Infelizmente eu não to ligado nesse comando que voce digitou :(`);
                    break;
            }
        });
    };

    const _handleMessages = (bot, groupId, text) => {
        if (Util.hasToSendMessage()) {
            if (text.match('maconha')) {
                bot.sendMessage(groupId, `Maconha? Tô fora, pego meus circuitos e vou embora!`);
            } else if (text.match('cremos')) {
                bot.sendMessage(groupId, `Atingir o mais alto nível de cremosidade é um dos sentidos da vida.`);
            }
        }
    };

    const _onNewPhoto = (bot, message) => {
        const groupId = message.chat.id;
        UserController.getCurrentUser(message.from.id).then(currentUser => {
            const currentPhoto = {
                date: moment(),
                data: message.photo.shift()
            };
    
            let customMessage;
            if (Util.isNewPhoto(currentPhoto.data, currentUser)) {
                currentUser.posts.push(currentPhoto);
                UserController.updateCurrentUser(currentUser);
                customMessage = `${currentUser.name}, sua imagem foi computada com sucesso :)`;
            } else {
                customMessage = `Opa, parece que essa imagem é repetida...`;
            }
            bot.sendMessage(groupId, customMessage);
        });
    };

    return this;
};