/* External modules */
import axios from 'axios';

/* Internal modules */
import firebase from '../helper/firebase';

/* MyJson URL */
const baseUrl = 'https://api.myjson.com/bins/6jjr5';

/* MyJson URL (test) */
// const baseUrl = 'https://api.myjson.com/bins/k9nn1';

const getUsers = () => {
  return axios.get(baseUrl)
    .then(({ data }) => data)
    .catch(err => err);
};

const updateUsers = (users) => {
  axios.put(baseUrl, users);
};

const getCurrentUser = (userId) => {
  return axios.get(baseUrl)
    .then(({ data }) => data.find(user => user.id === userId))
    .catch(err => err);
};


export { getUsers, updateUsers, getCurrentUser }
