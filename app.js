var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// get api routes of components
var auth = require("./backend/api/authRoutes.js");
var polls = require("./backend/api/pollsRoutes.js");
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/src', express.static(__dirname + '/src'));

app.use('/api/auth', auth.routes);
app.use('/api/polls', polls.routes);
app.use('/', function(req, res){
  console.log("tests")
  res.sendFile(__dirname + "/index.html");
});


module.exports = app;
