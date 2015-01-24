//
// Violet.Tweet
//

(function(Violet) {
  var Tweet = function(data, accounts, accountId) {
    this.rawData = data;
    this.accounts = accounts;
    this._accountId = accountId;
  };

  Violet.Tweet = Tweet;
})(Violet);
