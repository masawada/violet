//
// rest.js
//

(function(Violet) {
  var xhr = new Violet.XHR();

  var Rest = function(oauth) {

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
    getMentionsTimeline: function(params) {
      var url = this.resolveEndpoint(this.endpoints.mentionsTimeline);
      return xhr.get({
        url: url,
        data: params
      });
    },
    getRetweets: function(statusId, params) {
      var url = this.resolveEndpoint(this.endpoints.retweets, {
        id: statusId
      });
      return xhr.get({
        url: url,
        data: params
      });
    }
  };

  Violet.Rest = Rest;
})(Violet);
