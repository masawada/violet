//
// Violet.js
// A Twitter Library for FirefoxOS
// Copyright (c) 2013 Masayoshi Wada <developer@andantesoftware.com>
//

// main.js
var Violet = {};

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

// oauth.js

Violet.OAuth = function Class(args){
  if(!(this instanceof Class)){ return new Class(args); }
  if(!args){ args = {}; }

  this.base_uri = args.uri;
  this.consumer_key = args.consumer_key;
  this.consumer_secret = args.consumer_secret;
  this.access_token = args.access_token;
  this.access_token_secret = args.access_token_secret;

  this.oauth_token = '';
  this.oauth_token_secret = '';
};

(function(){
var proto = Violet.OAuth.prototype;

proto.obtainAuthorizeURI = function(callback, error){
  var method = 'POST';
  var uri = 'https://api.twitter.com/oauth/request_token';

  var con = Violet.HTTPClient({
    uri: uri,
    method: method
  });

  var params = {
    oauth_callback: 'oob',
    oauth_consumer_key: this.consumer_key,
    oauth_nonce: this.generateNonce(32),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: String(Math.floor((new Date())/1000)),
    oauth_version: '1.0'
  };

  params.oauth_signature = this.generateSignature(method, uri, params, '');
  con.setOAuthHeader(params);

  con.onsuccess = function(xhr){
    var raw_res = xhr.responseText.split('&'), i, l = raw_res.length, res = {};
    for(i=0;i<l;i++){
      var kv = raw_res[i].split('=');
      res[kv[0]] = kv[1];
    }

    this.oauth_token = res.oauth_token;
    this.oauth_token_secret = res.oauth_token_secret;
    callback('https://api.twitter.com/oauth/authorize?oauth_token='+res.oauth_token);
  }.bind(this);

  con.onerror = error;

  con.start();
};

proto.obtainAccessToken = function(pin, callback, error){
  var method = 'POST';
  var uri = 'https://api.twitter.com/oauth/access_token';

  var con = Violet.HTTPClient({
    uri: uri,
    method: method
  });

  var params = {
    oauth_consumer_key: this.consumer_key,
    oauth_nonce: this.generateNonce(32),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: String(Math.floor((new Date())/1000)),
    oauth_token: this.oauth_token,
    oauth_verifier: pin,
    oauth_version: '1.0'
  };

  params.oauth_signature = this.generateSignature(method, uri, params, this.oauth_token_secret);
  con.setOAuthHeader(params);

  con.onsuccess = function(xhr){
    var raw_res = xhr.responseText.split('&'), i, l = raw_res.length, res = {};
    for(i=0;i<l;i++){
      var kv = raw_res[i].split('=');
      res[kv[0]] = kv[1];
    }

    this.access_token = res.access_token;
    this.access_token_secret = res.access_token_secret;

    callback(res);
  }.bind(this);

  con.onerror = error;

  con.start();
};

proto.obtainOAuthParams = function(method, uri, post_data){
  var params = {
    oauth_consumer_key: this.consumer_key,
    oauth_nonce: this.generateNonce(32),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: String(Math.floor((new Date())/1000)),
    oauth_token: this.access_token,
    oauth_version: '1.0'
  };

  params.oauth_signature = this.generateSignature(method, uri, Violet.Util.mergeHash(params, post_data), this.access_token_secret);

  return params;
};

proto.generateNonce = function(length){
  var seed_str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      seed = seed_str.split(''),
      i,
      nonce = '';

  for(i=0;i<length;i++){
    nonce += seed[Math.floor(Math.random() * 61)];
  }

  return nonce;
};

proto.generateSignature = function(method, uri, params, oauth_secret){
  // create base string
  var key_array = [], key, i, l, base_string, sorted_params;

  base_string = method.toUpperCase() + '&' + Violet.Util.uri_encode(uri) + '&';

  for(key in params){
    if(params.hasOwnProperty(key)){
      key_array[key_array.length] = key;
    }
  }
  key_array.sort();
  l = key_array.length;

  sorted_params = [];
  for(i=0;i<l;i++){
    sorted_params[sorted_params.length] = (key_array[i] + '=' + Violet.Util.uri_encode(params[key_array[i]]));
  }
  base_string += Violet.Util.uri_encode(sorted_params.join('&'));

  // get hmac
  if(!oauth_secret){
    oauth_secret = '';
  }

  var shaObj = new jsSHA(base_string, 'TEXT');
  var secret_key = this.consumer_secret + '&' + oauth_secret;
  return Violet.Util.uri_encode(shaObj.getHMAC(secret_key, 'TEXT', 'SHA-1', 'B64'));
};

}());

