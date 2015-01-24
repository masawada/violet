//
// Violet.Streaming.Event
//

(function(Violet) {
  var listEvents = ['list_created', 'list_destroyed', 'list_updated', 'list_member_added', 'list_member_removed', 'list_user_subscribed', 'list_user_unsubscribed'];
  var tweetEvents = ['favorite', 'unfavorite'];

  var Event = function(data, accounts, accountId) {
    var type = data.event;
    var source = new Violet.User(data.source, accounts, accountId);
    var target = new Violet.User(data.target, accounts, accountId);

    var targetObject = null;
    if (listEvents.indexOf(type) !== -1) {
      targetObject = null;
    } else if (tweetEvents.indexOf(type) !== -1) {
      targetObject = new Violet.Tweet(data.target_object, accounts, accountId);
    }

    return {
      type: type,
      source: source,
      target: target,
      targetObject: targetObject
    };
  };

  Violet.Streaming.Event = Event;
})(Violet);
