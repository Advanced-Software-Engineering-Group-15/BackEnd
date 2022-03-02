const dataBaseHelper = require('./database/db_helper')

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

app.post('/sign-in', (req, res) => {
  const data = JSON.parse(req.body.body)
  console.log(data);

  const props = {
    userName: data.userName.toString(),
    password: data.password.toString(),
    email: "",
    name: "",
    rating: "",
    userId: ""
  }

  const db = new dataBaseHelper(props)
  db.isValidCreds().then(() => {
    console.log("Login status sent to frontend is: ", db.getStatus);
    const response = {
      isLoginSuccessful: db.getStatus
    }
    return response;
  }).then((response) => {
    res.json(response)
  })
})

app.post('/new-user', (req, res) => {
  console.log(req.body.body);
  res.json(req.body);

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
