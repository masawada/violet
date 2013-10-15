// streaming.js

Violet.Streaming = function Class(oauth){
  if(!(this instanceof Class)){ return new Class(oauth); }

  this.oauth = oauth;
  this.base_uri = '';
  this.endpoint = '';
};

(function(){
var proto = Violet.Streaming.prototype;

proto.start = function(callback, error, raw_query){
  var info = Violet.Request.generateRequestInfo(this.endpoint, raw_query);

  var method = info.method;
  var uri = this.base_uri + info.uri;
  var query = info.query;
  var get_data = info.get_data;

  console.log(info);
  if(method === null){ return false; }

  var con = Violet.HTTPClient({
    method: method,
    uri: uri + get_data
  });

  con.setOAuthHeader(this.oauth.obtainOAuthParams(method, uri, query));

  con.onloading = function(xhr){
    var lines = xhr.responseText.split('\r\n');
    if(!lines[lines.length-2]){ return false; }
    callback(JSON.parse(lines[lines.length-2]));
  };
  con.onerror = error;

  if(method === 'POST'){
    con.post_data = query;
  }

  con.start();
  this.connection = con;
};

proto.stop = function(){
  this.connection.stop();
  this.connection = null;
};

}());

