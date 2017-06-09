"use strict";
var Path = require("path"),
    webpack = require("webpack"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    nib = require("nib"),
    webpackConfig,

    IS_PRODUCTION = "production" === process.env.NODE_ENV,
    JSX_WITH_HOT_LOEADERS = ["react-hot-loader", "babel-loader?optional=runtime"],
    CSS_LOADER = "style-loader!css-loader?root=../",

webpackConfig = module.exports = {
  entry: {
    app: [
      "./client/scripts/index.js"
    ]
  },
  output: {
    path: Path.resolve(__dirname, "../public/assets"),
    publicPath: "assets/",
    filename: (IS_PRODUCTION ? "[hash].js" : "bundle.js")
  },
  module: {
    loaders: [
      { test: /\.js(x?)$/, include: [/lib/, /client/], exclude: [/node_modules/], loaders: JSX_WITH_HOT_LOEADERS },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.png$/, loader: "url-loader?prefix=/public/&limit=10000&mimetype=image/png"},
      { test: /\.css$/, loader: CSS_LOADER },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html",
      filename: "../index.html"
    })
  ],
  stylus: {
    use: [nib()]
  }
};

if (IS_PRODUCTION) {
  webpackConfig.plugins.push(
    new webpack.optimize.DedupePlugin()
  );
}
