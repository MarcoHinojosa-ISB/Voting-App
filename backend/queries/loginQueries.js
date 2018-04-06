var query = require("../pg-connect.js").query;
var bcrypt = require("bcrypt");
var session = require("express-session");

function retrieveAllUsernames(callback){
  query("SELECT username FROM users", [], function(err, result){
    err ? callback("Server error", null) : callback(null, result);
  });
}

function signin(data, callback){
  checkExistingUsername(data.uname, function(err, result){
    if(err)
      callback("Server error", null);
    else if(result.rows.length === 0)
      callback("Invalid username", null);
    else{
      bcrypt.compare(data.pass, result.rows[0].password, function(err, isPasswordMatch) {
        if(err)
          callback("Server error", null);
        else if(isPasswordMatch)
          callback(null, result);
        else {
          callback("Invalid password", null);
        }
      })
    }
  })
}

function checkExistingUsername(data, callback){
  query("SELECT * FROM users WHERE username=$1", [data], function(err, result){
    err ? callback("Server error", null) : callback(null, result);
  });
}

function signup(data, callback){
  bcrypt.hash(data.pass, 10, function(err, hash) {
    if(err)
      callback(err);
    else{
      query("INSERT INTO users (username, password, firstname, lastname) values ($1, $2, $3, $4)",
        [data.uname, hash, data.fname, data.lname], function(err, result){
        err ? callback("Server error") : callback(null);
      });
    }
  });
};

module.exports = {
  retrieveAllUsernames: retrieveAllUsernames,
  checkExistingUsername: checkExistingUsername,
  signup: signup,
  signin: signin
};
