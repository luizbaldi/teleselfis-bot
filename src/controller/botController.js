/* External modules */
const moment = require('moment');

/* Internal modules */
const UserController = require('./userController')();
const Util = require('../helper/util')();

module.exports = () => {

    this.startBotListeners = (bot) => {
        bot.on('text', message => {
            UserController.handleNewUser(bot, message);
            this.handleCommands(bot, message);
        });
        
        bot.on('photo', message => {
            UserController.handleNewUser(bot, message);
            this.onNewPhoto(bot, message);
        });
    };

    this.handleCommands = (bot, {text, from, chat}) => {
        if (text.startsWith('/')) {
            const groupId = chat.id;
            UserController.getUsers().then(users => {
                const currentUser = users.find(user => user.id === from.id);
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
                        bot.sendMessage(groupId, `Mano, frago esse comando não :(`);
                        break;
                }
            });
        }
    };

    this.onNewPhoto = (bot, message) => {
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