/* Internal modules */
import { insertNewUser } from '../service/userFirebase';
import { SHOW_MESSAGES } from '../helper/util';

const handleNewUser = (users, bot, message) => {
  const userId = message.from.id;

  if (!users[userId]) {
    const newUser = {
      id: userId,
      name: message.from.first_name,
      username: message.from.username,
      posts: {}
    };
    users[userId] = newUser;
    if (SHOW_MESSAGES) {
      const groupId = message.chat.id;
      bot.sendMessage(groupId, `Seja bem vindo(a) ao grupo, ${newUser.name} :)`);
    }
    insertNewUser(newUser);
  }
};

export { handleNewUser }
