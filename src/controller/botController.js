/* Internal modules */
import { handleNewUser } from './userController';
import { getWeeklyPostsLength, getTopThreeRank, hasToSendMessage, SHOW_MESSAGES } from '../helper/util';
import { getInitialData, updateFirebaseUser } from '../service/userFirebase';
import pkg from '../../package.json';

let users;

const startBotListeners = (bot) => {
  console.log('Starting bot event listeners...');

  getInitialData().then(data => {
    users = data;

    bot.on('text', message => {
      handleNewUser(users, bot, message);
      _onText(bot, message);
    });

    bot.on('photo', message => {
      handleNewUser(bot, message);
      _onNewPhoto(bot, message);
    });
  });
};

const handleCommands = (bot, groupId, text, user) => {
  switch (text) {
    case '/comandos':
      bot.sendMessage(groupId, `Comandos disponíveis: /semana, /total, /top3`);
      break;
    case '/semana':
      bot.sendMessage(groupId, `${user.name}, seus pontos da semana são: ${getWeeklyPostsLength(user)}`);
      break;
    case '/total':
      bot.sendMessage(groupId, `${user.name}, seus pontos totais são: ${user.posts.length}`);
      break;
    case '/ferd':
      bot.sendMessage(groupId, `Esse comando é uma menção honrosa ao mano ferd que foi o cobaia oficial enquanto eu nascia.`);
      break;
    case '/top3':
      bot.sendMessage(groupId, `Os top 3 membros do grupo das teleselfies são: ${getTopThreeRank(users)}`);
      break;
    case '/versao':
      bot.sendMessage(groupId, `Versão ${pkg.version}`);
      break;
    default:
      bot.sendMessage(groupId, `Infelizmente eu não to ligado nesse comando que voce digitou :(`);
      break;
  }
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
  const currentUser = users[message.from.id];
  const currentPhoto = {
    id: message.photo.shift().file_id,
    date: new Date()
  };

  currentUser.posts[currentPhoto.id];
  updateFirebaseUser(currentUser);
  if (SHOW_MESSAGES) {
    let customMessage;
    customMessage = `${currentUser.name}, sua imagem foi computada com sucesso :)`;
    bot.sendMessage(groupId, customMessage);
  }
};


const _onText = (bot, { text, from, chat }) => {
  const groupId = chat.id;
  if (text.startsWith('/')) {
    const user = users[userId];
    handleCommands(bot, groupId, text, user);
  } else {
    _handleMessages(bot, groupId, text);
  }
};

export { startBotListeners, handleCommands }
