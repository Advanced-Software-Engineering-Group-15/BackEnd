var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Adv_sofT_1!",
  database: "JourneySharingDatabase"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
   // var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
    var sql = "CREATE TABLE UserData (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), rating VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table altered");
    });
  });