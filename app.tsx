const dataBaseHelper = require('./database/db_helper')

const express = require('express')
const app = express()
const port = 443
//const port = 5000 //for localhost
var bodyParser = require('body-parser');
const fileSystem = require("fs");
// var mysql = require('mysql');

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
}

// var con = mysql.createConnection({
//   host: "user-information-database.cl7ouywfgywl.eu-west-1.rds.amazonaws.com",
//   port: 3306,
//   user: "masterUsername",
//   password: "password",
//   database: "User_Information_Database"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/journeys', (req, res) => {

  const db = new dataBaseHelper(props)
  db.getAllJourneys() //.then(() => {
  const exJourneys = require('./exJourneys.json');
  console.log(exJourneys)
  res.json(exJourneys)  
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
    creatorRating: currJourney.creatorRating,
  }

  // "journeyID": "af694b82-ab8b-11ec-82b4-4f2f17d3e634",
  // "journeyType": "DRIVING",
  // "startName": "Dundrum Town Centre, Sandyford Road, Dundrum, Dublin 16, Ireland",
  // "startLat": 53.286982,
  // "startLong": -6.242252,
  // "endName": "Sandyford, Dublin, Ireland",
  // "endLat": 53.27897,
  // "endLong": -6.216343,
  // "currency": "$",
  // "cost": 7,
  // "creatorID": "Tester",
  // "creatorRating": 2.5,
  // "Participants": null

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
        'userID': ''
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
  }
  console.log('props', props)

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
        'userID': ''
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

  //get journey and userid from frontend
  //query database for journey
  //add userid to participants column, insert into database
  //return response

});
 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


/*
const props = {
  userName: 'TestUser',
  password: 'testPassword',
  email: "testEmail",
  name: "banana",
  rating: "4",
  userId: ""
};

const db = new dataBaseHelper(props)

db.insertIntoDatabase().then(() => {
  console.log("Did this work?...", db.getStatus)
})

db.isValidCreds().then(() => {
  console.log("Login status sent to frontend is: ", db.getStatus);
  const response = {
    isLoginSuccessful: db.getStatus
  }
  return response;
}).then((response) => {
  console.log('response sent to server is: ', response);
})
*/
