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
  //Make SQL statement:
  var sql = "INSERT INTO users (user_id, username, name, user_email, user_rating) VALUES ?";
  var values = [
    [ 01, 'tester', 'Tester', 'tester@test.com', 4.0 ],
    [ 02, 'tester_2','Tester_2', 'secondTester@test.com',3.5 ],
    [ 03, 'Vanilla_Dreams', 'Vanilla', 'vanillaDreams@dream.com', 4.8]
  ];
  //Execute the SQL statement, with the value array:
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
    console.log(result.affectedRows)
  });
});
