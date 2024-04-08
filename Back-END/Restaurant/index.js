const express = require('express');
const app = express();
const port = 3023;

const router = require('./routes/Restaurant');
const mongo = require('./controllers/dbMongo');

mongo.connect();

app.use(express.json())

app.use(router);

app.listen(port, () => {
    console.log(`[Restaurant-sevice] Service running on port ${port}`)
  })