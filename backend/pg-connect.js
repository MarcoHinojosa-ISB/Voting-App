require('dotenv').config();

var pg = require('pg');
var dbString = process.env.DBSTRING;
pg.defaults.poolIdle = 5000;

module.exports = {
  query: function(qString, qParams, callback){
    pg.connect(dbString, function(err, client, done){
      if(err){
        callback(err, null);
        console.err("Connection Error...");
      }
      else{
        client.query(qString, qParams ? qParams : [], function(err, result){
          if(err){
            callback(err, null);
            console.err("Query Error...");
          }
          else{
            callback(null, result);
          }
        })
      }
    })
  }
}
