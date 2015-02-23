var gulp       = require('gulp')
var stripDebug = require('gulp-strip-debug');

gulp.task('console_strip', function () {
  return gulp.src('./dist/*.js')
        .pipe(stripDebug())
        .pipe(gulp.dest('./dist'));
});

gulp.task('console_strip_npm', function () {
  return gulp.src('./index.js')
        .pipe(stripDebug())
        .pipe(gulp.dest('./'));
});