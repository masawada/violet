'use strict';

mocha.setup('bdd');
require([
  'src/vendor/crypto-js/src/core.js',
  'src/vendor/crypto-js/src/hmac.js',
  'src/vendor/crypto-js/src/sha1.js',
  'src/main.js',
  'src/util.js',
  'src/http.js',
  'src/oauth.js',
  'src/tweet.js',
  'src/rest.js',
  'src/streaming.js',
  'spec/oauth'
], function() {
  mocha.run();
});
