//
// Violet.Streaming.Event
//

(function(Violet) {
  var Event = function(data, accounts, accountId) {
    var type = data.event;
    var source = new Violet.User(data, accounts, accountId);
    var target = new Violet.User(data, accounts, accountId);
    var targetObject = new Violet.Tweet(data, accounts, accountId);

    return {
      type: type,
      source: source,
      target: target,
      targetObject: targetObject
    };
  };

  Violet.Streaming.Event = Event;
})(Violet);
