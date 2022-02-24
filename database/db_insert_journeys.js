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
  var sql = "INSERT INTO journeyListFormat (journeyID, journeyType, startName, startLat, startLong, endName, endLat, endLong, currency, cost, creatorID, creatorRating) VALUES ?";
  const exJourneys = require('../exJourneys.json');
  //console.log(exJourneys)
  console.log(exJourneys.exJourneys.length)
  var values = []
  for (let i = 0; i < exJourneys.exJourneys.length; i++) {
    console.log("exJourneys[i]: ")
    console.log(exJourneys.exJourneys[i])
    var currJourney = exJourneys.exJourneys[i];
    console.log("currJourney: ")
    console.log(currJourney)
    var currValues = [
      currJourney.journeyID,
      currJourney.journeyType,
      currJourney.journeyStart.name,
      currJourney.journeyStart.latitude,
      currJourney.journeyStart.longitude,
      currJourney.journeyEnd.name,
      currJourney.journeyEnd.latitude,
      currJourney.journeyEnd.longitude,
      currJourney.pricing.currency,
      currJourney.pricing.quantity,
      currJourney.creatorID,
      currJourney.creatorRating
    ];
    console.log("currValues: ")
    console.log(currValues)
  values[i] = currValues;
  }
  console.log(values)
  // var values = [
  //   ['tester', 'Tester', 'tester@test.com', 'password', 4.0 ],
  //   ['tester_2','Tester_2', 'secondTester@test.com', 'password2', 3.5 ],
  //   ['Vanilla_Dreams', 'Vanilla', 'vanillaDreams@dream.com', 'password3', 4.8]
  // ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});