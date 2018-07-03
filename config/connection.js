// Set up MySQL connection.
var mysql = require("mysql");

var app = require('../server');

console.log('--------------the environment we are using----------------');
console.log(app.settings.env);
console.log('--------------the environment we are using----------------');

if (process.env.JAWSDB_URL){
  var connection = mysql.createConnection(process.env.JAWSDB_URL);
}else {
  var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: "fun_db"
  });
}

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
    /* 
      MB: Replace these two lines with:
          throw new Error(err);
    */
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection

