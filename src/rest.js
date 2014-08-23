//
// Violet.Rest
//

(function(Violet) {
  var util = Violet.Util;

  var Rest = function(oauth) {
    this.oauth = oauth;
  };

  Rest.prototype = {
    apiBaseURI: 'https://api.twitter.com/1.1/',
    endpoints: {
      mentionsTimeline: 'statuses/mentions_timeline',
      userTimeline: 'statuses/user_timeline',
      homeTimeline: 'statuses/home_timeline',
      retweetsOfMe: 'statuses/retweets_of_me',
      retweets: 'statuses/retweets/:id',
      showStatus: 'statuses/show/:id',
      destroyStatus: 'statuses/destroy/:id',
      updateStatus: 'statuses/update.json',
      retweetStatus: 'statuses/retweet/:id.json',
      updateStatusWithMedia: 'statuses/update_with_media',
      oEmbed: 'statuses/oembed',
      retweeterIds: 'statuses/retweeters/ids',
    },
    getRequestURI: function(endpoint, params) {
      var path = util.resolveEndpoint(endpoint, params);
      return this.apiBaseURI + path;
    },
    getOAuthedRequest: function(method, uri, data) {
      var xhr = new Violet.XHR({
        method: method,
        uri: uri,
        data: data
      });
      xhr.setOAuthHeader(this.oauth.obtainOAuthParams());
      return xhr;
    },
    getMentionsTimeline: function(params) {
      var uri = this.getRequestURI(this.endpoints.mentionsTimeline);
      var xhr = this.getOAuthedRequest('GET', uri, params);
      xhr.start();
      return xhr;
    },
    getUserTimeline: function(params) {
      var uri = this.getRequestURI(this.endpoints.userTimeline);
      var xhr = this.getOAuthedRequest('GET', uri, params);
      xhr.start();
      return xhr;
    },
    getRetweets: function(statusId, params) {
      var uri = this.getRequestURI(this.endpoints.retweets, {
        id: statusId
      });
      var xhr = this.getOAuthedRequest('GET', uri, params);
      xhr.start();
      return xhr;
    }
  };

  Violet.Rest = Rest;
})(Violet);
