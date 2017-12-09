/* Internal modules */
import { updateUsers, getUsers } from '../service/userService';

const handleNewUser = (bot, message) => {
  const groupId = message.chat.id;
  const currentUserId = message.from.id;

  const promise = new Promise((resolve, reject) => {
    return getUsers().then(users => {
      if (_isNewUser(users, currentUserId)) {
        const newUser = {
          id: message.from.id,
          name: message.from.first_name,
          username: message.from.username,
          posts: []
        };
        users.push(newUser);
        bot.sendMessage(groupId, `Seja bem vindo(a) ao grupo, ${newUser.name} :)`);
        resolve(updateUsers(users));
      } else {
        resolve();
      }
    });
  });

  return promise;
};

const updateCurrentUser = (user) => {
  getUsers().then(users => {
    const currentUserIndex = users.findIndex(currentUser => currentUser.id === user.id);
    users[currentUserIndex] = user;
    updateUsers(users);
  });
};

const _isNewUser = (users, userId) => {
  return !users.some(user => userId === user.id);
};

export { handleNewUser, updateCurrentUser }
