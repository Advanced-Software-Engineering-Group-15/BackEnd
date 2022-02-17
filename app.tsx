import { resolve } from "path/posix";

const dataBaseHelper = require('./database/db_checkCredentials')

const express = require('express')
const app = express()
const port = 5000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/journeys', (req, res) => {
  const exJourneys = require('./exJourneys.json');
  console.log(exJourneys)
  res.json(exJourneys)
})


app.post('/sign-in', (req, res) => {
  const data = JSON.parse(req.body.body)
  console.log(data);
  const db = new dataBaseHelper(data.userName, data.password)

  const loginStatus = new Promise((resolve, reject) => {
    try{resolve(db.isValidCreds)}
    catch{reject(false)}
  }).then((status) => {
    console.log("Login status sent to frontend is: ", status);
    const response = {
      isLoginSuccessful: status
    }
    res.json(response); 
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})