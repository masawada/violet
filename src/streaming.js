// streaming.js

Violet.Streaming = function Class(oauth){
  if(!(this instanceof Class)){ return new Class(oauth); }

  this.oauth = oauth;
};

(function(){
var proto = Violet.Streaming.prototype;

proto.start = function(callback, error){
  var method = 'GET';
  var uri = 'https://userstream.twitter.com/1.1/user.json';

  var con = Violet.HTTPClient({
    method: method,
    uri: uri
  });

  con.setOAuthHeader(this.oauth.obtainOAuthParams(method, uri));

  con.onloading = function(xhr){
    var lines = xhr.responseText.split('\r\n');
    if(!lines[lines.length-2]){ return false; }
    callback(JSON.parse(lines[lines.length-2]));
  };
  con.onerror = error;

  con.start();
  this.connection = con;
};

proto.stop = function(){
  this.connection.stop();
  this.connection = null;
};

}());

