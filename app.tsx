const dataBaseHelper = require('./database/db_helper')

const express = require('express')
const app = express()
const port = 5000
var bodyParser = require('body-parser');
const fileSystem = require("fs")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/journeys', (req, res) => {
  const exJourneys = require('./exJourneys.json');
  console.log(exJourneys)
  res.json(exJourneys)
});


app.post('/newJourneys', (req, res) =>{
  console.log(req.body.body)
  res.json(req.body)
  // res.end('Success')
  const data = JSON.parse(req.body.body)
  console.log(data)
  fileSystem.writeFile("./newJourney.json", JSON.stringify(data), err=>{
    if(err){
      console.log("Error writing file" ,err)
    } else {
      console.log('JSON data is written to the file successfully')
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
