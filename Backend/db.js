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

// Define the books/movies schema
// Define the Book schema
const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  author: { type: String, required: true }, // Add this line
  procurementDate: { type: Date, required: true },
  quantity: { type: Number, required: true },
  serialNumber: { type: Number, required: true, unique: true },
  status: { type: String, default: 'Available' }
});


// Define the Movie schema
const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  director: { type: String, required: true }, // Add this line
  procurementDate: { type: Date, required: true },
  quantity: { type: Number, required: true },
  serialNumber: { type: Number, required: true, unique: true },
  status: { type: String, default: 'Available' }
});


// Define the user schema for user management
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: function() { return this.isNew; } }, // Password is required for new users
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
  admin: { type: Boolean, default: false },
  });

const issueSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
   
  },
  itemType: {
    type: String,
    required: true,
    enum: ['Book', 'Movie']
  },
  issueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  },
  remarks: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['issued', 'returned'],
    default: 'issued'
  },
  username: {
    type: String,
    required: true
  }
});

const fineSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Book', 'Movie'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  authorOrDirector: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  actualReturnDate: {
    type: Date,
    required: true,
  },
  fine: {
    type: Number,
    required: true,
  },
  finePaid: {
    type: Boolean,
    required: true,
  },
  remarks: {
    type: String,
  },
});



// Check if the models are already compiled to prevent OverwriteModelError
const Membership = mongoose.models.Membership || mongoose.model('Membership', membershipSchema);
const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);
const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Issue = mongoose.models.Issue|| mongoose.model('Issue', issueSchema);
const Fine = mongoose.models. Fine || mongoose.model('Fine', fineSchema);

module.exports = { Membership, Book, User, Movie, Issue, Fine };