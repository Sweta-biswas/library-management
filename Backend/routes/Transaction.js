const express = require('express');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const { Book, Movie, Issue,User, Fine } = require('../db');
const { authMiddleware } = require('../middleware');
const router = express.Router();

require('dotenv').config();

const bookAvailabilitySchema = z.object({
  personId: z.string().optional(),
  itemId: z.string().optional(),
}).refine((data) => data.personId || data.itemId, {
  message: 'Missing itemId or personId query parameter',
});

const movieAvailabilitySchema = z.object({
  personId: z.string().optional(),
  itemId: z.string().optional(),
}).refine((data) => data.personId || data.itemId, {
  message: 'Missing itemId or personId query parameter',
});

const issueSchema = z.object({
  itemId: z.string(),
  issueDate: z.string().datetime(),
  returnDate: z.string().datetime(),
  remarks: z.string().optional(),
  type: z.enum(['book', 'movie']),
});

const returnSchema = z.object({
  itemId: z.string(),
  serialNumber: z.string(),
  issueDate: z.string().datetime(),
  returnDate: z.string().datetime(),
  remarks: z.string().optional(),
  type: z.enum(['book', 'movie']),
});

const fetchIssueDateSchema = z.object({
  name: z.string(),
  authorOrDirector: z.string(),
  serialNumber: z.string(),
});

const calculateFineSchema = z.object({
  actualReturnDate: z.string().datetime(),
  returnDate: z.string().datetime(),
});

const payFineSchema = z.object({
  type: z.enum(['Book', 'Movie']),
  name: z.string(),
  authorOrDirector: z.string(),
  serialNumber: z.string(),
  issueDate: z.string().datetime(),
  returnDate: z.string().datetime(),
  actualReturnDate: z.string().datetime(),
  fine: z.string(),
  finePaid: z.boolean(),
  remarks: z.string().optional(),
 
});


router.get('/books/availability', authMiddleware, async (req, res) => {
  try {
    console.log('Request Query:', req.query); // Log request query to check incoming data

    const { personId, itemId } = bookAvailabilitySchema.parse(req.query);

    console.log('Parsed Data:', { personId, itemId }); // Log parsed data to check if Zod parsing worked correctly

    let book;
    if (itemId) {
      // Decode the itemId if it has URL encoding
      const decodedItemId = decodeURIComponent(itemId);
      book = await Book.findOne({ name: decodedItemId });
      console.log('Book Found by itemId:', book); // Log if book is found by itemId
    } else if (personId) {
      // Decode the personId if necessary (not typical for names, but just in case)
      const decodedPersonId = decodeURIComponent(personId);
      book = await Book.find({ author: decodedPersonId });
      console.log('Book Found by personId:', book); // Log if book is found by personId
    }

    if (!book || book.length === 0) {
      console.log('Book Not Found'); // Log if no book is found
      return res.status(404).json({ error: 'Book not found' });
    }

    if (Array.isArray(book)) {
      return res.json(book.map(b => ({
        name: b.name,
        author: b.author,
        serialNumber: b.serialNumber,
        status: b.status
      })));
    } else {
      return res.json({
        name: book.name,
        author: book.author,
        serialNumber: book.serialNumber,
        status: book.status
      });
    }
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      console.log('Zod Validation Error:', error.issues); // Log Zod validation errors
      return res.status(400).json({ error: error.issues });
    }
    console.error('Error in /books/availability route:', error); // Log any other error
    res.status(500).json({ error: 'Internal server error' });
  }
});

  

