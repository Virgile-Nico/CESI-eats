// mongo.js

const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  await mongoose.connect("mongodb://root:CESI-eats@213.32.6.121:27017/CESI_eats?authSource=admin")
    .then(console.log('[MONGODB] - Connection succeed'));
};

// Exportez l'objet mongoose pour une utilisation dans d'autres fichiers
module.exports = { mongoose, connectToMongoDB };