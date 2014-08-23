// Violet.Util

(function(Violet) {
  var Util = {};

  Util.URIEncode = function(text) {
    return encodeURIComponent(text).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
  };

  Util.mergeMaps = function () {
    var dst = arguments[0];
    var i, j, src, keys;

    for (i = 1; i < arguments.length; i++) {
      src = arguments[i];
      keys = Object.keys(src);

      for (j = 0; j < keys.length; j++) {
        dst[keys[j]] = src[keys[j]];
      }
    }

    return dst;
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
