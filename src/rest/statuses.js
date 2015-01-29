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
    'homeTimeline': {
      method: 'GET',
      path: 'statuses/home_timeline',
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
    }
  };

  Violet.REST.Statuses = Statuses;
})(Violet);
