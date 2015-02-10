//
// Violet.Tweet
//

(function(Violet) {
  var Tweet = function(tweetData, accounts, accountId) {
    this._accounts = accounts;
    this._accountId = accountId;
    this._initWithTweet(tweetData);
  };

  Tweet.prototype = {
    _initWithTweet: function(tweet){
      var tweetData;
      var attributes = ["text", "truncated", "in_reply_to_status_id", "in_reply_to_status_id_str", "in_reply_to_user_id", "in_reply_to_user_id_str", "in_reply_to_screen_name", "geo", "coordinates", "place", "contributors", "retweet_count", "favorite_count", "entities", "favorited", "retweeted", "lang"];

      if (tweet.retweeted_status) {
        this.retweeted_status = true;
        this.retweeted_id = tweet.id_str;
        this.retweeted_user = new Violet.User(tweet.user, this._accounts, this._accountId);
        this.retweeted_at = new Date(tweet.created_at);
        tweetData = tweet.retweeted_status;
      } else {
        this.retweeted_status = false;
        tweetData = tweet;
      }

      // register attributes
      attributes.forEach(function(attribute) {
        this[attribute] = tweetData[attribute] || null;
      }.bind(this));

      this.id = tweetData.id_str;
      this.user = new Violet.User(tweetData.user, this._accounts, this._accountId);
      this.created_at = new Date(tweetData.created_at);
      this.source = {
        name: tweetData.source.match(/<a.*>(.*)<\/a>/)[1],
        url: tweetData.source.match(/<a\shref=\"(.*?)\"\srel=\"nofollow\">.*<\/a>/)[1]
      };
    }
  };

  Violet.Tweet = Tweet;
})(Violet);
