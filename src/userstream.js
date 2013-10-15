// userstream.js

Violet.UserStream = function(oauth){
  var streaming = Violet.Streaming(oauth);
  streaming.base_uri = 'https://userstream.twitter.com/1.1/';
  streaming.endpoint = 'user';

  return streaming;
};