router.get('/movies/availability', authMiddleware, async (req, res) => {
  try {
    // Parse and validate the incoming request data using the Zod schema
    const { personId, itemId } = movieAvailabilitySchema.parse(req.query);

    let movie;
    if (itemId) {
      // Find the movie by its ID
      movie = await Movie.findOne({name: itemId});
    } else if (personId) {
      // Find the movie by the director's ID
      movie = await Movie.find({ director: personId });
    }

    if (!movie || movie.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    if (Array.isArray(movie)) {
      // Multiple movies found, return an array of movie objects
      return res.json(movie.map(m => ({
        name: m.name,
        director: m.director,
        status: m.status || false,
        serialNumber: m.serialNumber
      })));
    } else {
      // Single movie found, return a single movie object
      return res.json({
        name: movie.name,
        director: movie.director,
        status: movie.status || false,
        serialNumber: movie.serialNumber
      });
    }
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    console.error('Error in /movies/availability route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/issue', authMiddleware, async (req, res) => {
  
  try {
    const { itemId, issueDate, returnDate, remarks, type } = issueSchema.parse(req.body);

    
    const username = req.username;

    
    const user = await User.findOne({ name: username });

    if (!user) {
      console.log(username)
      return res.status(404).json({ error: 'User not found' });
    }

   
    if (user.status !== 'active') {
      console.log(user.status);
      return res.status(403).json({ error: 'User is not active' });
    }

    let item;
    if (type === 'book') {
      item = await Book.findOne({ name: itemId });
    } else if (type === 'movie') {
      item = await Movie.findOne({ name: itemId });
    }

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

   
    if (item.status !== 'Available' || item.quantity <= 0) {
      return res.status(400).json({ error: 'Item is not available for issue' });
    }

    
    const existingIssue = await Issue.findOne({ itemId: item.name, status: 'issued' });
    if (existingIssue) {
      return res.status(400).json({ error: 'Item is already issued' });
    }

    
    item.quantity -= 1;

    
    if (item.quantity === 0) {
      item.status = 'Unavailable';
    }

    await item.save();

    
    const transaction = new Issue({
      itemId: item.name,
      itemType: type.charAt(0).toUpperCase() + type.slice(1), // Convert 'book' to 'Book' and 'movie' to 'Movie'
      issueDate: new Date(issueDate),
      returnDate: new Date(returnDate),
      remarks,
      username: username, // Add the username to the transaction
    });

    await transaction.save();

    res.status(201).json({ message: 'Item issued successfully', transaction });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      console.log('Zod Validation Error:', error.issues); 
      return res.status(400).json({ error: error.issues });
    }
    console.error('Error in /issue route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/return', authMiddleware, async (req, res) => {
  try {
    const { itemId, serialNumber, issueDate, returnDate, remarks, type } = returnSchema.parse(req.body);

    // Get the username from the decoded JWT token
    const username = req.username;

    // Find the user by username
    const user = await User.findOne({ name: username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user's status is 'active'
    if (user.status !== 'active') {
      return res.status(403).json({ error: 'User is not active' });
    }

    let item;
    if (type === 'book') {
      item = await Book.findOne({name: itemId});
    } else if (type === 'movie') {
      item = await Movie.findOne({name: itemId});
    }

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const issue = await Issue.findOne({ itemId: item.name, username: username, status: 'issued' });
    if (!issue) {
     
      return res.status(400).json({ error: 'Item is not issued to the user' });
    }

    // Check if the serial number matches with the item
    
    if (item.serialNumber !== Number(serialNumber)) {
      
      return res.status(400).json({ error: 'Serial number does not match with the item' });
    }

    // Check if the item is issued to the user
   

    // Increase the quantity of the item by 1
    item.quantity += 1;

    // If the quantity is greater than 0, update the status to 'Available'
    if (item.quantity > 0) {
      item.status = 'Available';
    }

    await item.save();

    // Update the transaction status to 'returned'
    issue.status = 'returned';
    issue.returnDate = new Date(returnDate);
    issue.remarks = remarks;

    await issue.save();

    res.status(200).json({ message: 'Item returned successfully', transaction: issue });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      console.log(error.issues)
      return res.status(400).json({ error: error.issues });
    }
    console.error('Error in /return route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/fetch-issue-date', authMiddleware, async (req, res) => {
  try {
    // Parse and validate the incoming request data using the Zod schema
    const { name, authorOrDirector, serialNumber } = fetchIssueDateSchema.parse(req.body);

    // Find the book or movie based on the name, author/director, and serial number
    let item;
    const book = await Book.findOne({ name, author: authorOrDirector, serialNumber });
    if (book) {
      item = book;
    } else {
      const movie = await Movie.findOne({ name, director: authorOrDirector, serialNumber });
      if (movie) {
        item = movie;
      }
    }

    if (!item) {
      
      return res.status(404).json({ error: 'Item not found' });
    }

    // Find the issue transaction for the item
    console.log(item.name)
    const issue = await Issue.findOne({ itemId: item.name, status: 'issued' });

    if (!issue) {
      console.log(issue)
      return res.status(404).json({ error: 'Issue transaction not found' });
    }

    res.status(200).json({ issueDate: issue.issueDate, returnDate: issue.returnDate });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    console.error('Error in /fetch-issue-date route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/calculate-fine', authMiddleware, async (req, res) => {
  try {
    // Parse and validate the incoming request data using the Zod schema
    const { actualReturnDate, returnDate } = calculateFineSchema.parse(req.body);

    // Calculate the fine
    const actualReturnDateObj = new Date(actualReturnDate);
    actualReturnDateObj.setHours(0, 0, 0, 0); // Set time to 00:00:00
    const returnDateObj = new Date(returnDate);
    returnDateObj.setHours(0, 0, 0, 0); // Set time to 00:00:00
    const diffTime = Math.abs(actualReturnDateObj - returnDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let fine = 0;
    if (actualReturnDateObj > returnDateObj) {
      fine = 50 + (diffDays - 1) * 10; // Initial fine of Rs 50 plus Rs 10 per day
    }

    res.status(200).json({ fine });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      console.log(error.issues)
      return res.status(400).json({ error: error.issues });
    }
    console.error('Error in /calculate-fine route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/pay-fine', authMiddleware, async (req, res) => {
  try {
    // Parse and validate the incoming request data using the Zod schema
    const { type, name, authorOrDirector, serialNumber, issueDate, returnDate, actualReturnDate, fine, finePaid, remarks} = payFineSchema.parse(req.body);
   
    const username = req.username;

    
    let issue;
    if (type === 'Book') {
      // Search for the Book document with the matching name, author, and serialNumber
      const book = await Book.findOne({ name, author: authorOrDirector, serialNumber });
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
    
      // Find the Issue document with the matching itemType, itemId, and status
      issue = await Issue.findOne({
        itemType: type,
        itemId: book.name,
        status: 'issued',
      });
    }
      
    else if (type === 'Movie') {
      // Search for the Movie document with the matching name, director, and serialNumber
      const movie = await Movie.findOne({ name, director: authorOrDirector, serialNumber });
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }

      // Find the Issue document with the matching itemType, itemId, and status
      issue = await Issue.findOne({
        itemType: type,
        itemId: movie.name,
        status: 'issued',
      });
    } else {
      return res.status(400).json({ error: 'Invalid item type' });
    }
    
    if (!issue) {
      
      return res.status(404).json({ error: 'Issue not found' });
    }

    // Check if the finePaid boolean is true
    if (finePaid) {
      // Check if the username matches
      if (issue.username !== req.username) {
        return res.status(403).json({ error: 'Unauthorized to pay fine for this issue' });
      }
    
      // Change the status field to "returned"
      issue.status = 'returned';
      await issue.save();
    
      // Create a new Fine document with the issue data
      const fine_save = new Fine({
        type,
        name,
        authorOrDirector,
        serialNumber,
        issueDate,
        returnDate,
        actualReturnDate,
        fine,
        finePaid,
        remarks,
        username,
      });
    
      // Save the Fine document to the database
      await fine_save.save();
    
      res.status(200).json({ message: 'Fine paid successfully' });
    } else {
      res.status(400).json({ error: 'Fine has not been paid' });
    }
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      console.log(error.issues);
      return res.status(400).json({ error: error.issues });
    }
    console.error('Error in /pay-fine route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;