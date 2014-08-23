//
// violet.js
//

var Violet = function (oauth) {
  this.oauth = new Violet.OAuth(oauth);
  this.rest = new Violet.Rest(this.oauth);
  this.streaming = new Violet.Streaming(this.oauth);
};

Violet.prototype = {
};
