const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.noDeprecation = true;

module.exports = {
  devtool: "inline-source-map",
  entry: [
    "babel-polyfill",
    "react-hot-loader/patch",
    "webpack/hot/only-dev-server",
    "./client/index",
  ],
  output: {
    path: path.join(process.cwd(), ".build"),
    publicPath: '/',
    filename: "bundle.js",
  },
  target: "web",
  module: {
    rules: [
      { test: /\.js?$/, use: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": { BUILD_TARGET: JSON.stringify("client") },
    }),
  ],
  devServer: {
    inline: true,
    host: "localhost",
    port: 8081,
    historyApiFallback: true,
    proxy: {
      "/images/*": {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true,
        ignorePath: false,
      }
    }
  }
};
