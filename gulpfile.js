var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var paths  = {
  scripts: [
    'src/main.js',
    'src/util.js',
    'src/http.js',
    'src/oauth.js',
    'src/accounts.js',
    'src/rest.js',
    'src/tweet.js',
    'src/user.js',
    'src/streaming/streaming.js',
    'src/streaming/message_parser.js',
    'src/streaming/events.js',
    'src/rest/request.js',
    'src/rest/rest.js',
    'src/rest/statuses.js',
    'src/rest/favorites.js',
    'src/rest/media.js',
    'src/vendor/crypto-js/src/core.js',
    'src/vendor/crypto-js/src/sha1.js',
    'src/vendor/crypto-js/src/hmac.js',
    'src/vendor/crypto-js/src/enc-base64.js'
  ],
};

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('violet.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});
