const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, ''),
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, '/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['react-html-attrs']
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 25000
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
  devServer: {
    port: 8007,
    historyApiFallback: true,
    stats: 'errors-only',
    overlay: true,
  }
};
