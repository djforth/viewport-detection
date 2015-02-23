var browserify   = require('browserify');
var coffeeify     = require('coffeeify')
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var source       = require('vinyl-source-stream');
var uglifyify    = require('uglifyify');
var watchify     = require('watchify');

var vendor     = require("./config/externals.js")

var destFolder = './dist';
var sourceFile = './lib/viewport_detector.coffee'

function bundleShare(b, destFile) {
  b.bundle()
   .on('error', function(err){
      console.log(err.message);
      this.end();
    })
   .pipe(source(destFile))
   .pipe(gulp.dest(destFolder));
}

gulp.task("app", function () {

  var bundle = browserify({entries: [sourceFile],extensions: ['.js', '.coffee'], debug:false});

  vendor.externals.forEach(function(ext){
    bundle.external(ext.expose)
  })

  bundle.transform(coffeeify)
  bundle.transform(uglifyify)

  return bundleShare(bundle, "viewport_detector.min.js")
});


gulp.task('app:watch', function() {
  var b = browserify({entries: [sourceFile],extensions: ['.js', '.coffee'], debug:true, cache: {}, packageCache: {}, fullPaths: true});

  vendor.externals.forEach(function(ext){
    b.external(ext.expose)
  })
  b.transform(coffeeify)
  b.on('error', gutil.log);
  b = watchify(b);
  b.on('update', function(){
    bundleShare(b, "viewport_detector.js");
  });

  return bundleShare(b, "viewport_detector.js");
})
