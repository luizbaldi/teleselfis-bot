/* External modules */
const moment = require('moment');

module.exports = () => {
    
    this.getWeeklyPostsLength = (currentUser) => {
        const currentWeekDay = moment().day();
        const weeklyPosts = currentUser.posts.filter(post => moment(post.date).day() <= currentWeekDay);
        return weeklyPosts.length;
    };

    this.isNewPhoto = (photo, user) => {
        const currentPhotoPath = photo.file_path;
        const isExistent = user.posts.some(currentPhoto => {
            return currentPhotoPath === currentPhoto.data.file_path;
        });
        return !isExistent;
    };

    this.getTopThreeRank = (users) => { 
        /* @toDo: Refactor this function to return a reduced string */
        let membersString = '';
        const orderedUsers = users
            .sort((a, b) => a.posts.length - b.posts.length)
            .slice(0, 3);

        orderedUsers.forEach((user, index) => {
            membersString += `\n${user.name}: ${user.posts.length} teleselfies`;
        });
        
        return membersString;
    };

    return this;
}