const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const port = 3010
//const Logger = require('./controllers/logger')


const router = require('./routes/auth');
app.use(express.json());

app.use((req, res, next) => {
  //Logger.logaction(req.method, req.url, false, "Request received");
  next();
});

app.use(router);

app.use((req, res) => {
  const success = false;
  if(res.status == 200) success = true;
  //Logger.logaction(req.method, req.url, success, "Response send");
  res.send();
})

connectToMongoDB()
  .then(() => {

    app.listen(port, () => {
      console.log(`Auth service listening on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });