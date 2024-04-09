const { mongoose } = require('./dbMongo');

var sc = new mongoose.Schema({
  timestamp: String,
  service: String,
  action_type: String,
  route: String,
  success: Boolean,
  message: String,
});

const Logs = mongoose.model('logs', sc);

module.exports = Logs;