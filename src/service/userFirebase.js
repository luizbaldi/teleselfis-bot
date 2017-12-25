/* Internal modules */
import { getUserRef, getUsersRef } from '../helper/firebase';

const getInitialData = () => {
  const promise = new Promise((resolve, reject) => {
    console.log('preparing promise');
    getUsersRef().on('value', snapshot => {
      const users = snapshot.val() ? snapshot.val() : {};
      console.log('loading users state', users);
      resolve(users);
    });
  });

  return promise;
};

const updateFirebaseUser = (user) => {
  getUserRef(user.id).set(user);
};

const insertNewUser = (user) => {
  console.log('inserting new user...');
  getUserRef(user.id).update(user);
};

export { getInitialData, insertNewUser }
