//
// Violet.Accounts
//

(function(Violet) {
  var Accounts = function(keys) {
    this._accounts = {};
    this._primaryId = '';
    this._oauth = new Violet.OAuth(keys);
  };

  Accounts.prototype = {
    requestAuthorizeURI: function() {
      var uri_base = 'https://api.twitter.com/oauth/authorize?oauth_token=';
      return new Promise(function(resolve, reject) {
        this._oauth.requestToken()
        .then(function(res) {
          resolve(uri_base + res.oauth_token);
        })
        .catch(function() {
          reject();
        });
      }.bind(this));
    },
    addWithPIN: function(pin) {
      return new Promise(function(resolve, reject) {
        this._oauth.obtainAccessTokenWithPIN(pin)
        .then(function(res) {
          this.add(res.user_id, res.oauth_token, res.oauth_token_secret);
          resolve();
        })
        .catch(function() {
          reject();
        });
      }.bind(this));
    },
    add: function(accountId, accessToken, accessTokenSecret) {
      this._accounts[accountId] = {
        accessToken: accessToken,
        accessTokenSecret: accessTokenSecret
      };
    },
    getList: function() {
      return Object.keys(this._accounts).sort();
    },
    get: function(accountId) {
      accountId = accountId || this._primaryId;
      return this._accounts[accountId] || {accessToken: '', accessTokenSecret: ''};
    },
    setPrimary: function(accountId) {
      if (this._accounts[accountId]) {
        this._primaryId = accountId;
      }
    },
    getPrimary: function() {
      return this.get(this._primaryId);
    },
    getOAuthManager: function(accountId) {
      var account = this.get(accountId);
      this._oauth.accessToken = account.accessToken;
      this._oauth.accessTokenSecret = account.accessTokenSecret;
      return this._oauth;
    },
    remove: function(accountId) {
      delete this._accounts[accountId];
      if (this._primaryId === accountId) {
        this._primaryId = Object.keys(this._accounts).sort()[0] || '';
      }
    }
  };

  Violet.Accounts = Accounts;
})(Violet);
