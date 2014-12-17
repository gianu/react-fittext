"use strict";
var Path = require("path"),
    webpack = require("webpack"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    webpackConfig,

    IS_PRODUCTION = "production" === process.env.NODE_ENV,
    JSX_WITH_HOT_LOEADERS = ["react-hot-loader", "jsx-loader?harmony"],
    CSS_LOADER = "style-loader!css-loader?root=../",
    // SCSS_LOADER = "style-loader!css-loader?root=../!sass-loader?includePaths[]=" +
    //     Path.resolve(__dirname, "../bower_components/bootstrap-sass-official/assets/stylesheets");

webpackConfig = module.exports = {
  entry: "./client/scripts/index.js",
  output: {
    path: Path.resolve(__dirname, "../public/assets"),
    publicPath: "assets/",
    filename: (IS_PRODUCTION ? "[hash].js" : "bundle.js")
  },
  module: {
    loaders: [
      { test: require.resolve("react/addons"), loader: "expose-loader?React" },
      { test: /\.js(x?)$/, loaders: JSX_WITH_HOT_LOEADERS },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.css$/, loader: CSS_LOADER },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
      // { test: /\.scss$/, loader: SCSS_LOADER },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html",
      filename: "../index.html"
    })
  ]
};

if (IS_PRODUCTION) {
  webpackConfig.plugins.push(
    new webpack.optimize.DedupePlugin()
  );
}
