//
// Violet.Rest
//

(function(Violet) {
  var Util = Violet.Util;
  var Tweet = Violet.Tweet;
  var tweetStream = function(tweets) {
    return tweets.map(function(tweet) {
      return new Tweet(tweet);
    });
  };

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
    _getRequestURI: function(endpoint, params) {
      var path = Util.resolveEndpoint(endpoint, params);
      return this.apiBaseURI + path;
    },
    _getOAuthedRequest: function(method, uri, data) {
      var xhr = new Violet.XHR({
        method: method,
        uri: uri,
        data: data
      });
      xhr.setOAuthHeader(this.oauth.obtainOAuthParams(xhr));
      return xhr;
    },
    _promiseXHR: function(xhr, callback) {
      xhr.start();
      var promise = new Promise();
      xhr.addEventListener('load', function() {
        promise.resolve(callback(JSON.parse(this.reseponseText)));
      });
      return promise;
    },
    getMentionsTimeline: function(params) {
      var uri = this._getRequestURI(this.endpoints.mentionsTimeline);
      var xhr = this._getOAuthedRequest('GET', uri, params);
      return this._promiseXHR(xhr, function(result) {
        return tweetStream(result);
      });
    },
    getUserTimeline: function(params) {
      var uri = this._getRequestURI(this.endpoints.userTimeline);
      var xhr = this._getOAuthedRequest('GET', uri, params);
      return this._promiseXHR(xhr, function(result) {
        return tweetStream(result);
      });
    },
    getHomeTimeline: function(params) {
      var uri = this._getRequestURI(this.endpoints.homeTimeline);
      var xhr = this._getOAuthedRequest('GET', uri, params);
      return this._promiseXHR(xhr, function(result) {
        return tweetStream(result);
      });
    },
    getRetweetsOfMe: function(params) {
      var uri = this._getRequestURI(this.endpoints.retweetsOfMe);
      var xhr = this._getOAuthedRequest('GET', uri, params);
      return this._promiseXHR(xhr, function(result) {
        return tweetStream(result);
      });
    },
    getRetweets: function(statusId, params) {
      var uri = this._getRequestURI(this.endpoints.retweets, {
        id: statusId
      });
      var xhr = this._getOAuthedRequest('GET', uri, params);
      return this._promiseXHR(xhr, function(result) {
        return tweetStream(result);
      });
    },
    showStatus: function(statusId, params) {
      var uri = this._getRequestURI(this.endpoints.showStatus, {
        id: statusId
      });
      var xhr = this._getOAuthedRequest('GET', uri, params);
      return this._promiseXHR(xhr, function(result) {
        return new Tweet(result);
      });
    },
    destroyStatus: function(statusId, params) {
      var uri = this._getRequestURI(this.endpoints.destroyStatus, {
        id: statusId
      });
      var xhr = this._getOAuthedRequest('POST', uri, params);
      return this._promiseXHR(xhr, function(result) {
        return new Tweet(result);
      });
    },
    updateStatus: function(params) {
      var uri = this._getRequestURI(this.endpoints.updateStatus);
      var xhr = this._getOAuthedRequest('POST', uri, params);
      return this._promiseXHR(xhr, function(result) {
        return new Tweet(result);
      });
    },
    retweetStatus: function(statusId, params) {
      var uri = this._getRequestURI(this.endpoints.retweetStatus, {
        id: statusId
      });
      var xhr = this._getOAuthedRequest('POST', uri, params);
      return this._promiseXHR(xhr, function(result) {
        return new Tweet(result);
      });
    },
    updateStatusWithMedia: function(params) {
      var uri = this._getRequestURI(this.endpoints.updateStatusWithMedia);
      var xhr = this._getOAuthedRequest('POST', uri, params);
      return this._promiseXHR(xhr, function(result) {
        return new Tweet(result);
      });
    },
    getOEmbed: function(params) {
      var uri = this._getRequestURI(this.endpoints.oEmbed);
      var xhr = this._getOAuthedRequest('GET', uri, params);
      return this._promiseXHR(xhr, function(result) {
        return result;
      });
    },
    getRetweeterIds: function(params) {
      var uri = this._getRequestURI(this.endpoints.getRetweeterIds);
      var xhr = this._getOAuthedRequest('GET', uri, params);
      return this._promiseXHR(xhr, function(result) {
        return result;
      });
    }
  };

  Violet.Rest = Rest;
})(Violet);
