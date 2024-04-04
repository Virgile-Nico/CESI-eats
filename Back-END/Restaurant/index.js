const express = require('express');
const app = express();
const port = 3023;

const router = require('./routes/Restaurant');

app.use(router);

app.listen(port, () => {
    console.log(`[Restaurant-sevice] Service running on port ${port}`)
  })