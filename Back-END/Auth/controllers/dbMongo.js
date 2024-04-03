var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://213.32.6.121:27017";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database connected !");
  db.close();
});