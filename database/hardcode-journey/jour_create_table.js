// This is run once. It creates a table. Once run, a new table is made on the AWS database
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
    var sql = "CREATE TABLE journeyList (\
        id INT AUTO_INCREMENT PRIMARY KEY, creator_rating FLOAT, creator_name VARCHAR(255), creator_id INT,\
         journey_type VARCHAR(255), cost FLOAT, spots_left INT,\
         date_of_journey DATETIME, \
         start_latitude DECIMAL(8,6), start_longitude DECIMAL(9,6),\
         end_latitude DECIMAL(8,6), end_longitude DECIMAL(9,6))"; // https://stackoverflow.com/questions/1196415/what-datatype-to-use-when-storing-latitude-and-longitude-data-in-sql-databases
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });