var poll = require("../queries/pollsQueries.js");
var router = require("express").Router();

// Calls to Retrieve
router.get("/retrieve-polls", function(req, res){
  poll.retrievePolls(function(err, result){
    err ? res.status(500).send(err) : res.status(200).json(result.rows);
  });
});

router.post("/retrieve-own-polls", function(req, res){
  poll.retrieveOwnPolls(req.body, function(err, result){
    err ? res.status(500).send(err) : res.status(200).json(result.rows);
  })
})

router.post("/retrieve-single-poll", function(req, res){
  poll.retrieveSinglePoll(req.body, function(err, result){
    err ? res.status(500).send(err) : res.status(200).json(result);
  })
})

// Calls to Create/Delete
router.post("/create-poll", function(req, res){
  poll.createPoll(req.body, function(err){
    err ? res.status(500).send(err) : res.status(200).send("OK");
  })
})

router.post("/create-poll-option", function(req, res){
  poll.createPollOption(req.body, function(err){
    err ? res.status(500).send(err) : res.status(200).send("OK");
  })
})

router.delete("/delete-poll", function(req, res){
  poll.deletePoll(req.body, function(err){
    err ? res.status(500).send(err) : res.status(200).send("Poll deleted");
  })
})

// Submit Vote
router.put("/submit-vote", function(req, res){
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  var processVote = false;

  // Process vote if not voted before
  // if user is logged in
  if(req.body.user && req.body.user.username && req.body.voted_users[0].indexOf(req.body.user.username) === -1){
    req.body.voted_users[0].push(req.body.user.username);

    poll.submitVote(req.body, function(err){
      err ? res.status(500).send(err) : res.status(200).send("Voted");
    })
  }
  // if user is a guest
  else if(!req.body.user && req.body.voted_users[0].indexOf(ip) === -1){
    req.body.voted_users[0].push(""+ip);

    poll.submitVote(req.body, function(err){
      err ? res.status(500).send(err) : res.status(200).send("Voted");
    })
  }
  // Already Voted
  else{
    res.status(200).send("Already Voted");
  }
})

module.exports = {
  routes: router
};
