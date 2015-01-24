//
// Violet.OAuth
//

(function(Violet) {
  var Util = Violet.Util;
  var HTTPClient = Violet.HTTPClient;

  var OAuth = function(args) {
    this.consumerKey = args.consumerKey;
    this.consumerSecret = args.consumerSecret;

    this.accessToken = args.accessToken || '';
    this.accessTokenSecret = args.accessTokenSecret || '';

    this.OAuthToken = '';
    this.OAuthTokenSecret = '';
  };

  OAuth.prototype = {
    requestToken: function() {
      var method = 'POST';
      var uri = 'https://api.twitter.com/oauth/request_token';

      var client = new HTTPClient({
        method: method,
        uri: uri
      });

      var OAuthParams = {
        oauth_callback: 'oob',
      };
      OAuthParams = this._obtainOAuthParams(client, OAuthParams, '');
      client.setOAuthHeader(OAuthParams);

      client.start();

      return new Promise(function(resolve, reject) {
        client.addEventListener('load', function(xhr) {
          var res = {};
          xhr.responseText.split('&').forEach(function(keyValue) {
            var kv = keyValue.split('=');
            res[kv[0]] = kv[1];
          });

          this.OAuthToken = res.oauth_token;
          this.OAuthTokenSecret = res.oauth_token_secret;
          resolve(res);
        }.bind(this));
      });
    },
    obtainAccessTokenWithPIN: function(PIN) {
      var method = 'POST';
      var uri = 'https://api.twitter.com/oauth/access_token';

      var client = new HTTPClient({
        method: method,
        uri: uri
      });

      var OAuthParams = {
        oauth_token: this.oauthToken,
        oauth_verifier: PIN,
      };
      OAuthParams = this._obtainOAuthParams(client, OAuthParams, this.OAuthTokenSecret);
      client.setOAuthHeader(OAuthParams);

      client.start();

      return new Promise(function(resolve, reject) {
        client.addEventListener('load', function(xhr) {
          var res = {};
          xhr.responseText.split('&').forEach(function(keyValue) {
            var kv = keyValue.split('=');
            res[kv[0]] = kv[1];
          });

          this.accessToken = res.access_token;
          this.accessTokenSecret = res.access_token_secret;
          promise.resolve(res);
        }.bind(this));
      });
    },
    obtainOAuthParams: function(client) {
      var params = {
        oauth_token: this.accessToken,
      };

      return _obtainOAuthParams(client, params, this.accessTokenSecret);
    },
    _obtainOAuthParams: function(client, additionalParams, secret) {
      var params = {
        oauth_consumer_key: this.consumerKey,
        oauth_nonce: this._generateNonce(32),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: String(Math.floor((new Date())/1000)),
        oauth_version: '1.0'
      };

      params = Util.mergeMaps(params, additionalParams, client.rawData);

      params.oauth_signature = this._generateSignature(client.method, client.uri, params, secret);

      return params;
    },
    _generateNonce: function(length) {
      var seed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
      var i, nonce = '';
      for (i = 0; i < length; i++) {
        nonce += seed[Math.floor(Math.random() * 61)];
      }

      return nonce;
    },
    _generateSignature: function(method, uri, params, OAuthSecret) {
      var baseString = method.toUpperCase() + '&' + Util.URIEncode(uri) + '&';

      baseString += Util.URIEncode(Object.keys(params).sort().map(function(key) {
        return key + '=' + Util.URIEncode(params[key]);
      }).join('&'));

      if (!OAuthSecret) {
        OAuthSecret = '';
      }

      var secretKey = this.consumerSecret + '&' + OAuthSecret;
      return Util.URIEncode(CryptoJS.HmacSHA1(baseString, secretKey).toString(CryptoJS.enc.Base64));
    }
  };

  Violet.OAuth = OAuth;
})(Violet);
