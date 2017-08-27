/*  eslint-disable no-console, no-param-reassign*/
const gulp = require('gulp');
const p = require('gulp-load-plugins')();
const gulpsync = p.sync(gulp);
const autoprefixer = require('autoprefixer');
const csswring = require('csswring');
const browserSync = require('browser-sync').create();
const del = require('del');
const opn = require('opn');
const basePaths = {
  src: './src',
  dist: './',
};
const paths = {
  scripts: {
    src: `${basePaths.src}/scripts/`,
    watch: `${basePaths.src}/scripts/**/*.js`,
    find: `${basePaths.src}/scripts/**/[^_]*.js`,
    dist: `${basePaths.dist}/js`,
  },
  styles: {
    watch: `${basePaths.src}/styles/**/*.scss`,
    find: `${basePaths.src}/styles/*.scss`,
    dist: `${basePaths.dist}/css`,
  },
  browserUrl: 'http://192.0.0.1:8080',
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
  browserSync: {
    open: false,
    port: 9011,
    server: { baseDir: basePaths.dist },
    files: `${basePaths.dist}/**/*`,
  },
};
gulp.task('clean', () => del([`${basePaths.dist}/js/**/*`, `${basePaths.dist}/css/**/*`]));

gulp.task('eslint', () =>
  gulp
    .src(paths.scripts.find)
    .pipe(p.eslint({}))
    .pipe(p.eslint.format())
    .pipe(p.eslint.failAfterError())
);
gulp.task('scripts', ['eslint'], () =>
  gulp
    .src(paths.scripts.find)
    .pipe(p.plumber(config.plumber))
    .pipe(p.babel(config.babel))
    .pipe(p.concat('bundle.js'))
    .pipe(p.uglify(config.uglify))
    .pipe(gulp.dest(paths.scripts.dist))
);
gulp.task('styles', () =>
  gulp
    .src(paths.styles.find)
    .pipe(p.plumber(config.plumber))
    .pipe(p.sass())
    .pipe(p.postcss([
      autoprefixer(config.autoprefixer),
      csswring,
    ]))
    .pipe(gulp.dest(paths.styles.dist))
);
gulp.task('watch', () => {
  p.watch(paths.scripts.watch, () => gulp.start(gulpsync.sync([
    'scripts',
  ])));
  p.watch(paths.styles.watch, () => gulp.start('styles'));
});
gulp.task('browser-sync', () =>
  browserSync.init(config.browserSync,
  (err) => {
    if (!err) {
      opn(paths.browserUrl);
    }
  })
);
gulp.task('dev-watch', gulpsync.sync([
  'clean',
  ['scripts', 'styles'],
  ['watch', 'browser-sync'],
]));

gulp.task('prod', gulpsync.sync([
  'clean',
  ['styles', 'scripts'],
]));

gulp.task('default', ['prod']);
