var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Adv_sofT_1!",
  database: "mydb"
});

con.connect(function(err) {
    if (err) throw err;
    var sql = "DELETE FROM users WHERE name = 'Vanilla Dreams'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
  });