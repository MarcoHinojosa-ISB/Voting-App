var poll = require("../queries/pollsQueries.js");
var router = require("express").Router();

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

router.post("/create-poll", function(req, res){
  poll.createPoll(req.body, function(err){
    err ? res.status(500).send(err) : res.status(200).send("OK");
  })
})

router.delete("/delete-poll", function(req, res){
  poll.deletePoll(req.body, function(err){
    err ? res.status(500).send(err) : res.status(200).send("Poll deleted")
  })
})

module.exports = {
  routes: router
};
