/* External modules */
const moment = require('moment');

module.exports = () => {
    
    this.getWeeklyPostsLength = (currentUser) => {
        const currentWeekDay = moment().day();
        const weeklyPosts = currentUser.posts.filter(post => post.date.day() <= currentWeekDay);
        return weeklyPosts.length;
    };

    this.isNewPhoto = (photo, users) => {
        const currentPhotoPath = photo[0].file_path;
        const isExistent = users.some(user => {
            return user.posts.some(currentPhoto => {
                return currentPhotoPath === currentPhoto.data[0].file_path;
            });
        });
        return !isExistent;
    };

    return this;
}