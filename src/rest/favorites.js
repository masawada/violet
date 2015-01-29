//
// Violet.REST.Favorites
//

(function(Violet) {
  var Tweet = Violet.Tweet;
  var Favorites = {
    'list': {
      method: 'GET',
      path: 'favorites/list',
      responseProc: function(response) {
        return [response.map(function(tweet) {
          return new Tweet(tweet);
        })];
      }
    },
    'destroy': {
      method: 'POST',
      path: 'favorites/destroy',
      responseProc: function(tweet) {
        return [new Tweet(tweet)];
      }
    },
    'create': {
      method: 'POST',
      path: 'favorites/create',
      responseProc: function(tweet) {
        return [new Tweet(tweet)];
      }
    }
  };
  Violet.REST.Favorites = Favorites;
})(Violet);
