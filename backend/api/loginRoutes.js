var login = require("../queries/loginQueries.js");
var router = require("express").Router();

router.post('/sign-in', function(req, res){
  console.log("dsadsads");
  res.send({test: "none"});
});

router.get('/retrieve-all-usernames', function(req, res){
  login.retrieveAllUsernames(function(err, result){
    err ? res.status(500).json(err) : res.status(200).json(result.rows);
  });
});

router.post('/check-existing-username', function(req, res){
  login.checkExistingUsername(req.body, function(err, result){
    err ? res.status(500).json(err) : res.status(200).json(result.rows);
  });
});

router.post('/sign-up', function(req, res){
  login.signup(req.body, function(err){
    err ? res.status(500).json(err) : res.status(200).json({status: 200});
  });
});


module.exports = {
  routes: router
};
