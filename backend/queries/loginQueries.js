var query = require("../pg-connect.js").query;

function retrieveAllUsernames(callback){
  query("SELECT username FROM users", [], function(err, result){
    err ? callback(err, null) : callback(null, result);
  });
}

function checkExistingUsername(data, callback){
  query("SELECT * FROM users WHERE username=$1", [data.uname], function(err, result){
    err ? callback(err, null) : callback(null, result);
  });
}

function signup(data, callback){
  query("INSERT INTO users (username, password, firstname, lastname) values ($1, $2, $3, $4)",
    [data.uname, data.pass, data.fname, data.lname], function(err, result){
      err ? callback(err) : callback(null);
  });
};

module.exports = {
  retrieveAllUsernames: retrieveAllUsernames,
  checkExistingUsername: checkExistingUsername,
  signup: signup
};
