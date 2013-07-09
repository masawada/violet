Smoothy.test(function(t){
  var violet = Violet.init({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    access_token: access_token,
    access_token_secret: access_token_secret
  });

  var callback = function(xhr){
    t.log(JSON.parse(xhr.responseText).length);
  };

  var error = function(xhr){
    t.log(xhr.status);
  };

  var query = {
    count: 5
  };

  violet.request('statuses/home_timeline', query, callback, error);
});

