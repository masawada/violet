//
// Violet.HTTPClient
//

(function(Violet) {
  var HTTPClient = function(args) {
    this.multipart = args.multipart === true;
    this.method = args.method || 'GET';
    this.formatURIAndData(args.uri || '', args.data || {});
    this.xhr = new XMLHttpRequest({mozSystem: true});
    this.authorizationHeader = null;
  };

  HTTPClient.prototype = {
    start: function() {
      if (this.uri === '') { return false; }

      var xhr = this.xhr;

      xhr.open(this.method, this.uri, true);

      if (this.authorizationHeader !== null) {
        xhr.setRequestHeader('Authorization', this.authorizationHeader);
      }

      if (this.method === 'POST' && !this.multipart) {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }

      xhr.send(this.data);
    },
    stop: function() {
      this.xhr.abort();
    },
    formatURIAndData: function (rawURI, rawData) {
      if (this.multipart) {
        this.uri = rawURI;
        this.data = rawData;
      } else {
        var key, data = [];
        for (key in rawData) {
          if (rawData.hasOwnProperty(key)) {
            data.push(key + '=' + Violet.Util.URIEncode(rawData[key]));
          }
        }

        this.rawData = rawData;
        if (this.method === 'GET') {
          this.uri =  rawURI + ((data.length > 0) ? '?' + data.join('&') : '');
          this.data = null;
        } else if (this.method === 'POST') {
          this.uri = rawURI;
          this.data = data.join('&');
        }
      }
    },
    setOAuthHeader: function(OAuthParams) {
      var key = '', params = [];
      for (key in OAuthParams) {
        if (OAuthParams.hasOwnProperty(key)) {
          params.push(key + '="' + OAuthParams[key] + '"');
        }
      }
      this.authorizationHeader = 'OAuth ' + params.join(', ');
    },
    addEventListener: function(event, callback) {
      this.xhr.addEventListener.call(this.xhr, event, function() { callback(this.xhr); }.bind(this));
    },
    removeEventListener: function(event, callback) {
      this.xhr.removeEventListener.call(this.xhr, event, function() { callback(this.xhr); }.bind(this));
    }
  };

  Violet.HTTPClient = HTTPClient;
})(Violet);