// endpoints.js

Violet.Endpoints = {};

Violet.Endpoints.get = [
  'statuses/mentions_timeline',
  'statuses/user_timeline',
  'statuses/home_timeline',
  'statuses/retweets_of_me',
  'statuses/retweets/:id',
  'statuses/show/:id',
  'statuses/oembed',
  'statuses/retweeters/ids',
  'search/tweets',
  'statuses/sample',
  'statuses/firehose',
  'user',
  'site',
  'direct_messages',
  'direct_messages/sent',
  'direct_messages/show',
  'friendships/no_retweets/ids',
  'friends/ids',
  'followers/ids',
  'friendships/lookup',
  'friendships/incoming',
  'friendships/outgoing',
  'friendships/show',
  'friends/list',
  'followers/list',
  'account/settings',
  'account/verify_credentials',
  'blocks/list',
  'blocks/ids',
  'users/lookup',
  'users/show',
  'users/search',
  'users/contributees',
  'users/contributors',
  'users/profile_banner',
  'users/suggestions/:slug',
  'users/suggestions',
  'users/suggestions/:slug/members',
  'favorites/list',
  'lists/list',
  'lists/statuses',
  'lists/memberships  ',
  'lists/subscribers',
  'lists/subscribers/show',
  'lists/members/show',
  'lists/members',
  'lists/show',
  'lists/subscriptions',
  'lists/ownerships',
  'saved_searches/list',
  'saved_searches/show/:id',
  'geo/id/:place_id',
  'geo/reverse_geocode',
  'geo/searc',
  'geo/similar_places',
  'trends/place',
  'trends/available',
  'trends/closest',
  'oauth/authenticate',
  'oauth/authorize  ',
  'help/configuration',
  'help/languages',
  'help/privacy',
  'help/tos',
  'application/rate_limit_status'
];

Violet.Endpoints.post = [
  'statuses/destroy/:id',
  'statuses/update',
  'statuses/retweet/:id',
  'statuses/update_with_media',
  'statuses/filter',
  'direct_messages/destroy',
  'direct_messages/new',
  'friendships/create',
  'friendships/destroy',
  'friendships/update',
  'account/settings',
  'account/update_delivery_device',
  'account/update_profile_background_image',
  'account/update_profile_colors',
  'account/update_profile_image',
  'blocks/create',
  'blocks/destroy',
  'account/remove_profile_banner',
  'account/update_profile_banner',
  'favorites/destroy',
  'favorites/create',
  'lists/members/destroy',
  'lists/subscribers/create',
  'lists/subscribers/destroy',
  'lists/members/create_all',
  'lists/members/create',
  'lists/destroy',
  'lists/update',
  'lists/create',
  'lists/members/destroy_all',
  'saved_searches/create',
  'saved_searches/destroy/:id',
  'geo/place',
  'users/report_spam',
  'oauth/access_token',
  'oauth/request_token',
  'oauth2/token',
  'oauth2/invalidate_token'
];

Violet.Endpoints.method = function(endpoint){
  var method = null;
  if(Violet.Endpoints.get.indexOf(endpoint) !== -1){
    method =  'GET';
  }else if(Violet.Endpoints.post.indexOf(endpoint) !== -1){
    method =  'POST';
  }
  return method;
};

// request.js

Violet.Request = function(endpoint, post_data, callback, error){
  var method = Violet.Endpoints.method(endpoint);
  var uri = this.base_uri + endpoint + '.json';
  var con = Violet.HTTPClient({
    method: method,
    uri: uri
  });
  
  con.setOAuthHeader(this.oauth.obtainOAuthParams(method, uri, post_data));

  con.onsuccess = callback;
  con.onerror = error;
  con.post_data = post_data;

  con.start();
};

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
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    access_token: access_token,
    access_token_secret: access_token_secret
  });

  this.streaming = Violet.Streaming(this.oauth);

  this.request = Violet.Request.bind(this);
};

}());

