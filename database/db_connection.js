// Code used to verify connection between local project and AWS database
// Insert this code into where you need to connect to the database. See db_create_table.js as example
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "user-information-database.cl7ouywfgywl.eu-west-1.rds.amazonaws.com",
  port: 3306,
  user: "masterUsername",
  password: "password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});