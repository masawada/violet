//
// Violet.Tweet
//

(function(Violet) {
  var Tweet = function(tweetData, accounts, accountId) {
    this.accounts = accounts;
    this._accountId = accountId;
    this._initWithTweet(tweetData);
  };

  Tweet.prototype = {
    _initWithTweet: function(tweet){
      var attributes = [];

      attributes.forEach(function(attribute) {
        this[attribute] = tweet[attribute] || null;
      }.bind(this));
    }
  };

  Violet.Tweet = Tweet;
})(Violet);
