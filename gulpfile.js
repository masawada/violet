var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var paths  = {
  scripts: ['src/*.js'],
};

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('violet.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});
