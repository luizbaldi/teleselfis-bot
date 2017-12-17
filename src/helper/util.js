const getWeeklyPostsLength = (currentUser) => {
  const currentDate = new Date();
  const currentWeek = new Date(new Date().setDate(currentDate.getDate() - currentDate.getDay()));
  const weeklyPosts = currentUser.posts
    .filter(post => new Date(post.date) >= currentWeek)
    .filter(post => new Date(post.date).getDay() <= currentDate.getDay());
  return weeklyPosts.length;
};

const getTopThreeRank = (users) => {
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

const hasToSendMessage = () => {
  return _getRandomInt(0, 5) >= 2;
};

const _getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { getWeeklyPostsLength, getTopThreeRank, hasToSendMessage }
