/* Internal modules */
import { getUserRef, getUsersRef } from '../helper/firebase';

const getInitialData = () => {
  const promise = new Promise((resolve, reject) => {
    getUsersRef().on('value', snapshot => {
      let users = snapshot.val() ? snapshot.val() : {};
      users = handleDefaultPosts(users);
      console.log('On users change: ', users);
      resolve(users);
    });
  });

  return promise;
};

const updateFirebaseUser = (user) => {
  getUserRef(user.id).update(user);
};

const handleDefaultPosts = (users) => {
  for (let [userId, user] of Object.entries(users)) {
    if (!users[userId].posts) {
      users[userId].posts = {};
    }
  }
  return users;
};

export { getInitialData, updateFirebaseUser }
