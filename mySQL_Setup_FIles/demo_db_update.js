var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Adv_sofT_1!",
  database: "mydb"
});

con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE users SET favourite_product = '3' WHERE favourite_product = '156'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  });