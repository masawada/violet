//
// Violet.Streaming.Event
//

(function(Violet) {
  var Event = function(data, accounts, accountId) {
    var eventName = data.event;
    var source = new Violet.User(data, accounts, accountId);
    var target = new Violet.User(data, accounts, accountId);
    var targetObject = new Violet.Tweet(data, accounts, accountId);

    return {
      type: eventName,
      source: source,
      target: target,
      targetObject: targetObject
    };
  };

  Violet.Streaming.Event = Event;
})(Violet);
