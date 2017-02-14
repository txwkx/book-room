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
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      }
    ]
  },
  devServer: {
    port: 8007
  }
};
