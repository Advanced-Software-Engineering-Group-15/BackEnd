const express = require('express')
const app = express()
const port = 5000

app.get('/journeys', (req, res) => {
  const exJourneys = require('./exJourneys.json');
  console.log(exJourneys)
  res.json(exJourneys)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})