'use strict';

describe('oauth', function() {
  it('connect server', function(done) {
    var xhr = new XMLHttpRequest({mozSystem: true});
    xhr.open('GET', 'https://twitter.com');
    xhr.addEventListener('load', function() {
      chai.expect(this.status).to.equal(200);
      done();
    });
    xhr.addEventListener('error', function() {
      done(new Error('can\'t connect server'));
    });
    xhr.send();
  });
  it('request access token', function(done) {
    var oauth = new Violet.OAuth({
      consumerKey: '',
      consumerSecret: ''
    });
    oauth.requestToken().then(function(res) {
      console.log(res);
    });
  });
});
