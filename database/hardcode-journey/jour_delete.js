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
    var sql = "DELETE FROM journeyList";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
  });