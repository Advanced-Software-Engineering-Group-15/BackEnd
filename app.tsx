const express = require('express')
const app = express()
const port = 5000
var bodyParser = require('body-parser');
const fileSystem = require("fs");
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
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/journeys', (req, res) => {
  const exJourneys = require('./exJourneys.json');
  console.log(exJourneys)
  res.json(exJourneys)
});

app.get('/createdJourneys', (req, res) => {
  const newJourney = require('./newJourney.json');
  console.log(newJourney)
  res.json(newJourney)
});

app.post('/newJourneys', (req, res) =>{
  console.log(req.body.body)
  res.json(req.body)
  // res.end('Success')
  const exJourneys = require('./exJourneys.json');
  console.log(exJourneys)
  const data = JSON.parse(req.body.body)
  exJourneys.exJourneys.push(data)
  console.log(data)
  console.log(exJourneys)
  // fileSystem.writeFile("./newJourney.json", JSON.stringify(data), err=>{
  //   if(err){
  //     console.log("Error writing file" ,err)
  //   } else {
  //     console.log('JSON data is written to the file successfully')
  //   }
  // })

  /// get all records from mySQL table
  var sql = "INSERT INTO journeyListFormat (journeyID, journeyType, startName, startLat, startLong, endName, endLat, endLong, currency, cost, creatorID, creatorRating) VALUES ?";
  //const exJourneys = require('../exJourneys.json');
  //console.log(exJourneys)
  //console.log(exJourneys.exJourneys.length)
  var values = []
  console.log("data: ")
  console.log(data)
  var currJourney = data;
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
  values[0] = currValues;
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
  fileSystem.writeFile("./exJourneys.json", JSON.stringify(exJourneys, null, 2), err=>{
    if(err){
      console.log("Error writing file" ,err)
    } else {
      console.log('JSON data is written to exJourneys file successfully')
    }
  })
});

app.post('/sign-in', (req, res) => {
  console.log(req.body.body);
  res.json(req.body);

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

