// init.js

Violet.init = function Class(args){
  if(!(this instanceof Class)){ return new Class(args); }

  this.base_uri = 'https://api.twitter.com/1.1/';
  this.consumer_key = args.consumer_key;
  this.consumer_secret = args.consumer_secret;
  this.access_token = args.access_token || '';
  this.access_token_secret = args.access_token_secret || '';

  this.initialize();
};

(function(){
var proto = Violet.init.prototype;

proto.initialize = function(){
  this.oauth = Violet.OAuth({
    consumer_key: this.consumer_key,
    consumer_secret: this.consumer_secret,
    access_token: this.access_token,
    access_token_secret: this.access_token_secret
  });

  this.userstream = Violet.UserStream(this.oauth);
  this.streaming = this.userstream; // deprecated

  this.request = Violet.Request.request.bind(this);
};

}());

