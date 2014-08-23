'use strict';

describe('oauth', function() {
  it('サーバに接続する', function(done) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://twitter.com');
    xhr.addEventListener('load', function() {
      expect(this.status).to.equal(200);
      done();
    });
    xhr.addEventListener('error', function() {
      done(new Error('サーバーに接続できませんでした'));
    });
    xhr.send();
  });
});
