//
// violet.js
//

var Violet = function (keys) {
  this.accounts = new Violet.Accounts(keys);
  this.streaming = new Violet.Streaming(this.accounts);
};
