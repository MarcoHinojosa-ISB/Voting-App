var webpack = require("webpack");

module.exports = {
  module:{
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  entry: __dirname + "/src/entry.js",
  output: {
    path: __dirname + '/src/build',
    publicPath: "/src/build/",
    filename: 'bundle.js'
  }
};
