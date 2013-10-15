// filterstream.js

Violet.FilterStream = function(oauth){
  var streaming = Violet.Streaming(oauth);
  streaming.base_uri = 'https://stream.twitter.com/1.1/';
  streaming.endpoint = 'statuses/filter';

  return streaming;
};

