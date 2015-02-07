//
// Violet.REST.Favorites
//

(function(Violet) {
  var Application = {
    'rateLimitStatus': {
      method: 'GET',
      path: 'application/rate_limit_status',
      responseProc: function(response) {
        return [response];
      }
    },
  };
  Violet.REST.Application = Application;
})(Violet);
