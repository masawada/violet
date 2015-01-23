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
    },
    addWithPIN: function(pin) {
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
