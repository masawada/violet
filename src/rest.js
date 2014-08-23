//
// rest.js
//

(function(Violet) {
  var Rest = function(oauth) {
    this.oauth = oauth;
  };
  Rest.prototype = {
    apiBase: 'https://api.twitter.com/1.1/',
    endpoints: {
      mentionsTimeline: 'statuses/mentions_timeline'
      retweets: 'statuses/retweets/:id'
    },
    resolveEndpoint: function(endpoint, parameter) {
      if (parameter === undefined) {
        parameter = {};
      }

      var path = endpoint;
      for (var key in parameter) {
        path = path.split(':' + key).join(parameter[key]);
      }

      return this.apiBase + path;
    },
    getOAuthedXHR: function(method, uri, data) {
      var xhr = new Violet.XHR();
      xhr.setOAuthHeader(this.oauth.obtainOAuthParams());
      return xhr;
    },
    sendGetRequest: function(uri, data) {
      var xhr = this.getOAuthedXHR('get', uri, data)
      xhr.get({
        uri: uri,
        data: data
      });
      return xhr;
    }
    getMentionsTimeline: function(params) {
      var uri = this.resolveEndpoint(this.endpoints.mentionsTimeline);
      return this.sendGetRequest(uri, params);
    },
    getRetweets: function(statusId, params) {
      var uri = this.resolveEndpoint(this.endpoints.retweets, {
        id: statusId
      });
      return this.sendGetRequest(uri, params);
    }
  };

  Violet.Rest = Rest;
})(Violet);
