var query = require("../pg-connect.js").query;

function retrievePolls(callback){
  callback("will get to this now", null);
}

function createPoll(data, callback){
  query("SELECT id FROM users WHERE username=$1", [data.uname], function(err, result){
    if(err)
      callback(err);
    else{
      query("INSERT INTO polls (user_id, title) values ($1, $2) RETURNING id", [result.rows[0].id, data.title], function(err, result){
        if(err)
          callback(err);
        else
          createPollOptions({poll_id: result.rows[0].id, options: data['options[]']}, callback);
      })
    }
  })
}

function createPollOptions(data, callback){
  var dbError = false;

  for(var i=0; i<data.options.length; i++){
    query("INSERT INTO poll_options (poll_id, option_content) values ($1, $2)", [data.poll_id, data.options[i]], function(err){
      if(err){
        dbError = true;
        callback(err);
      }
    })
  }

  if(!dbError)
    callback(null);
}

module.exports = {
  retrievePolls: retrievePolls,
  createPoll: createPoll
}
