var gulp   = require("gulp");
var coffee = require("gulp-coffee");
var gutil  = require('gulp-util');
var rename = require("gulp-rename");

gulp.task("npm_build", function () {
  return gulp.src("lib/cookiebar.coffee")
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(rename("index.js"))
    .pipe(gulp.dest("./"));
});