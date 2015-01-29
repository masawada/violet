//
// violet.js
//

var Violet = function (keys) {
  this.accounts = new Violet.Accounts(keys);
  this.rest = new Violet.REST(this.accounts);
  this.streaming = new Violet.Streaming(this.accounts);
};
