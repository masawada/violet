(function() {
  'use strict';

  describe('Util', function() {
    describe('URIEncode', function(){
      it('is NOT same as encodeURIComponent', function() {
        var raw_str = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

        var encodeURIComponentStr = encodeURIComponent(raw_str);
        var uriEncodeStr = Violet.Util.URIEncode(raw_str);
        chai.expect(uriEncodeStr).not.to.equal(encodeURIComponentStr);
      });
      it('adhere to RFC 3986', function() {
        // RFC 3986: http://tools.ietf.org/html/rfc3986
        var raw_str = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
        var expect_str = '%21%22%23%24%25%26%27%28%29%2A%2B%2C-.%2F0123456789%3A%3B%3C%3D%3E%3F%40ABCDEFGHIJKLMNOPQRSTUVWXYZ%5B%5C%5D%5E_%60abcdefghijklmnopqrstuvwxyz%7B%7C%7D~';
        var str = Violet.Util.URIEncode(raw_str);
        chai.expect(str).to.equal(expect_str);
      });
    });

    it('mergeMaps', function() {
      var merged = Violet.Util.mergeMaps({a: '1', b: '2'}, {d: '4'}, {c: '3'});
      chai.expect(merged).to.deep.equal({a: '1', b: '2', c: '3', d: '4'});
    });
    it('resolveEndpoint', function() {
      var endpoint = '/statuses/show/:id';
      var params = {id: "hoge"};
      var expect_str = "/statuses/show/hoge";
      var resolved = Violet.Util.resolveEndpoint(endpoint, params);
      chai.expect(resolved).to.equal(expect_str);
    });
  });
})();
