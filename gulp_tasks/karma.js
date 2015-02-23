var gulp         = require('gulp');
var gutil        = require('gulp-util');
var karma        = require('gulp-karma');

var testFiles = [
  'spec/manage_cookies_spec.coffee'
];

var karma_config = "./gulp_tasks/karma.conf.js"

// <<<<<<<<<<<<<< Karma tasks >>>>>>>>>>>>>

gulp.task('karma', function() {
  gulp.src(testFiles)
    .pipe(karma({
      configFile: karma_config,
      action: 'watch',
      browsers: ['PhantomJS']
    }));
});

gulp.task('karma:all', function() {
  gulp.src(testFiles)
    .pipe(karma({
      configFile: karma_config,
      action: 'run'
    }));
});

gulp.task('karma:mac', function() {
  gulp.src(testFiles)
    .pipe(karma({
      configFile: karma_config,
      action: 'run',
      browsers: ['Chrome', 'Firefox', 'Safari', 'Opera'],
    }));
});

// Not currently workingon Mavericks os
// gulp.task('karma:iOS', function() {
//   gulp.src(testFiles)
//     .pipe(karma({
//       configFile: karma_config,
//       action: 'run',
//       browsers: ['iOS'],
//     }));
// });

gulp.task('karma:ie9', function() {
  gulp.src(testFiles)
    .pipe(karma({
      configFile: karma_config,
      action: 'run',
      browsers:['IE9 - Win7'],
    }));
});

gulp.task('karma:ie10', function() {
  gulp.src(testFiles)
    .pipe(karma({
      configFile: karma_config,
      action: 'run',
      browsers:['IE10 - Win7'],
    }));
});

gulp.task('karma:ie11', function() {
  gulp.src(testFiles)
    .pipe(karma({
      configFile: karma_config,
      action: 'run',
      browsers:['IE11 - Win7'],
    }));
});
