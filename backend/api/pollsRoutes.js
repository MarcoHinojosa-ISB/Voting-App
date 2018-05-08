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

// Other
router.put("/submit-vote", function(req, res){
  poll.submitVote(req.body, function(err){
    err ? res.status(500).send(err) : res.status(200).send("Voted");
  })
})

module.exports = {
  routes: router
};
