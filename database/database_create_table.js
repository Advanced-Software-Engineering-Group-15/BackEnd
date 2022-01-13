var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "user_information_db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // var sql = "CREATE TABLE users (user_id INT, username VARCHAR(255), name VARCHAR(255), user_email VARCHAR(255), user_rating FLOAT, CHECK (user_rating<=5.0 and user_rating>=0.0))";
  var sql = "ALTER TABLE users ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});