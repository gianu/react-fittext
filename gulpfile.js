var gulp = require('gulp');
var react = require('gulp-react');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');

gulp.task('build', function(callback) {
  return gulp.src(__dirname + '/src/*.js')
    .pipe(react({harmony: true}))
    .pipe(gulp.dest(__dirname + '/lib'));
});

gulp.task('copy-examples', function() {
  gulp.src([__dirname + '/client/scripts/index.js'])
      .pipe(gulp.dest(__dirname + '/public/assets/examples'));
});

gulp.task('copy-vendor', function() {
  gulp.src([__dirname + '/client/vendor/**/*'])
      .pipe(gulp.dest(__dirname + '/public/assets'));
});

gulp.task('webpack:build', function(callback) {
  var myConfig = Object.create(require('./client/webpack.config'));
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin()
  );

  webpack(myConfig, function(err, stats) {
    if (err) { throw new gutil.PluginError('webpack:build', err); }
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));

    callback();
  });
});

gulp.task('webpack:dev-server', function(callback) {
  var webpackConfig = require('./client/webpack.config');
  var compiler = webpack(webpackConfig);

  new WebpackDevServer(compiler, {
    contentBase: './public',
    inline: true,
    hot: true
  }).listen(8080, "localhost", function(err) {
    if (err) throw new gutil.PluginError("webpack:dev-server", err);

    gutil.log('[webpack:dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
  });
});

gulp.task('dev', function(callback) {
  runSequence('webpack:build', 'copy-vendor', 'copy-examples', 'webpack:dev-server', callback);
});
