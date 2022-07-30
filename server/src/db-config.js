const mongoose = require('mongoose');

const MONGO_URL = 'mongodb://admin:nodeapi22@localhost:27017/nasa_db'

mongoose.connection.once('open', () => console.log('MongoDB connection ready!'))
mongoose.connection.on('error', err => {
  console.error(err);
})

module.exports = {
  mongoose,
  MONGO_URL
}




