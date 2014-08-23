//
// Violet.Rest
//

(function(Violet) {
  var util = Violet.Util;
  var Rest = function(oauth) {
    this.oauth = oauth;
  };
  Rest.prototype = {
    apiBase: 'https://api.twitter.com/1.1/',
    endpoints: {
      mentionsTimeline: 'statuses/mentions_timeline',
      retweets: 'statuses/retweets/:id'
    },
    getRequestUri: function(endpoint, params) {
      var path = util.resolveEndpoint(endpoint, params);
      return this.apiBase + path;
    },
    getOAuthedXHR: function(method, uri, data) {
      var xhr = new Violet.XHR();
      xhr.setOAuthHeader(this.oauth.obtainOAuthParams());
      return xhr;
    },
    sendGetRequest: function(uri, data) {
      var xhr = this.getOAuthedXHR('get', uri, data);
      xhr.get({
        uri: uri,
        data: data
      });
      return xhr;
    },
    getMentionsTimeline: function(params) {
      var uri = this.getRequestUri(this.endpoints.mentionsTimeline);
      return this.sendGetRequest(uri, params);
    },
    getRetweets: function(statusId, params) {
      var uri = this.getRequestUri(this.endpoints.retweets, {
        id: statusId
      });
      return this.sendGetRequest(uri, params);
    }
  };

  Violet.Rest = Rest;
})(Violet);
