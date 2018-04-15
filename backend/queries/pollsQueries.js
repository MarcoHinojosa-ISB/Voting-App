var query = require("../pg-connect.js").query;

function retrievePolls(callback){
  callback("shit happened", null);
}

module.exports = {
  retrievePolls: retrievePolls
}
