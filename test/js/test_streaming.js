Smoothy.test(function(t){
  var violet = Violet.init({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    access_token: access_token,
    access_token_secret: access_token_secret
  });

  var callback = function(tweet){
    if(tweet.delete){return false;}
    if(!tweet.user){return false;}
    t.log(tweet.user.screen_name+': '+tweet.text);
  };

  var error = function(xhr){
    t.log(xhr.status);
  };

  violet.userstream.start(callback, error);
});

