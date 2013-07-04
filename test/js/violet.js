//
// Violet.js
// A Twitter Library for FirefoxOS
// Copyright (c) 2013 Masayoshi Wada <developer@andantesoftware.com>
//

// main.js
var Violet = {};

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

