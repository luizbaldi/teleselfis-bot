/* Internal modules */
const UserService = require('../service/userService')();

module.exports = () => {

    this.handleNewUser = (bot, message) => {
        const groupId = message.chat.id;
        const currentUserId = message.from.id;

        const promise = new Promise((resolve, reject) => {
            return UserService.getUsers().then(users => {
                if (_isNewUser(users, currentUserId)) {
                    const newUser = {
                        id: message.from.id,
                        name: message.from.first_name,
                        username: message.from.username,
                        posts: []
                    };
                    users.push(newUser);
                    bot.sendMessage(groupId, `Seja bem vindo(a) ao grupo, ${newUser.name} :)`);
                    resolve(UserService.updateUsers(users));
                } else {
                    resolve();
                }
            });
        });

        return promise;
    };

    this.getCurrentUser = (userId) => {
        return UserService.getCurrentUser(userId);
    };

    this.updateCurrentUser = (user) => {
        UserService.getUsers().then(users => {
            const currentUserIndex = users.findIndex(currentUser => currentUser.id === user.id);
            users[currentUserIndex] = user;
            UserService.updateUsers(users);
        });
    };

    this.getUsers = () => {
        return UserService.getUsers();
    };

    const _isNewUser = (users, userId) => {
        return !users.some(user => userId === user.id);
    };

    return this;
};