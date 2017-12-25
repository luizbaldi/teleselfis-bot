/* Internal modules */
import { getUserRef, getUsersRef } from '../helper/firebase';

const getInitialData = () => {
  const promise = new Promise((resolve, reject) => {
    getUsersRef().on('value', snapshot => {
      const users = snapshot.val() ? snapshot.val() : {};
      console.log('Users current state', users);
      resolve(users);
    });
  });

  return promise;
};

const updateFirebaseUser = (user) => {
  getUserRef(user.id).update(user);
};


export { getInitialData, updateFirebaseUser }
