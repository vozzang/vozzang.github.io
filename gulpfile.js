const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const DIR = {
    SRC: './src',
    DEST: './dist'
};
const SRC = {
  JS: `${DIR.SRC}/assets/js/**/*.*`,
  SCSS: `${DIR.SRC}/assets/scss/**/*.scss`,
  IMG: `${DIR.SRC}/assets/img/**/*.*`
};

function clean() {
  return del(['dist']);
}

function css() {
  return gulp.src(SRC.SCSS)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(`${DIR.DEST}/assets/css/`));
}

function copyImg() {
  return gulp.src(SRC.IMG)
  .pipe(gulp.dest(`${DIR.DEST}/assets/img`));
}

function copyJs() {
  return gulp.src([
    SRC.JS
  ])
  .pipe(gulp.dest(`${DIR.DEST}/assets/js`));
}

function copyJsVendor() {
  return gulp.src([
    // JS 3rd party here
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/slick-carousel/slick/slick.min.js',
    './node_modules/perfect-scrollbar/dist/perfect-scrollbar.min.js'
  ], {allowEmpty:true})
  .pipe(gulp.dest(`${DIR.DEST}/assets/js/vendor`));
}

function copyImg() {
  return gulp.src(SRC.IMG)
  .pipe(gulp.dest(`${DIR.DEST}/assets/img`));
}

function watch() {
  gulp.watch(SRC.SCSS, css).on('change', reload);
  gulp.watch(SRC.JS, copyJs).on('change', reload);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  watch();
}

const build = gulp.series(clean, gulp.parallel(
  css, copyJs, copyImg
));

exports.clean = clean;
exports.css = css;
exports.copyJs = copyJs;
exports.copyJsVendor = copyJsVendor;
exports.copyImg = copyImg;
exports.watch = watch;
exports.build = build;
exports.serve = serve;
exports.default = build;