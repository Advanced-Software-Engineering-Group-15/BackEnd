// import { DATETIME } from "mysql/lib/protocol/constants/types";

const dataBaseHelper = require('./database/db_helper');
// const expect = require('chai').expect;
// const toSQLDate = require('js-date-to-sql-datetime');

const express = require('express')
const app = express()
const port = 443
var bodyParser = require('body-parser');
const fileSystem = require("fs");
var mysql = require('mysql');

const props = {
  userName: "",
  password: "",
  email: "",
  name: "",
  rating: "",
  userId: "",
  journeyID: "",
  journeyType: "",
  startName: "",
  startLat: "",
  startLong: "",
  endName: "",
  endLat: "",
  endLong: "",
  currency: "",
  cost: "",
  creatorID: "", 
  creatorRating: "",
  capacity: 0,
  departure_datetime: 'YYYY-MM-DD HH:MI:SS',
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/journeys', (req, res) => {

  const db = new dataBaseHelper(props)
  db.getAllJourneys()
  const exJourneys = require('./exJourneys.json');
  console.log(exJourneys)
  res.json(exJourneys)  
});

app.get('/passengers', (req, res) => {

  const db = new dataBaseHelper(props)
  db.getAllPassengers() //.then(() => {
  const exPassengers = require('./exPassengers.json');
  console.log(exPassengers)
  res.json(exPassengers)  
  //});
});

// app.get('/createdJourneys', (req, res) => {
//   const newJourney = require('./newJourney.json');
//   console.log(newJourney)
//   res.json(newJourney)
// });

app.post('/newJourneys', (req, res) =>{
  const exJourneys = require('./exJourneys.json');
  console.log(exJourneys)
  const data = JSON.parse(req.body.body)
  exJourneys.exJourneys.push(data)
  console.log(data)
  console.log(exJourneys)

  var currJourney = data;

  const props = {
    userName: "",
    password: "",
    email: "",
    name: "",
    rating: "",
    userId: "",
    journeyID: currJourney.journeyID,
    journeyType: currJourney.journeyType,
    startName: currJourney.startName,
    startLat: currJourney.startLat,
    startLong: currJourney.startLong,
    endName: currJourney.endName,
    endLat: currJourney.endLat,
    endLong: currJourney.endLong,
    currency: currJourney.currency,
    cost: currJourney.cost,
    creatorID: currJourney.creatorID, 
    capacity: currJourney.capacity,
    creatorRating: currJourney.creatorRating,
    departure_datetime: currJourney.departure_datetime,
    journeyStatus: "Pending"
  }

  const db = new dataBaseHelper(props)
  db.insertJourneyIntoDatabase().then(() => {
    console.log("Login status sent to frontend is: ", db.getStatus);
    const response = {
      isJourneyAddedToTable: db.getStatus
    }
    return response;
  }).then((response) => {
    res.json(response)
    if (response.isJourneyAddedToTable){
      fileSystem.writeFile("./exJourneys.json", JSON.stringify(exJourneys, null, 2), err=>{
        if(err){
          console.log("Error writing file" ,err)
        } else {
          console.log('JSON data is written to exJourneys file successfully')
        }
      })
    }
  })
});

app.post('/sign-in', (req, res) => {
  const data = JSON.parse(req.body.body)
  console.log(data);

  const props = {
    userName: data.userName.toString(),
    password: data.password.toString(),
    email: "",
    name: "",
    rating: "",
    userId: "",
    journeyID: "",
    journeyType: "",
    startName: "",
    startLat: "",
    startLong: "",
    endName: "",
    endLat: "",
    endLong: "",
    currency: "",
    cost: "",
    creatorID: "", 
    creatorRating: "",
    capacity: "",
    departure_datetime: "",
    journeyStatus: ""
  }

  const db = new dataBaseHelper(props)
  db.isValidCreds().then(() => {
    console.log("Login status sent to frontend is: ", db.getStatus);
    if(db.getStatus){
      var user_props = db.getUserInfo
    }
    else{
      var user_props = {
        'username': '',
        'email': '', 
        'name': '',
        'rating': '',
        'userID': '',
        'isCreator': false
      }
    }

    const response = {
      isLoginSuccessful: db.getStatus,
      userProps: user_props
    }
    console.log(response)
    return response;

  }).then((response) => {
    res.json(response)
  })
})

app.post('/new-user', (req, res) => {
  const data = JSON.parse(req.body.body)
  console.log(data);

  const props = {
    userName: data.userName.toString(),
    password: data.repeated_password.toString(),
    email: data.emailAddress.toString(),
    name: (data.firstName+data.familyName).toString(),
    rating: "3".toString(),
    userId: "",
    journeyID: "",
    journeyType: "",
    startName: "",
    startLat: "",
    startLong: "",
    endName: "",
    endLat: "",
    endLong: "",
    currency: "",
    cost: "",
    creatorID: "", 
    creatorRating: "",
  }

  const db = new dataBaseHelper(props)
  db.insertUserIntoDatabase().then(() => {
    console.log("Is user created in database: ", db.getStatus);
    const response = {
      isUserInDatabase: db.getStatus
    }
    return response; 
  }).then((response) => {
    res.json(response);
  });

});

app.post('/add-to-journey', (req, res) => {
  const data = JSON.parse(req.body.body)
  console.log(data);

  const props = {
    userName: "",
    password: "",
    email: "",
    name: "",
    rating: "",
    userId: data.userID,
    journeyID: data.journeyID,
    journeyType: "",
    startName: "",
    startLat: "",
    startLong: "",
    endName: "",
    endLat: "",
    endLong: "",
    currency: "",
    cost: "",
    creatorID: data.creatorID, 
    creatorRating: "",
    journeyStatus: data.journeyStatus,
  }
  console.log('props', props)
    var con = mysql.createConnection({
        host: "user-information-database.cl7ouywfgywl.eu-west-1.rds.amazonaws.com",
        port: 3306,
        user: "masterUsername",
        password: "password",
        database: "User_Information_Database"
    });
    var values = [
        [   data.journeyID,
            data.userID,
            data.creatorID,
          ]
    ];
        con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO addingUsers (journeyID, userID, creatorID) VALUES ?";
        console.log(values);
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            if (result == undefined){
                console.log("Could not insert into database")
            }
            console.log("Number of records inserted: " + result.affectedRows);
            console.log('Is new entry added to addingUSers database');
        });
        });  
            
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

