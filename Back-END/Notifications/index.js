const express = require('express')
const Logger = require('./middlewares/logger')
const app = express()
const port = 3026

app.use(express.json())

app.use((req, res, next) => {
  Logger.logaction(req.method, req.url, false, "Request received");
  next();
});

// Ajouter les router personnalisés ici
// app.use(router)

app.use((req, res) => {
  const success = false;
  if(res.status == 200) success = true;
  Logger.logaction(req.method, req.url, success, "Response send");
  res.send();
})

const { connectToMongoDB } = require('./controllers/dbMongo');

connectToMongoDB()
  .then(() => {

    app.listen(port, () => {
      console.log(`Delivery service listening on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });