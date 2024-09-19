const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Failed to connect to MongoDB Atlas', err));

// Define the membership schema
const membershipSchema = new mongoose.Schema({
  membershipId: { type: Number, unique: true },
  FirstName: String,
  LastName: String,
  contactNo: String,
  AadharCardNo: { type: String, unique: true },
  contactAddress: String,
  startDate: Date,
  endDate: Date,
  membershipDuration: String,
});


// Check if the model is already compiled to prevent OverwriteModelError
const Membership = mongoose.models.Membership || mongoose.model('Membership', membershipSchema);

module.exports = Membership;