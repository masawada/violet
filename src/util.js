// Violet.Util

(function(Violet) {
  var Util = {};

  Util.uri_encode = function(text) {
    return encodeURIComponent(text).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
  };

  Violet.Util = Util;
})(Violet);
