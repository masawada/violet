//
// Violet.REST.Request
//

/*

// usage

var tweet = Request('GET', 'statuses/update', function(response) {
  return new Violet.Tweet(response);
}, accounts);

tweet.on('success', function(tweetObj) {
  console.log(tweetObj);
});
tweet.on('error', function(errObj) {
  console.log(errObj);
});

tweet({text: 'hogehoge'});

*/

(function(Violet) {
  var Util = Violet.Util;
  var HTTPClient = Violet.HTTPClient;
  var apiBaseURI = 'https://api.twitter.com/1.1/';

  var RESTRequest = function(method, endpoint, responseProc, accounts) {
    var reqThis = {callback: function(){}, errorback: function(){}};
    var reqFunction =  function(data, accountId) {
      accountId = accountId || accounts.getPrimary().accountId;
      var path = Util.resolveEndpoint(endpoint, data);
      var uri = apiBaseURI + path + '.json';

      var oauth = accounts.getOAuthManager(accountId);
      var conn = new HTTPClient({
        method: method,
        uri: uri,
        data: data
      });

      conn.setOAuthHeader(oauth.obtainOAuthParams(conn));
      conn.addEventListener('load', function(xhr) {
        var response = [JSON.parse(xhr.responseText)];
        if (typeof responseProc === 'function') {
          response = responseProc.apply(null, response);
        }
        this.callback.apply(null, response);
      }.bind(this));
      conn.addEventListener('error', function(xhr) {
        this.errorback.apply(null, [accountId, JSON.parse(xhr.responseText)]);
      }.bind(this));

      conn.start();
    }.bind(reqThis);

    reqFunction.on = function(event, callback) {
      if (event === 'success') {
        this.callback = callback;
      } else if (event === 'error') {
        this.errorback = callback;
      }
    }.bind(reqThis);

    return reqFunction;
  };

  Violet.RESTRequest = RESTRequest;
})(Violet);
