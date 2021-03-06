const { getUserRef, getUsersRef } = require('../helper/firebase')
const { users, setUsers } = require('../helper/userStore')

const getInitialData = () => {
  const promise = new Promise((resolve, reject) => {
    getUsersRef().on('value', snapshot => {
      let usersSnapshot = snapshot.val() ? snapshot.val() : {}
      usersSnapshot = handleDefaultPosts(usersSnapshot)
      console.log('On users change: ', usersSnapshot)

      /* updates user store */
      setUsers(usersSnapshot)

      resolve(usersSnapshot)
    })
  })

  return promise
}

const updateFirebaseUser = user => {
  getUserRef(user.id).update(user)
}

const handleDefaultPosts = users => {
  for (let [userId, user] of Object.entries(users)) {
    if (!users[userId].posts) {
      users[userId].posts = {}
    }
  }
  return users
}

module.exports = { getInitialData, updateFirebaseUser }
