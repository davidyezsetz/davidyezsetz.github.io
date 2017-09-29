/*  eslint-disable no-console, no-param-reassign */
const gulp = require('gulp');
const p = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');
const csswring = require('csswring');
const browserSync = require('browser-sync').create();
const del = require('del');

const gulpsync = p.sync(gulp);
const basePaths = {
  src: './src',
  dist: './',
  node_modules: './node_modules',
};
const paths = {
  scripts: {
    src: `${basePaths.src}/scripts/`,
    watch: `${basePaths.src}/scripts/**/*.js`,
    find: `${basePaths.src}/scripts/**/[^_]*.js`,
    dist: `${basePaths.dist}/js`,
    vendor: `${basePaths.node_modules}/chart.js/dist/Chart.js`,
  },
  styles: {
    src: `${basePaths.src}/styles/`,
    watch: `${basePaths.src}/styles/**/*.scss`,
    find: `${basePaths.src}/styles/*.scss`,
    dist: `${basePaths.dist}/css`,
  },
  html: {
    watch: `${basePaths.dist}index.html`,
  },
};
const config = {
  plumber: {
    errorHandler: (e) => {
      console.error(e);
    },
  },
  babel: {
    presets: [
      ['env', {
        targets: {
          browsers: ['last 2 versions'],
        },
      }],
    ],
  },
  uglify: {
    compress: {
      drop_console: false,
    },
  },
  autoprefixer: {
    browsers: 'last 2 version',
  },
};
gulp.task('clean', () => del([`${basePaths.dist}/js/**/*`, `${basePaths.dist}/css/**/*`]));

gulp.task('eslint', () =>
  gulp
    .src(paths.scripts.find)
    .pipe(p.eslint({}))
    .pipe(p.eslint.format())
    .pipe(p.eslint.failAfterError()),
);
gulp.task('scripts', ['eslint'], () =>
  gulp
    .src([paths.scripts.vendor, paths.scripts.find])
    .pipe(p.plumber(config.plumber))
    .pipe(p.babel(config.babel))
    .pipe(p.concat('bundle.js'))
    .pipe(p.uglify(config.uglify))
    .pipe(gulp.dest(paths.scripts.dist)),
);
gulp.task('scriptsWatch', ['scripts'], () =>
  browserSync.reload(),
);
gulp.task('styles', () =>
  gulp
    .src(paths.styles.find)
    .pipe(p.plumber(config.plumber))
    .pipe(p.sourcemaps.init())
    .pipe(p.sass({
      includePaths: ['paths.styles.src', 'basePaths.node_modules'],
    }))
    .pipe(p.postcss([
      autoprefixer(config.autoprefixer),
      csswring,
    ]))
    .pipe(p.sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(browserSync.stream()),
);
gulp.task('serve', ['styles'], () => {
  browserSync.init({
    server: './',
  });

  gulp.watch(paths.scripts.watch, ['scriptsWatch']);
  gulp.watch(paths.styles.watch, ['styles']);
  gulp.watch(paths.html.watch).on('change', browserSync.reload);
});
gulp.task('prod', gulpsync.sync([
  'clean',
  ['styles', 'scripts'],
]));
gulp.task('default', ['prod']);
