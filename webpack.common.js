const webpack = require("webpack");
const path = require("path");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const nodeExtrenals = require("webpack-node-externals");

module.exports = {
  target: "node",

  externals: [nodeExtrenals()],

  entry: {
    index: "./src/index.js"
  },

  plugins: [
    new cleanWebpackPlugin(["dist"]),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              require("babel-plugin-transform-object-rest-spread"),
              "@babel/transform-runtime"
            ]
          }
        }
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    libraryTarget: "commonjs2"
  }
};
