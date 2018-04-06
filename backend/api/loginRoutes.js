var login = require("../queries/loginQueries.js");
var router = require("express").Router();

router.post('/sign-in', function(req, res){
  login.signin(req.body, function(err, result){
    if(err){
      res.status(500).send(err);
    }
    else{
      req.session.user = {
        username: result.rows[0].username,
        firstname: result.rows[0].firstname,
        lastname: result.rows[0].lastname
      }
      res.status(200).send("/");
    };
  });
});

router.post('/sign-up', function(req, res){
  login.signup(req.body, function(err){
    err ? res.status(500).send(err) : res.status(200).send("/");
  });
});

router.get('/retrieve-all-usernames', function(req, res){
  login.retrieveAllUsernames(function(err, result){
    err ? res.status(500).send(err) : res.status(200).json(result.rows);
  });
});

router.post('/check-existing-username', function(req, res){
  login.checkExistingUsername(req.body, function(err, result){
    err ? res.status(500).send(err) : res.status(200).json(result.rows);
  });
});


module.exports = {
  routes: router
};
