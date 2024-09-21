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
const bookSchema = new mongoose.Schema({
  mediaType: { type: String, enum: ['book', 'movie'], required: true }, // 'book' or 'movie'
  mediaName: { type: String, required: true },
  AuthorName: { type: String, required: true }, // Can represent the author or director
  procurementDate: { type: Date, required: true },
  quantity: { type: Number, default: 1 }, // Default is 1
  serialNumber: { type: Number, unique: true }, // Sequential serial number
  status: { type: String, default: 'Available' }, // Default status is 'Available'
});

// Pre-save hook to generate a sequential serial number
bookSchema.pre('save', async function (next) {
  const doc = this;

  if (doc.isNew) {
    // Get the last book or movie's serial number
    const lastBook = await Book.findOne().sort({ serialNumber: -1 });

    // If no books exist yet, start serialNumber at 1, otherwise increment the last serialNumber
    doc.serialNumber = lastBook ? lastBook.serialNumber + 1 : 1;
  }
  next();
});

// Check if the models are already compiled to prevent OverwriteModelError
const Membership = mongoose.models.Membership || mongoose.model('Membership', membershipSchema);
const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

module.exports = { Membership, Book };
