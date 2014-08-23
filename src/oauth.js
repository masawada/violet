//
// Violet.OAuth
//

(function(Violet) {
  var OAuth = function(args) {
    this.consumerKey = args.consumerKey;
    this.consumerSecret = args.consumerSecret;

    this.accessToken = args.accessToken || '';
    this.accessTokenSecret = args.accessTokenSecret || '';
  };

  OAuth.prototype = {
    obtainOAuthParams: function(xhr) {
      var params = {
        oauth_consumer_key: this.consumerKey,
        oauth_nonce: this._generateNonce(32),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: String(Math.floor((new Date())/1000)),
        oauth_token: this.accessToken,
        oauth_version: '1.0'
      };

      params.oauth_signature = this._generateSignature(xhr.method, xhr.uri, Violet.Util.mergeMaps(xhr.rawData, params), this.accessTokenSecret);

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
      var baseString = method.toUpperCase() + '&' + Violet.Util.URIEncode(uri) + '&';

      baseString += Object.keys(params).sort().map(function(key) {
        return key + '=' + Violet.Util.URIEncode(params[key]);
      }).join('&');

      if (!OAuthSecret) {
        OAuthSecret = '';
      }

      var secretKey = this.consumerSecret + '&' + OAuthSecret;
      return btoa(CryptoJS.HmacSHA1(baseString, secretKey));
    }
  };

  Violet.OAuth = OAuth;
})(Violet);
