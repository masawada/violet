//
// Violet.REST.Statuses
//

(function(Violet) {
  var Tweet = Violet.Tweet;
  var Statuses = {
    'mentionsTimeline': {
      method: 'GET',
      path: 'statuses/mentions_timeline',
      responseProc: function(response) {
        return [response.map(function(tweet) {
          return new Tweet(tweet);
        })];
      }
    },
    'userTimeline': {
      method: 'GET',
      path: 'statuses/user_timeline',
      responseProc: function(response) {
        return [response.map(function(tweet) {
          return new Tweet(tweet);
        })];
      }
    },
    'homeTimeline': {
      method: 'GET',
      path: 'statuses/home_timeline',
      responseProc: function(response) {
        return [response.map(function(tweet) {
          return new Tweet(tweet);
        })];
      }
    },
    'retweetsOfMe': {
      method: 'GET',
      path: 'statuses/retweets_of_me',
      responseProc: function(response) {
        return [response.map(function(tweet) {
          return new Tweet(tweet);
        })];
      }
    },
    'update': {
      method: 'POST',
      path: 'statuses/update',
      responseProc: function(tweet) {
        return [new Tweet(tweet)];
      }
    },
    'retweet': {
      method: 'POST',
      path: 'statuses/retweet/:id',
      responseProc: function(tweet) {
        return [new Tweet(tweet)];
      }
    }
  };

  Violet.REST.Statuses = Statuses;
})(Violet);
