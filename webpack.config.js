var bodyParser = require('body-parser');

// get api routes of components
var auth = require("./backend/api/authRoutes.js");
var polls = require("./backend/api/pollsRoutes.js");

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
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    before(app){
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));

      app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, authorization");//, multipart/form-data");
        next();
      });
      app.use('/api/auth', auth.routes);
      app.use('/api/polls', polls.routes);
    }
  }
};
