var mysql = require('mysql');

var con = mysql.createConnection({
    host: "user-information-database.cl7ouywfgywl.eu-west-1.rds.amazonaws.com",
    port: 3306,
    user: "masterUsername",
    password: "password",
    database: "User_Information_Database"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO userAccountInfo (name, username, email, password, rating) VALUES ?";
  var values = [
    ['tester', 'Tester', 'tester@test.com', 'password', 4.0 ],
    ['tester_2','Tester_2', 'secondTester@test.com', 'password2', 3.5 ],
    ['Vanilla_Dreams', 'Vanilla', 'vanillaDreams@dream.com', 'password3', 4.8]
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});