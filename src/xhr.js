// Violet.XHR

(function(Violet) {
  var XHR = function(args) {
    this.method = args.method || 'GET';
    this.format_uri_and_data(args.uri || '', args.data || {});
    this.xhr = new XMLHTTPRequest({mozSystem: true});
    this.authorization_header = null;
  };

  XHR.prototype = {
    start: function() {
      if (this.uri === '') { return false; }

      var xhr = this.xhr;

      xhr.open(this.method, this.uri, true);

      if (this.authorization_header !== null) {
        xhr.setRequestHeader('Authorization', this.authorization_header);
      }

      if (this.method === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }

      xhr.send(this.data);
    },
    stop: function() {
      this.xhr.abort();
    },
    formatUriAndData: function (raw_uri, raw_data) {
      var key, result, data = [];

      for (key in raw_data) {
        if (raw_data.hasOwnProperty(key)) {
          data.push(key + '=' + Violet.Util.uri_encode(raw_data[key]));
        }
      }

      this.raw_data = raw_data;
      if (this.method === 'GET') {
        this.uri =  raw_uri + ((data.length > 0) ? '?' + data.join('&') : '');
        this.data = null;
      } else if (this.method === 'POST') {
        this.uri = raw_uri;
        this.data = data.join('&');
      }
    },
    setOAuthHeader: function(oauth_params) {
      var key = '', params = [];
      for (key in oauth_params) {
        if (oauth_params.hasOwnProperty(key)) {
          params.push(key + '="' + oauth_params[key] + '"');
        }
      }
      this.authorization_header = 'OAuth ' + params.join(', ');
    },
    addEventListener: function() {
      this.xhr.addEventListener.apply(this.xhr, arguments);
    },
    removeEventListener: function() {
      this.xhr.removeEventListener.apply(this.xhr, arguments);
    }
  };

  Violet.XHR = XHR;
})(Violet);
