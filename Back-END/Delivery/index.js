const express = require('express')
const router = require('./routes/delivery')
const Logger = require('./middlewares/logger')
const app = express()
const port = 3010

app.use(express.json())

app.use((req, res, next) => {
  Logger.logaction(req.method, req.url, false, "Request received");
  next();
});

app.use(router)

app.use((req, res) => {
  Logger.logaction(req.method, req.url, true, "Response send");
  res.send();
})

const { connectToMongoDB } = require('./controllers/  dbMongo');

connectToMongoDB()
  .then(() => {

    app.listen(port, () => {
      console.log(`Delivery service listening on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
