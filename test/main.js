'use strict';

mocha.setup('bdd');
require([
  'spec/oauth'
], function() {
  mocha.run();
});
