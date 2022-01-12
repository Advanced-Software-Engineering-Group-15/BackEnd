const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.json(
    {"msg": "Carma with a c!"}
  )
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})