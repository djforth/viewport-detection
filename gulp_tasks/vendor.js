
var browserify   = require('browserify');
var coffeeify    = require('coffeeify');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var source       = require('vinyl-source-stream');
var uglifyify    = require('uglifyify');

var vendor     = require("./config/externals.js")
var destFolder = './lib';
var destFile   = "vendors.js"
var sourceFile = './lib/temps.js'
var testFolder = './spec/lib/';
// Vendor set up
gulp.task("vendor", function () {
  var b = browserify()

  vendor.externals.forEach(function(ext){
    b.require(ext.path, {expose:ext.expose})
  })

  b.transform(uglifyify)

  b.on('error', gutil.log);

  return b.bundle()
    .pipe(source(destFile))
    .pipe(gulp.dest(destFolder));
});

gulp.task("vendor:test", function () {
  var b = browserify()

  vendor.externals.forEach(function(ext){
    b.external(ext.expose)
  })

  vendor.externalsTest.forEach(function(ext){
    b.require(ext.path, {expose:ext.expose})
  })


  b.on('error', gutil.log);

  return b.bundle()
    .pipe(source("lib.js"))
    .pipe(gulp.dest(testFolder));
});