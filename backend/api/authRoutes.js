var auth = require("../queries/authQueries.js");
var router = require("express").Router();
var jwt = require("jsonwebtoken");
var jwtsecret = require("../../jwtsecret.js");


router.post('/log-in', function(req, res){
  auth.login(req.body, function(err, result){
    err ? res.status(500).send(err) : res.status(200).json({redirect: "/", token: generateToken(result.rows[0])});
  });
});

router.post('/sign-up', function(req, res){
  auth.signup(req.body, function(err, result){
    err ? res.status(500).send(err) : res.status(200).json({redirect: "/", token: generateToken(result.rows[0])});
  });
});

router.get('/retrieve-all-usernames', function(req, res){
  auth.retrieveAllUsernames(function(err, result){
    err ? res.status(500).send(err) : res.status(200).json(result.rows);
  });
});

router.post('/check-existing-username', function(req, res){
  auth.checkExistingUsername(req.body, function(err, result){
    err ? res.status(500).send(err) : res.status(200).json(result.rows);
  });
});

// generate session token
function generateToken(data){
  var user = {
    username: data.username,
    firstname: data.firstname,
    lastname: data.lastname
  }
  
  return jwt.sign(user, jwtsecret.secret);
}

module.exports = {
  routes: router
};
