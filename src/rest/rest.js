//
// Violet.REST
//

(function(Violet) {
  var Util = Violet.Util;
  var Request = Violet.RESTRequest;
  var REST = function(accounts) {
    this._accounts = accounts;

    // register methods
    this._registerMethods('statuses', Violet.REST.Statuses);
    this._registerMethods('favorites', Violet.REST.Favorites);
  };

  REST.prototype = {
    _registerMethods: function(category, endpoints) {
      var methods = {};

      for (var label in endpoints) {
        if (endpoints.hasOwnProperty(label)) {
          var endpoint = endpoints[label];
          methods[label] = Request(
            endpoint.method,
            endpoint.path,
            endpoint.responseProc,
            this._accounts
          );
        }
      }

      this[category] = methods;
    }
  };

  Violet.REST = REST;
})(Violet);
