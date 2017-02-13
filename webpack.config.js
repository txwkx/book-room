const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, ''),
  entry: "./src/js/app.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, '/')
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devServer: {
    port: 8007
  }
};
