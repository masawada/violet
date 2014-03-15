// publicstream.js

Violet.PublicStream = function(oauth){
  var streaming = Violet.Streaming(oauth);
  streaming.base_uri = 'https://userstream.twitter.com/1.1/';
  streaming.endpoint = 'statuses/sample';

  return streaming;
};

