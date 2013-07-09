// request.js

Violet.Request = {};

Violet.Request.request = function(endpoint, raw_query, callback, error){
  var info = Violet.Request.generateRequestInfo(endpoint, raw_query);

  var method = info.method;
  var uri = info.uri;
  var query = info.query;
  var get_data = info.get_data;

  if(method === null){ return false; }

  var con = Violet.HTTPClient({
    method: method,
    uri: uri + get_data
  });
  
  con.setOAuthHeader(this.oauth.obtainOAuthParams(method, uri, query));

  con.onsuccess = callback;
  con.onerror = error;

  if(method === 'POST'){
    con.post_data = query;
  }

  con.start();
};

Violet.Request.generateRequestInfo = function(endpoint, query){
  var method = Violet.Endpoints.method(endpoint);
  var get_data = '';

  if(Violet.Endpoints.to_replace_id_none.indexOf(endpoint) !== -1){
    endpoint = endpoint.replace(/\/\:id$/, '');
  }else if(Violet.Endpoints.to_replace_id.indexOf(endpoint) !== -1){
    endpoint.replace(':id', query.id);
    delete query.id;
  }else if(Violet.Endpoints.to_replace_slug.indexOf(endpoint) !== -1){
    endpoint.replace(':slug', query.slug);
    delete query.slug;
  }else if(Violet.Endpoints.to_replace_place_id.indexOf(endpoint) !== -1){
    endpoint.replace(':place_id', query.place_id);
    delete query.place_id;
  }

  if(method === 'GET' && Violet.Util.hashLength(query) > 0){
    var key = '',
        get_array = [];

    for(key in query){
      if(query.hasOwnProperty(key)){
        get_array.push(key+'='+Violet.Util.uri_encode(query[key]));
      }
    }

    get_data = '?' + get_array.join('&');
  }

  return {
    method: method,
    uri: 'https://api.twitter.com/1.1/' + endpoint + '.json',
    query: query,
    get_data: get_data
  };
};

