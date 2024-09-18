const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Failed to connect to MongoDB Atlas', err));


const membershipSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  contactNo: String,
  contactAddress: String,
  startDate: Date,
  endDate: Date,
  membershipDuration: String,
});

module.exports = mongoose.model('Membership', membershipSchema);
