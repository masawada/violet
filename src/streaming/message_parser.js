//
// Violet.Streaming.MessageParser
//

(function(Violet) {
  var MessageParser = function(accounts){
    this.accounts = accounts;
  };

  MessageParser.prototype = {
    parse: function(accountId, data) {
      if (data.id) {
        return {
          type: 'tweet',
          data: new Violet.Tweet(data, this.accounts, accountId)
        };
      } else if(data.event) {
        return {
          type: 'event',
          data: Violet.Streaming.Event(data, this.accounts, accountId)
        };
      } else if (data.delete && data.delete.status) {
        return {
          type: 'delete',
          data: data.delete.status
        };
      } else {
        return {};
      }
    }
  };

  Violet.Streaming.MessageParser = MessageParser;
})(Violet);
