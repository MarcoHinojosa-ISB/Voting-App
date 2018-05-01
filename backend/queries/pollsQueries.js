var auth = require("./authQueries.js");
var query = require("../pg-connect.js").query;

function retrievePolls(callback){
  query("SELECT polls.id, polls.user_id, polls.title, polls.date_created, SUM(poll_options.votes)"+
  "FROM polls, poll_options WHERE polls.id=poll_options.poll_id"+
  " GROUP BY polls.id, polls.user_id, polls.title, polls.date_created;",
    [], function(err, result){
      if(err)
        callback("Unable to retrieve polls", null);
      else
        callback(null, result);
  })
}

function retrieveOwnPolls(data, callback){
  auth.checkExistingUsername(data, function(err, result){
    if(err)
      callback("User currently not logged in", null);
    else{
      query("SELECT polls.id, polls.title, polls.date_created, SUM(poll_options.votes)"+
      "FROM polls, poll_options WHERE polls.user_id=$1 AND polls.id=poll_options.poll_id"+
      " GROUP BY polls.id, polls.title, polls.date_created;",
        [result.rows[0].id], function(err, result){
          if(err)
            callback("Unable to retrieve polls", null);
          else
            callback(null, result);
      })
    }
  })
}

function createPoll(data, callback){
  query("SELECT id FROM users WHERE username=$1;", [data.uname], function(err, result){
    if(err)
      callback("User currently not logged in");
    else{
      query("INSERT INTO polls (user_id, title) values ($1, $2) RETURNING id;", [result.rows[0].id, data.title], function(err, result){
        if(err)
          callback("Unable to create poll");
        else
          createPollOptions({poll_id: result.rows[0].id, options: data['options']}, callback);
      })
    }
  })
}
function createPollOptions(data, callback){
  var dbError = false;

  for(var i=0; i<data.options.length; i++){
    query("INSERT INTO poll_options (poll_id, option_content) values ($1, $2);", [data.poll_id, data.options[i]], function(err){
      if(err){
        dbError = true;
        console.log(err)
        callback("Unable to enter poll option");
      }
    })
  }

  if(!dbError)
    callback(null);
}

function deletePoll(data, callback){
    query("DELETE FROM polls WHERE id=$1", [data.id], function(err){
      if(err){
        callback(err)
      }
      else{
        query("DELETE FROM poll_options WHERE poll_id=$1", [data.id], function(err){
          if(err)
            callback(err);
          else
            callback(null);
        })
      }
    })
}

module.exports = {
  retrievePolls: retrievePolls,
  retrieveOwnPolls: retrieveOwnPolls,
  createPoll: createPoll,
  deletePoll: deletePoll
}
