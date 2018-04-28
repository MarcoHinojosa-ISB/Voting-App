var auth = require("../queries/authQueries.js");
var router = require("express").Router();

router.post('/log-in', function(req, res){
  auth.login(req.body, function(err, result){
    err ? res.status(500).send(err) : res.status(200).json({redirect: "/", user: result.rows[0]});
  });
});

router.post('/sign-up', function(req, res){
  auth.signup(req.body, function(err){
    err ? res.status(500).send(err) : res.status(200).json({redirect: "/"});
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


module.exports = {
  routes: router
};
