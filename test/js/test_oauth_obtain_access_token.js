Smoothy.test(function(t){
  var pin = '';
  var oauth = Violet.OAuth({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
  });

  oauth.oauth_token = '';
  oauth.oauth_token_secret = '';

  var callback = function(hash){
    t.log(hash.oauth_token);
    t.log(hash.oauth_token_secret);
    t.assert('user_id').equal(hash.user_id, '25666146');
    t.assert('screen_name').equal(hash.screen_name, 'masawada');
  };

  var error = function(xhr){
    t.log(xhr.status);
  };

  oauth.obtainAccessToken(pin, callback, error);
});

