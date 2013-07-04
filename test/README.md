# Smoothy.js - A (Cheap) Testing Framework on Firefox OS

## Installing
* clone this repository into your project.
  * `cd /path/to/project && clone https://github.com/masawada/smoothy.git`
* on Firefox OS Simulator, click 'Add Directory' and select `smoothy/manifest.webapp`

## Usage
* edit `js/test.js`
* assertion methods are in `lib/assertions.js`
  * equal(arg1, arg2) // check ===
  * nan(arg) // check nan
  * type(arg, type) // check type
  * nil(arg) // check null

## Adding Assertion Methods
Edit `lib/assertions.js`. To combine and minify source files, You can use [Google Closure Compiler](https://developers.google.com/closure/compiler/). Place `compiler.jar` in `/usr/bin/` and execute `make` in `/path/to/project/smoothy/lib`.

## License
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
