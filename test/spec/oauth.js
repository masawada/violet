(function() {
  'use strict';
  var oauth;

  describe('OAuth', function() {
    beforeEach(function(done) {
      oauth = new Violet.OAuth({
        consumerKey: '',
        consumerSecret: ''
      });
      done();
    });
    it('initializing', function() {
      chai.expect(oauth).to.be.ok;
    });
    it('_generateNonce', function() {
      var nonce = oauth._generateNonce(64);
      chai.expect(nonce).to.match(/[A-Za-z0-9]{64}/);
    });
  });
})();
