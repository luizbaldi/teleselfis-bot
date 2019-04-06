const firebase = require('firebase')
const { potatoe } = require('./firebaseConfig.js')

const config = {
  apiKey: potatoe,
  authDomain: "telegram-bot-manager.firebaseapp.com",
  databaseURL: "https://telegram-bot-manager.firebaseio.com",
  projectId: "telegram-bot-manager",
  storageBucket: "telegram-bot-manager.appspot.com",
  messagingSenderId: "14311802500"
};
const app = firebase.initializeApp(config);

const getUsersRef = () => app.database().ref().child('users');
const getUserRef = (userId) => app.database().ref(`users/${userId}`);

module.exports = { getUsersRef, getUserRef }
