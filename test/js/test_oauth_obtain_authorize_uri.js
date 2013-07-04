// obtainAuthorizeURI
Smoothy.test(function(t){
  var oauth = Violet.OAuth({
    consumer_key: consumer_key, // insert consumer_key
    consumer_secret: consumer_secret // insert consumer_secret
  });

  var callback = function(uri){
    t.log(uri);
    t.log(oauth.oauth_token);
    t.log(oauth.oauth_token_secret);
  };

  var error = function(xhr){
    t.log(xhr.status);
  };

  oauth.obtainAuthorizeURI(callback, error);
});

