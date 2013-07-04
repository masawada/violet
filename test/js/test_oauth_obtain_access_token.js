Smoothy.test(function(t){
  var pin = '6953228';
  var oauth = Violet.OAuth({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
  });

  oauth.oauth_token = 'n5NiDxRnW34d2F9ATKVKAGixeaQRDRsfk3gTbxPN64';
  oauth.oauth_token_secret = '5GCHtAbxzpPonFu4Mx59kyXJn97h1eZompioOKDSOi0';

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

