var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Adv_sofT_1!"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE JourneySharingDatabase", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});