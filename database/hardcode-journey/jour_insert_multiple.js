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
  var sql = "INSERT INTO journeyList (creator_rating, creator_name, creator_id, journey_type, cost, spots_left,\
  date_of_journey, start_latitude, start_longitude, end_latitude, end_longitude) VALUES ?";
  var values = [
    [4.0, 'Tester', 1, 'Car', 20.50, 3,  '2022-02-18 14:30:00', 53.34274797960948, -6.252967723700273, 53.31231513853029, -6.261711978136511],
    [3.5, 'Tester_2', 2, 'Walking', 0.0, 5, '2022-02-18 14:30:00', 53.343229017632396, -6.257489564732285, 53.34414582425409, -6.263447225439511],
    [4.8, 'Vanilla', 3, 'Bike', 0.0 , 2, '2022-02-18 14:30:00', 53.34406384892963, -6.250386889876648, 53.36217352451428, -6.225729144448416]
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});