var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var mocha = require('gulp-mocha');

var paths  = {
  scripts: ['src/*.js'],
  tests: ['test/*.js']
};

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('violet.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

gulp.task('test', function () {
  gulp.src(paths.tests, {read: false})
    .pipe(mocha());
});
