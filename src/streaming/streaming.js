//
// Violet.Streaming
//

(function(Violet) {
  var Util = Violet.Util;

  var Streaming = function(accounts) {
    this.accounts = accounts;
    this._events = {};
    this._connections = {
      'userStream': {},
      'filterStream': {}
    };
  };

  Streaming.prototype = {
    apiBaseURI: 'https://stream.twitter.com/1.1/',
    endpoints: {
      userStream: {
        method: 'GET',
        path: 'https://userstream.twitter.com/1.1/user.json'
      },
      filterStream: {
        method: 'POST',
        path: 'statuses/filter.json'
      },
    },
    on: function(key, callback) {
      this._events[key] = callback;
    },
    startUserStream: function(accountId) {
      var method = this.endpoints.userStream.method;
      var uri = this.endpoints.userStream.path;

      if (!this._connections.userStream[accountId]) {
        this._connections.userStream[accountId] = this._startStreaming(accountId, method, uri);
      }
    },
    stopUserStream: function(accountId) {
      this._connections.userStream[accountId].stop();
      delete this._connections.userStream[accountId];
    },
    startFilterStream: function(accountId) {
      var method = this.endpoints.filterStream.method;
      var uri = this.apiBaseURI + this.endpoints.filterStream.path;

      if (!this._connections.filterStream[accountId]) {
        this._connections.filterStream[accountId] = this._startStreaming(accountId, method, uri);
      }
    },
    stopFilterStream: function(accountId) {
      this._connections.filterStream[accountId].stop();
      delete this._connections.filterStream[accountId];
    },
    _startStreaming: function(accountId, method, uri) {
      var oauth = this.accounts.getOAuthManager(accountId);
      var conn = new Violet.HTTPClient({
        method: method,
        uri: uri
      });

      conn.setOAuthHeader(oauth.obtainOAuthParams(method, uri));
      conn.addEventListener('progress', function(event) {
        this._parseStream(accountId, event);
      }.bind(this));

      conn.start();
      return conn;
    },
    _parseStream: function(accountId, event) {
    }
  };
  Violet.Streaming = Streaming;
})(Violet);
