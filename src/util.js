// util.js

Violet.Util = {};

Violet.Util.uri_encode = function(text){
  return encodeURIComponent(text).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
};

Violet.Util.mergeHash = function(){
  var l = arguments.length, i, key, result = {};
  for(i=0;i<l;i++){
    var hash = arguments[i];
    for(key in hash){
      if(hash.hasOwnProperty(key)){
        result[key] = hash[key];
      }
    }
  }

  return result;
};

