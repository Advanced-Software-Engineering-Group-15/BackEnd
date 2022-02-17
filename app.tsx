const express = require('express')
const app = express()
const port = 5000
var bodyParser = require('body-parser');
const fileSystem = require("fs")

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
  fileSystem.writeFile("./exJourneys.json", JSON.stringify(exJourneys, null, 2), err=>{
    if(err){
      console.log("Error writing file" ,err)
    } else {
      console.log('JSON data is written to newJourneys file successfully')
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

