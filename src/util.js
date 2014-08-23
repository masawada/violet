// Violet.Util

(function(Violet) {
  var Util = {};

  Util.uri_encode = function(text) {
    return encodeURIComponent(text).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
  };
  Util.resolveEndpoint = function(endpoint, params) {
    if (params === undefined) {
      params = {};
    }

    var path = endpoint;
    for (var key in params) {
      path = path.split(':' + key).join(params[key]);
    }
    return path;
  };

  Violet.Util = Util;
})(Violet);
