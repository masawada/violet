// init.js

Violet.init = function Class(args){
  if(!(this instanceof Class)){ return new Class(args); }

  this.base_uri = 'https://api.twitter.com/1.1/';
  this.initialize(args);
};

(function(){
var proto = Violet.init.prototype;

proto.initialize = function(args){
};

}());

