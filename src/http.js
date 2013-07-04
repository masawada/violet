// http.js

Violet.HTTPClient = function Class(args){
  if(!(this instanceof Class)){ return new Class(args); }
  if(!args){ args = {}; }

  // properties
  this.method = args.method || 'GET';
  this.uri = args.uri || '';

  this.post_data = {};
  this.authorization_header = null;
  this.onloading = function(){};
  this.onsuccess = function(){};
  this.onerror = function(){};

  // initalize
  this.request = new XMLHttpRequest({mozSystem: true});
};

(function(){
var proto = Violet.HTTPClient.prototype;

proto.start = function(){
  var xhr = this.request, self = this;
  xhr.open(this.method, this.uri, true);

  // add headers
  if(this.authorization_header !== null){
    xhr.setRequestHeader('Authorization', this.authorization_header);
  }

  if(this.method === 'POST'){
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }

  xhr.onreadystatechange = function(){
    if(xhr.readyState === 3){
      this.onloading(xhr);
    }else if(xhr.readyState === 4){
      if(xhr.status === 200){
        this.onsuccess(xhr);
      }else{
        this.onerror(xhr);
      }
    }
  }.bind(this);

  xhr.send(this.postBody());
};

proto.stop = function(){
  this.request.abort();
};

proto.setOAuthHeader = function(oauth_params){
  var key = '', params = [];
  for(key in oauth_params){
    if(oauth_params.hasOwnProperty(key)){
      params[params.length] = key+'="'+oauth_params[key]+'"';
    }
  }

  this.authorization_header = 'OAuth ' + params.join(', ');
};

proto.postBody = function(){
  if(this.method === 'GET' || this.post_data.length === 0){ return null; }

  var key = '',
      data = this.post_data,
      post_body = [];

  for(key in data){
    if(data.hasOwnProperty(key)){
      post_body.push(key+'='+Violet.Util.uri_encode(data[key]));
    }
  }

  return post_body.join('&');
};

}());

