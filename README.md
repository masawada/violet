# Violet.js - A Twitter Library for FirefoxOS

## Installation
load `sha1.js` and `violet.js` or `violet.min.js`.

## Usage
### Obtain AuthorizeURI and AccessToken
    var violet = Violet.init({
      consumer_key: 'consumer_key',
      consumer_secret: 'consumer_secret'
    });
    
    var uri_callback = function(uri_string){};
    var uri_error = function(){};
    
    violet.oauth.obtainAuthorizeURI(uri_callback, uri_error);
    
    // pin = input
    
    var uri_callback = function(tokens){
      console.log(tokens.oauth_token); // access_token
      console.log(tokens.oauth_token_secret); // access_token_secret
      console.log(tokens.user_id);
      console.log(tokens.screen_name);
    };
    var uri_error = function(){};
    
    violet.oauth.obtainAccessToken(pin, token_callback, token_error);

### Post Status
    var violet = Violet.init({
      consumer_key: 'consumer_key',
      consumer_secret: 'consumer_secret'
      access_token: 'access_token',
      access_token_secret: 'access_token_secret'
    });
    
    var callback = function(xhr){};
    var error = function(xhr){};
    
    var post_data = {
      status: 'hello, world'
    };
    
    violet.request('statuses/update', post_data, callback, error);

### Get home_timeline
    var violet = Violet.init({
      consumer_key: 'consumer_key',
      consumer_secret: 'consumer_secret'
      access_token: 'access_token',
      access_token_secret: 'access_token_secret'
    });
    
    var callback = function(xhr){};
    var error = function(xhr){};
    
    var get_data = {
      count: 5
    };
    
    violet.request('statuses/home_timeline', get_data, callback, error);

### Get a tweet
    var violet = Violet.init({
      consumer_key: 'consumer_key',
      consumer_secret: 'consumer_secret'
      access_token: 'access_token',
      access_token_secret: 'access_token_secret'
    });
    
    var callback = function(xhr){};
    var error = function(xhr){};
    
    var get_data = {
      id: 210462857140252672
    };
    
    violet.request('statuses/show/:id', get_data, callback, error);

### Streaming API (GET user only)
    var violet = Violet.init({
      consumer_key: 'consumer_key',
      consumer_secret: 'consumer_secret'
      access_token: 'access_token',
      access_token_secret: 'access_token_secret'
    });
    
    var callback = function(tweet_json){
      // output tweet_json
    };
    
    var error = function(xhr){};
    
    violet.streaming.start(callback, error); // start streaming
    violet.streaming.stop(); // stop streaming

## License
### Violet.js
The MIT License (MIT)

Copyright (c) 2013 Masayoshi Wada <developer@andantesoftware.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

### jsSHA 
`sha1.js` is distributed under the new BSD License. It can be found at [GitHub](https://github.com/Caligatio/jsSHA).

Copyright (c) 2008-2013, Brian Turek
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.
 * The names of the contributors may not be used to endorse or promote products
   derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
ANDANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIEDWARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED.IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT,INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING,BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE,DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OFLIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCEOR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISEDOF THE POSSIBILITY OF SUCH DAMAGE.
