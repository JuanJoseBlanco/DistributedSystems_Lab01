
const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Probando Server 2')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


