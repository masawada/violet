//
// violet.js
//

var Violet = function (oauth) {
  this.oauth = new Violet.OAuth(oauth);
  this.rest = new Violet.Rest(this.oauth);
};

Violet.prototype = {
};
