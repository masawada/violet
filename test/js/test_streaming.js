Smoothy.test(function(t){
  var violet = Violet.init({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    access_token: access_token,
    access_token_secret: access_token_secret
  });

  var callback = function(tweet){
    t.log(tweet.user.screen_name+': '+tweet.text);
  };

  var error = function(xhr){
    t.log(xhr.status);
  };

  violet.streaming.start(callback, error);
});

