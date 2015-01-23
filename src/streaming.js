//
// Violet.Streaming
//

(function(Violet) {
  var Util = Violet.Util;

  var Streaming = function(oauth) {
    this.oauth = oauth;
    this._events = {};
  };

  Streaming.prototype = {
    apiBaseURI: 'https://stream.twitter.com/1.1/',
    endpoints: {
      filterStream: 'statuses/filter.json',
      sampleStream: 'statuses/sample.json',
      firehose: 'statuses/firehose.json',
      userStream: 'https://userstream.twitter.com/1.1/user.json',
      siteStream: 'https://sitestream.twitter.com/1.1/site.json'
    },
    on: function(key, callback) {
      this._events[key] = callback;
    }
  };
  Violet.Streaming = Streaming;
})(Violet);
