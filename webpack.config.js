module.exports = {
  module:{
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader",
        exclude: /node_modules/
      }
    ]
  },
  entry: ["./src/entry.js", "./src/stylesheets/_main.scss"],
  output: {
    path: __dirname + '/src/build',
    publicPath: "/src/build/",
    filename: 'bundle.js'
  }
};
