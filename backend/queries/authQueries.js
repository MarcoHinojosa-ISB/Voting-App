var query = require("../pg-connect.js").query;
var bcrypt = require("bcryptjs");

function retrieveAllUsernames(callback){
  query("SELECT username FROM users;", [], function(err, result){
    err ? callback("Server error", null) : callback(null, result);
  });
}

function login(data, callback){
  checkExistingUsername(data, function(err, result){
    if(err)
      callback("Server error", null);
    else if(result.rows.length === 0)
      callback("Username does not exist", null);
    else{
      bcrypt.compare(data.pass, result.rows[0].password, function(err, isPasswordMatch) {
        if(err)
          callback("Server error", null);
        else if(!isPasswordMatch)
          callback("Password is invalid", null);
        else
          callback(null, result);
      })
    }
  })
}

function checkExistingUsername(data, callback){
  query("SELECT * FROM users WHERE username=$1;", [data.uname], function(err, result){
    err ? callback("Server error", null) : callback(null, result);
  });
}

function signup(data, callback){
  bcrypt.hash(data.pass, 10, function(err, hash) {
    if(err)
      callback("Server error", null);
    else{
      checkExistingUsername(data, function(err, result){
        if(err)
          callback(err, null);
        else if(result.length > 0){
          callback("Username already exists", null);
        }
        else{
          query("INSERT INTO users (username, password, firstname, lastname) values ($1, $2, $3, $4) returning *;",
            [data.uname, hash, data.fname, data.lname], function(err2, result2){
            err ? callback("Server error", null) : callback(null, result2);
          });
        }
      })
    }
  });
};

module.exports = {
  retrieveAllUsernames: retrieveAllUsernames,
  checkExistingUsername: checkExistingUsername,
  signup: signup,
  login: login
};
