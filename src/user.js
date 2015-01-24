//
// Violet.User
//

(function(Violet) {
  var User = function(data, accounts, accountId) {
    this.rawData = data;
    this.accounts = accounts;
    this._accountId = accountId;
  };

  Violet.User = User;
})(Violet);
