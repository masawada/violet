Smoothy.test(function(t){
  var violet = Violet.init({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    access_token: access_token,
    access_token_secret: access_token_secret
  });

  var callback = function(xhr){
    t.log(JSON.parse(xhr.responseText).text);
  };

  var error = function(xhr){
    t.log(xhr.status);
  };

  var query = {
    id: 354536529370165248
  };

  violet.request('statuses/show/:id', query, callback, error);
});

