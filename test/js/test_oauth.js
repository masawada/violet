// generateNonce
Smoothy.test(function(t){
  // dummy key and secret
  var oauth = Violet.OAuth({
    consumer_key: 'faZjhlbt07YV6Bxfowij5',
    consumer_secret: 'g30SgfnprEGCi83rQaCQkTGDWtPHO1gL223fBymmHc'
  });

  var nonce = oauth.generateNonce(62);
  t.assert('Violet.OAuth generateNonce type').type(nonce, 'string');
  t.assert('Violet.OAuth generateNonce length').equal(nonce.length, 62);
});

// mergeHash
Smoothy.test(function(t){
  var hash = Violet.Util.mergeHash({key1: 'hello1'}, {key2: 'hello2'});
  t.assert('Violet.Util.mergeHash key1').equal(hash.key1, 'hello1');
  t.assert('Violet.Util.mergeHash key2').equal(hash.key2, 'hello2');
});

// generateSignature
Smoothy.test(function(t){
  var oauth = Violet.OAuth({
    consumer_key: 'faZjhlbt07YV6Bxfowij5',
    consumer_secret: 'g30SgfnprEGCi83rQaCQkTGDWtPHO1gL223fBymmHc',
    access_token: '26493028-vtgzFd57tFpxdjN84Tt5NeQop8qhVk7oU0DPpF7ze',
    access_token_secret: 'KYtHoAWwkUCGKCQlFNwrnGtk4bLthLLagxDhYsXg8'
  });

  var params = {
    oauth_consumer_key: oauth.consumer_key, 
    oauth_nonce: "oMwAVwdJ0sYFx7d8PFZwQguk3EVsqnuD",
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: "1372563889",
    oauth_token: "26493028-vtgzFd57tFpxdjN84Tt5NeQop8qhVk7oU0DPpF7ze",
    oauth_version: "1.0"
  };
  var signature = oauth.generateSignature('GET', 'https://api.twitter.com/1.1/statuses/home_timeline.json', params, oauth.access_token_secret);

  t.assert('Violet.OAuth generateSignature').equal(signature,'SI2ZcZZ31ndiLOq0PJM9lEmpV30%3D');
});

