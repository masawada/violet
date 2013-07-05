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

