const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const nodemonPlugin = require("nodemon-webpack-plugin");

module.exports = merge(common, {
  watch: true,

  watchOptions: {
    aggregateTimeout: 300
  },

  devtool: "source-map", // inline-cheap-module-source-map

  plugins: [
    new nodemonPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ]
});
