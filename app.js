var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/src', express.static(__dirname + '/src'));

app.use('/', function(req, res){
  console.log("tests")
  res.sendFile(__dirname + "/index.html");
});
app.post('/test', function(req, res){
  console.log("dsadsads");
  res.send({test: "none"});
});
module.exports = app;
