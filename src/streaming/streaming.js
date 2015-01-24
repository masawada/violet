//
// Violet.Streaming
//

(function(Violet) {
  var Util = Violet.Util;

  var Streaming = function(accounts) {
    this.accounts = accounts;
    this.messageParser = new Violet.Streaming.MessageParser(accounts);
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
      var streamType = 'user';

      if (!this._connections.userStream[accountId]) {
        this._connections.userStream[accountId] = this._startStreaming(accountId, method, uri, streamType);
      }
    },
    stopUserStream: function(accountId) {
      this._connections.userStream[accountId].stop();
      delete this._connections.userStream[accountId];
    },
    startFilterStream: function(accountId) {
      var method = this.endpoints.filterStream.method;
      var uri = this.apiBaseURI + this.endpoints.filterStream.path;
      var streamType = 'filter';

      if (!this._connections.filterStream[accountId]) {
        this._connections.filterStream[accountId] = this._startStreaming(accountId, method, uri, streamType);
      }
    },
    stopFilterStream: function(accountId) {
      this._connections.filterStream[accountId].stop();
      delete this._connections.filterStream[accountId];
    },
    _startStreaming: function(accountId, method, uri, streamType) {
      var oauth = this.accounts.getOAuthManager(accountId);
      var conn = new Violet.HTTPClient({
        method: method,
        uri: uri
      });

      conn.setOAuthHeader(oauth.obtainOAuthParams(method, uri));
      conn.addEventListener('progress', function(event) {
        this._parseStream(accountId, streamType, event.response);
      }.bind(this));

      conn.start();
      return conn;
    },
    _parseStream: function(accountId, streamType, response) {
      var parsedMessage = this.messageParser.parse(accountId, response);
      if (typeof this._events[parsedMessage.type] === 'function') {
        this._events[parsedMessage.type].call(null, streamType, parsedMessage.data);
      }
    }
  };
  Violet.Streaming = Streaming;
})(Violet);
