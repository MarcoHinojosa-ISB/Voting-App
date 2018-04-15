var poll = require("../queries/pollsQueries.js");
var router = require("express").Router();

router.get("/retrieve-polls", function(req, res){
  poll.retrievePolls(function(err, result){
    err ? res.status(500).send(err) : res.status(200).send(result.rows);
  });
});

module.exports = {
  routes: router
};
