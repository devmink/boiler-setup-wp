const webpack = require('webpack');

const config = {
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader'
      }
    ]
  },
  // plugins: [new webpack.optimize.UglifyJsPlugin()]
};

module.exports = config;