// ## Globals
var autoprefixer = require('gulp-autoprefixer');
// var browserSync  = require('browser-sync').create();
var concat       = require('gulp-concat');
var gulp         = require('gulp');
var imagemin     = require('gulp-imagemin');
var jshint       = require('gulp-jshint');
var livereload   = require('gulp-livereload');
var minifyCss    = require('gulp-minify-css');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');
var plumber      = require('gulp-plumber');

var path = {
  allScreensJs : ["assets/scripts/contrib/*.js", "assets/scripts/main.js"],
  largeScreensJs : ["assets/scripts/contrib-large-screen/*.js", "assets/scripts/large-screen.js"],
  scss : "assets/styles/main.scss"
};


///////////////////////////////////////
// CSS
///////////////////////////////////////

gulp.task('css', function() {
  return gulp.src(path.scss)
    .pipe(plumber(function (error) {
      console.log(error.toString());
      this.emit('end');
    }))
    .pipe( sourcemaps.init() )
    .pipe( 
      sass({
        outputStyle: 'nested', // libsass doesn't support expanded yet
        precision: 10,
        includePaths: ['.'],
      })
    )
    .pipe( 
      autoprefixer({
        browsers: [
          'last 2 versions',
          'android 4',
          'opera 12'
        ]
      })
    )
    .pipe(
      minifyCss({
        advanced: false,
        rebase: false
      })
    )
    .pipe( 
      sourcemaps.write('.', {
        sourceRoot: 'assets/styles/'
      })
    )
    .pipe( gulp.dest('dist/styles') )
    .pipe( livereload() );
});




///////////////////////////////////////
// JS
///////////////////////////////////////

// JSHint
// `gulp jshint` - Lints configuration JSON and project JS.
gulp.task('jshint', function() {
  return gulp.src([
      // only lint custom code, nothing from contrib
      'bower.json', 'gulpfile.js', "assets/scripts/main.js", "assets/scripts/large-screen.js"
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe( jshint.reporter('fail') );
});


gulp.task('js:all', ['jshint'], function() {
  return gulp.src(path.allScreensJs)
    .pipe( concat('main.js') )
    .pipe(gulp.dest('dist/scripts'))
    // Normal done, time to create the minified javascript (main.min.js)
    // remove the following 3 lines if you don't want it
    // .pipe( uglify() )
    // .pipe( rename( { suffix: '.min' } ) )
    // .pipe( gulp.dest( 'dist/scripts' ) )
    .pipe( livereload() );
});


gulp.task('js:large', function() {
  return gulp.src(path.largeScreensJs)
    .pipe( concat('large-screen.js') )
    .pipe(gulp.dest('dist/scripts'))
    // Normal done, time to create the minified javascript (large-screen.min.js)
    // remove the following 3 lines if you don't want it
    // .pipe( uglify() )
    // .pipe( rename( { suffix: '.min' } ) )
    // .pipe( gulp.dest( 'dist/scripts' ) )
    .pipe( livereload() );
});


gulp.task('js', ['js:all', 'js:large']);




///////////////////////////////////////
// IMAGES
///////////////////////////////////////
// `gulp images` - Run lossless compression on all the images.
gulp.task('images', function() {
  return gulp.src('assets/images/**/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeUnknownsAndDefaults: false}, {cleanupIDs: false}]
    }))
    .pipe(gulp.dest('dist/images'))
    .pipe( livereload() );
});



// ### Clean
// `gulp clean` - Deletes the build folder entirely.
gulp.task('clean', require('del').bind(null, ["dist"]));



// ### Watch
// `gulp watch` - Use BrowserSync to proxy your dev server and synchronize code
// changes across devices. Specify the hostname of your dev server at
// `manifest.config.devUrl`. When a modification is made to an asset, run the
// build step for that asset and inject the changes into the page.
// See: http://www.browsersync.io
gulp.task('watch', function() {
  livereload.listen();
  // browserSync.init({
  //   files: ['{lib,templates}/**/*.php', '*.php'],
  //   proxy: config.devUrl,
  //   snippetOptions: {
  //     whitelist: ['/wp-admin/admin-ajax.php'],
  //     blacklist: ['/wp-admin/**']
  //   }
  // });
  gulp.watch(['assets/styles/**/*'], ['css']).on( 'change', function( file ) {
    livereload.changed( file );
  });
  gulp.watch(['assets/scripts/**/*'], ['jshint', 'js']).on( 'change', function( file ) {
    livereload.changed( file );
  });
  gulp.watch(['assets/images/**/*'], ['images']).on( 'change', function( file ) {
    livereload.changed( file );
  });
  gulp.watch(['bower.json', 'assets/manifest.json'], ['build']).on( 'change', function( file ) {
    livereload.changed( file );
  });
});



gulp.task('build', ['js','css', 'images']);

// `gulp` - Run a complete build. To compile for production run `gulp --production`.
gulp.task('default', ['clean'], function() {
  gulp.start('build');
});