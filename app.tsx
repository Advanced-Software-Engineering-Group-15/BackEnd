// import { DATETIME } from "mysql/lib/protocol/constants/types";

const dataBaseHelper = require('./database/db_helper');

const express = require('express')
const app = express()
const port = 443
var bodyParser = require('body-parser');
const fileSystem = require("fs");
var mysql = require('mysql');

const generateNewRating = (currentRating, inputRating) => {
  return ((Number(currentRating)*0.9 + Number(inputRating)*0.1)).toString()
}

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
  journeyStatus: '',
}

app.use(express.json());

app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}));


app.get('/journeys', (req, res) => {
  console.log("get journeys has been called...")
  const db = new dataBaseHelper(props)
  db.getAllJourneys()
  const exJourneys = require('./exJourneys.json');
  console.log(exJourneys)
  res.json(exJourneys)  
});

app.get('/passengers', (req, res) => {

  const db = new dataBaseHelper(props)
  db.getAllPassengers() 
  const exPassengers = require('./exPassengers.json');
  console.log(exPassengers)
  res.json(exPassengers)  
});

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
    journeyStatus: currJourney.Status
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
    rating: 3,
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
    journeyStatus: ""
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
    departure_datetime: "",
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

  app.post('/journeyStatus', (req, res) => {
    const data = JSON.parse(req.body.body)
    console.log(data);
  
    const props = {
      userName: "",
      password: "",
      email: "",
      name: "",
      rating: "",
      userId: "",
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
      creatorID: "", 
      creatorRating: "",
      departure_datetime: "",
      journeyStatus: data.Status,
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
              data.Status
            ]
      ];
          con.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
          var sql = "UPDATE journeyListFormat SET Status= ? WHERE journeyID = ?";
          console.log(values);
          con.query(sql, [data.Status, data.journeyID], function (err, result) {
              if (err) throw err;
              if (result == undefined){
                  console.log("Could not update database journeyListFormat")
              }
              console.log("Number of records updated: " + result.affectedRows);
              console.log('record updated with new Status');
          });
          var sql2 = "UPDATE addingUsers SET Status= ? WHERE journeyID = ?";
          con.query(sql2, [data.Status, data.journeyID], function (err, result) {
            if (err) throw err;
            if (result == undefined){
                console.log("Could not find or update database journeyListFormat")
            }
            console.log("Number of records updated: " + result.affectedRows);
            console.log('records updated with new Status');
        });
          }); 

              
    })

app.post('/rating', (req, res) =>{
  const data = JSON.parse(req.body.body)
  console.log(data);

  const props = {
    userName: "",
    password: "",
    email: "",
    name: "",
    rating: "",
    userId: data.userID,
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
    departure_datetime: 'YYYY-MM-DD HH:MI:SS',
    creatorRating: "",
  }
  
  const db = new dataBaseHelper(props)
  
  db.getUserInfoFromUserId().then(() => {
    console.log("Is user id valid: ", db.getStatus);
    const response = {
      'userIDValid': db.getStatus,
      'userInfo': db.getUserInfo
    }
    return response;
  }).then((response) => {
    res.json(response)
    if (response.userIDValid){
      const rating = generateNewRating(response.userInfo.rating, data.rating.toString())
      console.log('Updated rating is: ', rating)
      const db2 = new dataBaseHelper({userId: data.userID, rating:  rating})
      db2.addRating().then(() => {
        console.log('Added new rating to database', rating, 'status of database write is: ', db2.getStatus)
      })
    }
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})




