// util.js

Violet.Util = {};

Violet.Util.uri_encode = function(text){
  return encodeURIComponent(text).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
};

