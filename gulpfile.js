const gulp = require('gulp');

const browserify = require('browserify');
const browserSync = require('browser-sync').create();
const buff = require('vinyl-buffer');
const clean = require('gulp-clean');
const data = require('gulp-data');
const fs = require('fs');
const merge = require('gulp-merge-json');
const nunjucks = require('gulp-nunjucks-render');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const watchify = require('watchify');

/**
 * ES6 module support, Babel compilation.
 * @param {Boolean} watch call the function with or without the watch flag.
 */
function compile(watch) {
  var bundler = watchify(browserify('./source/scripts/app.js', {
    debug: true
  })
  .transform("babelify", {
    presets: ["es2015"]
  }));

  /**
   * Bundling operation.
   */
  function rebundle() {
    bundler.bundle()
      .on('error', function(err) {
        console.error(err);
        this.emit('end');
      })
      .pipe(source('app.js'))
      .pipe(buff())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./_build/scripts/'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

/**
 * Verbose method to call compile.
 * @return {function} Function call to compile.
 */
function watch() {
  return compile(true);
}

/**
 * Merges all data into a single json file for template use.
 */
gulp.task('data', function() {
  return gulp.src('source/data/**/*.json')
    .pipe(merge('.generated_data'))
    .pipe(gulp.dest('source/data/'));
});

gulp.task('build', function() {
  return compile();
});

gulp.task('js-watch', function() {
  return watch();
});

// Static server
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./_build"
    }
  });
});

// Sass to CSS compilation
gulp.task('sass', function() {
  return gulp.src("source/styles/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("_build/styles"))
    .pipe(browserSync.stream());
});

// Templates compilation
gulp.task('templates', ['data'], function() {
  return gulp.src('source/pages/*.tpl')
    .pipe(data((f) => {
      const file = fs.readFileSync('source/data/.generated_data');
      return JSON.parse(file);
    }))
    .pipe(nunjucks({
      path: ['source/templates']
    }))
    .pipe(gulp.dest('_build'));
});

gulp.task('copy', ['clean'], function() {
  return gulp.src(['source/assets/**/*'], {
    base: 'source'
  }).pipe(gulp.dest('_build'));
});

gulp.task('clean', function() {
  return gulp.src('_build/assets', {read: false})
      .pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch('source/styles/**/*.scss', ['sass']);
  gulp.watch([
    'source/pages/**/*.tpl',
    'source/templates/**/*.tpl'], ['templates']);
  gulp.watch([
    '_build/**/*.{html,js}'])
    .on('change', browserSync.reload);
  gulp.watch('source/assets/**', ['copy']);
});

gulp.task('default', [
  'sass',
  'templates',
  'copy',
  'serve',
  'watch',
  'js-watch'
]);
