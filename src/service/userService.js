/* Internal modules */
import { getUserRef, getUsersRef } from '../helper/firebase';
import { users, setUsers } from '../helper/userStore';

const getInitialData = () => {
  const promise = new Promise((resolve, reject) => {
    getUsersRef().on('value', snapshot => {
      let usersSnapshot = snapshot.val() ? snapshot.val() : {};
      usersSnapshot = handleDefaultPosts(usersSnapshot);
      console.log('On users change: ', usersSnapshot);

      /* Updates user store */
      setUsers(usersSnapshot);

      resolve(usersSnapshot);
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
