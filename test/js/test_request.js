Smoothy.test(function(t){
  var violet = Violet.init({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    access_token: access_token,
    access_token_secret: access_token_secret
  });

  var callback = function(){
    t.log('success');
  };

  var error = function(xhr){
    t.log(xhr.status);
  };

  var post_data = {
    status: 'mkr'
  };

  violet.request('statuses/update', post_data, callback, error);
});

