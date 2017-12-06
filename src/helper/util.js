/* External modules */
const moment = require('moment');

module.exports = () => {
    
    this.getWeeklyPostsLength = (currentUser) => {
        const currentWeekDay = moment().day();
        const weeklyPosts = currentUser.posts.filter(post => moment(post.date).day() <= currentWeekDay);
        return weeklyPosts.length;
    };

    this.isNewPhoto = (photo, user) => {
        return true;
        // const currentPhotoPath = photo.file_path;
        // const isExistent = user.posts.some(currentPhoto => {
        //     return currentPhotoPath === currentPhoto.data.file_path;
        // });
        // return !isExistent;
    };

    this.getTopThreeRank = (users) => { 
        /* @toDo: Refactor this function to return a reduced string */
        let membersString = '';
        const orderedUsers = users
            .sort((a, b) => b.posts.length - a.posts.length)
            .slice(0, 3);

        orderedUsers.forEach((user, index) => {
            membersString += `\n${user.name}: ${user.posts.length}`;
        });
        
        return membersString;
    };

    this.hasToSendMessage = () => {
        return _getRandomInt(0, 5) >= 2;
    };

    const _getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }; 

    return this;
}