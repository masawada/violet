// default method
Smoothy.test(function(t){
  var xhr = Violet.HTTPClient();

  t.assert('Violet.HTTPClient default method').equal(xhr.method, 'GET');
});

// setOAuthHeader
Smoothy.test(function(t){
  var xhr = Violet.HTTPClient({url: '', method: 'GET'});
  xhr.setOAuthHeader({oauth_signature: '123'});

  t.assert('Violet.HTTPClient setOAuthHeader').equal(xhr.authorization_header, 'OAuth oauth_signature="123"');
});

// postBody
Smoothy.test(function(t){
  var xhr = Violet.HTTPClient({uri: '', method: 'POST'});
  xhr.post_data = {
    message: "hello, world!"
  };

  t.assert('Violet.HTTPClient postBody').equal(xhr.postBody(),'message=hello%2C%20world%21');
});

// get method
Smoothy.test(function(t){
  var xhr = Violet.HTTPClient({
    uri: 'http://localhost:4567',
    method: 'GET'
  });

  xhr.onsuccess = function(res){
    t.assert('Violet.HTTPClient get').equal(res.responseText, 'hello, world');
  };

  xhr.onerror = function(){
    t.log('Violet.HTTPClient get error');
  };

  xhr.start();
});

// post method
Smoothy.test(function(t){
  var xhr = Violet.HTTPClient({
    uri: 'http://localhost:4567',
    method: 'POST'
  });

  xhr.onsuccess = function(res){
    t.assert('Violet.HTTPClient post').equal(res.responseText, 'hello');
  };

  xhr.onerror = function(){
    t.log('Violet.HTTPClient post error');
  };

  xhr.post_data = {
    message: 'hello'
  };

  xhr.start();
});

