//
// Violet.Accounts
//

(function(Violet) {
  var Accounts = function() {
    this._accounts = {};
    this._primaryId = "";
    this._oauth = new Violet.OAuth();
  };

  Accounts.prototype = {
    requestAuthorizeURI: function() {
    },
    addWithPIN: function(pin) {
    },
    getList: function() {
      return Object.keys(this._accounts);
    },
    get: function(accountId) {
      accountId = accountId || this._primaryId;
      return this._accounts[accountId] || {accessToken: "", accessTokenSecret: ""};
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
    }
  };

  Violet.Accounts = Accounts;
})(Violet);
