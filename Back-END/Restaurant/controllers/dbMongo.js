var mongoose = require('mongoose')
var url = "mongodb://root:CESI-eats@213.32.6.121:27017/CESI_eats?authSource=admin";

module.exports = {
  connect: async function (){
    await mongoose.connect(url).then(console.log(`[MongoDB] MongoDB connected`))
  }
}

