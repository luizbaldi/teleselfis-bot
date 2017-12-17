import { expect } from 'chai';
import { getWeeklyPostsLength, getTopThreeRank, hasToSendMessage } from '../../src/helper/util';

describe('Util', () => {
  let user;
  beforeEach(() => {
    user = {
      "id": 159677886,
      "name": "Baldi",
      "username": "LuizBaldi",
      "posts": [
        {
          "date": "2017-12-16T23:28:05.995Z",
          "data": {
            "file_id": "AgADAQAD6KcxGzDDcEaxGigGYncC_3Uy9y8ABHhtEUpMXqu26C4AAgI",
            "file_size": 1471,
            "width": 51,
            "height": 90
          }
        },
        {
          "date": "2017-12-18T01:00:13.638Z",
          "data": {
            "file_id": "AgADAQAD96cxGzDDcEal-E4jm1Xhm3IlAzAABMjpQjMTCRD-Vh8AAgI",
            "file_size": 1221,
            "width": 51,
            "height": 90
          }
        },
        {
          "date": "2017-12-19T02:23:14.644Z",
          "data": {
            "file_id": "AgADAQADAagxGzDDcEYTHCypmZtbj_sU9y8ABGZPhl5Ag6od4OQAAgI",
            "file_size": 1162,
            "width": 51,
            "height": 90
          }
        }
      ]
    };
    user.posts.forEach(post => post.date = new Date());
  });

  context('getWeeklyPostsLength method', () => {
    it('should return an integer', () => {
      expect(getWeeklyPostsLength(user)).to.be.an('number');
    });


    it('should get the amount of posts from the same week', () => {
      /* Set posts with current week */
      expect(getWeeklyPostsLength(user)).to.be.equal(3);
    });

    it('should get correct amount from last week posts', () => {
      /* Set first post to be one week less */
      const date = new Date();
      date.setDate(date.getDate() - 7);
      user.posts[0].date = date;

      expect(getWeeklyPostsLength(user)).to.be.equal(2);
    });
  });

  context('hasToSendMessage method', () => {
    it('should return a boolean', () => {
      expect(hasToSendMessage()).to.be.a('boolean');
    });
  });
});
