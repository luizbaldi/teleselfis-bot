module.exports = () => {

    this.handleNewUser = (bot, users, groupId, message) => {
        if (_isNewUser(users, message.from.id)) {
            const newUser = {
                id: message.from.id,
                name: message.from.first_name,
                username: message.from.username,
                posts: []
            };
            users.push(newUser);
            bot.sendMessage(groupId, `Seja bem vindo(a) ao grupo, ${newUser.name} :)`);
        }
    };

    this.getCurrentUser = (users, userId) => {
        return users.find(user => user.id === userId);
    };

    const _isNewUser = (users, userId) => {
        return !users.some(user => userId === user.id);
    };

    return this;
};