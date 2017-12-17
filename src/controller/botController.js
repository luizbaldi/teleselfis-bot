/* Internal modules */
import { handleNewUser, updateCurrentUser } from './userController';
import { getCurrentUser, getUsers } from '../service/userService';
import { getWeeklyPostsLength, getTopThreeRank, hasToSendMessage } from '../helper/util';

const startBotListeners = (bot) => {
  console.log('Starting bot event listeners...');
  bot.on('text', message => {
    handleNewUser(bot, message).then(() => {
      _onText(bot, message);
    });
  });

  bot.on('photo', message => {
    handleNewUser(bot, message).then(() => {
      _onNewPhoto(bot, message);
    });
  });
};

const _handleCommands = (bot, groupId, text, userId) => {
  getUsers().then(users => {
    const currentUser = users.find(user => user.id === userId);
    switch (text) {
      case '/comandos':
        bot.sendMessage(groupId, `Comandos disponíveis: /semana, /total, /top3`);
        break;
      case '/semana':
        bot.sendMessage(groupId, `${currentUser.name}, seus pontos da semana são: ${getWeeklyPostsLength(currentUser)}`);
        break;
      case '/total':
        bot.sendMessage(groupId, `${currentUser.name}, seus pontos totais são: ${currentUser.posts.length}`);
        break;
      case '/ferd':
        bot.sendMessage(groupId, `Esse comando é uma menção honrosa ao mano ferd que foi o cobaia oficial enquanto eu nascia.`);
        break;
      case '/top3':
        bot.sendMessage(groupId, `Os top 3 membros do grupo das teleselfies são: ${getTopThreeRank(users)}`);
        break;
      case '/versao':
        bot.sendMessage(groupId, `Versão 1.0, ou seja ainda to na fralda mermão... Quando eu crescer quero ser um megazord :)`);
        break;
      default:
        bot.sendMessage(groupId, `Infelizmente eu não to ligado nesse comando que voce digitou :(`);
        break;
    }
  });
};

const _handleMessages = (bot, groupId, text) => {
  if (hasToSendMessage()) {
    if (text.match('maconha')) {
      bot.sendMessage(groupId, `Maconha? Tô fora, pego meus circuitos e vou embora!`);
    } else if (text.match('cremos')) {
      bot.sendMessage(groupId, `Atingir o mais alto nível de cremosidade é um dos sentidos da vida.`);
    } else if (text.match('tabaco')) {
      bot.sendMessage(groupId, `Tabaco? Tabaco tô dentro, pego meu borão virtual e acendo`);
    }
  }
};

const _onNewPhoto = (bot, message) => {
  const groupId = message.chat.id;
  getCurrentUser(message.from.id).then(currentUser => {
    const currentPhoto = {
      date: new Date(),
      data: message.photo.shift()
    };

    let customMessage;
    currentUser.posts.push(currentPhoto);
    updateCurrentUser(currentUser);
    customMessage = `${currentUser.name}, sua imagem foi computada com sucesso :)`;
    bot.sendMessage(groupId, customMessage);
  });
};


const _onText = (bot, { text, from, chat }) => {
  const groupId = chat.id;
  const userId = from.id;
  if (text.startsWith('/')) {
    _handleCommands(bot, groupId, text, userId);
  } else {
    _handleMessages(bot, groupId, text);
  }
};

export { startBotListeners }
