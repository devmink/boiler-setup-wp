var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// styles
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// js
var uglify = require('gulp-uglify');
var pump = require('pump');
var webpack = require('webpack');
var gulpWebpack = require('gulp-webpack');
// var babel = require('gulp-babel');
// var source = require('vinyl-source-stream');
// var globby = require('globby');
// var browserify = require('browserify');
// var babelify = require('babelify');
var named = require('vinyl-named');
// var gulpif = require('gulp-if');
// var tap = require('gulp-tap');
var path = require('path');
// var through = require('through2');
// var sourcemaps = require('gulp-sourcemaps');

gulp.task('serve', ['sass', 'js'], function() {
  browserSync.init({
    // proxy is whatever your php server is
    proxy: 'localhost',
    port: 80,
    browser: 'chrome'
  });

  // watch these folders and run the task if they change
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch('js/**/*.js', ['js']);

  // watch this folder and reload the browser if anything changes
  gulp.watch(['../**/*.*', '!../_src/**/*.*']).on('change', browserSync.reload);
});

gulp.task('js', function(cb) {
  return gulp
    .src('js/app.js')
    .pipe(named())
    .pipe(gulpWebpack(require('./webpack.config.js'), webpack))
    .pipe(gulp.dest('../js'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp
    .src('./scss/style.scss')
    .pipe(
      sass({
        outputStyle: 'compress',
        includePaths: ['_src/scss', 'node_modules']
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        // browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'],
        // cascade: true
      })
    )
    .pipe(gulp.dest('../'));
});

gulp.task('default', ['serve']);