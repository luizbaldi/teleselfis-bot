const {
  getWeeklyPostsLength,
  getTopThreeRank,
  hasToSendMessage
} = require('../../src/helper/util')

describe('Util', () => {
  let user

  beforeEach(() => {
    user = {
      id: 159677886,
      name: 'Baldi',
      posts: {
        'AgADAQAD1KcxG1hlGUY-IMvgQt7rxeZeDDAABIxes0EvYdx3FjsAAgI': {
          date: '2017-12-27T01:22:51.122Z'
        },
        'AgADAQADi6gxGxcCEUaU__drWHLenEhrDDAABBJV749VaV6J-TkAAgI': {
          date: '2017-12-25T22:01:30.310Z'
        },
        'AgADAQADiagxGxcCEUbts7qBxjFk3Dgj9y8ABM-vxvnXFQGiJIwBAAEC': {
          date: '2017-12-25T22:02:43.654Z'
        }
      },
      username: 'LuizBaldi'
    }
    Object.values(user.posts).forEach(post => (post.date = new Date()))
  })

  describe('getWeeklyPostsLength method', () => {
    it('should return an integer', () => {
      const posts = getWeeklyPostsLength(user)

      expect(typeof posts).toBe('number')
    })

    it('should get the amount of posts from the same week', () => {
      const posts = getWeeklyPostsLength(user)

      expect(posts).toBe(3)
    })

    it('should get correct amount from last week posts', () => {
      const date = new Date()

      date.setDate(date.getDate() - 7)
      user.posts[Object.keys(user.posts)[0]].date = date

      const posts = getWeeklyPostsLength(user)

      expect(posts).toBe(2)
    })
  })

  describe('hasToSendMessage method', () => {
    it('should return a boolean', () => {
      const shouldSendMessage = hasToSendMessage()

      expect(typeof shouldSendMessage).toBe('boolean')
    })
  })
})
