const express = require('express')
const app = express()
const port = 3010

const router = require('./routes/auth');
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})