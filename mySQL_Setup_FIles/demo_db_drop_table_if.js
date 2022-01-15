var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Adv_sofT_1!",
  database: "mydb"
});

con.connect(function(err) {
    if (err) throw err;
    var sql = "DROP TABLE IF EXISTS products";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });