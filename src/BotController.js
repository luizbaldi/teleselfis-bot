/* External modules */
const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment');

/* Internal modules */
const UserController = require('./UserController')();
const Util = require('./Util')();

/* Telegram Bot Token */
const token = '338766426:AAFpjZIzU85KQhsujlDjXCC3DovPQIiVocE';

module.exports = () => {

    this.createBot = () => {
        return new TelegramBot(token, {polling: true});
    };

    this.handleCommands = (bot, users, {text, from, chat}) => {
        if (text.startsWith('/')) {
            const groupId = chat.id;
            const currentUser = UserController.getCurrentUser(users, from.id);
            switch (text) {
                case '/comandos':
                    bot.sendMessage(groupId, `Comandos disponíveis: /semana, /total`);
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
                default:
                    bot.sendMessage(groupId, `Mano, frago esse comando não :(`);
                    break;
            }
        }
    };

    this.onNewPhoto = (bot, users, groupId, messageFrom) => {
        let currentUser = UserController.getCurrentUser(users, messageFrom.id);
        const currentDate = moment();
        currentUser.posts.push(currentDate);
        bot.sendMessage(groupId, `${currentUser.name}, sua imagem foi computada com sucesso :)`);
    };

    return this;
};