/* External modules */
const moment = require('moment');

module.exports = () => {
    
    this.getWeeklyPostsLength = (currentUser) => {
        const currentWeekDay = moment().day();
        const weeklyPosts = currentUser.posts.filter(post => post.day() <= currentWeekDay);
        return weeklyPosts.length;
    };

    return this;
}