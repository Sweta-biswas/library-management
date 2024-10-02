const express = require('express');
const jwt = require('jsonwebtoken'); // For token-based authentication
const { z } = require('zod'); // Import Zod for schema validation
const router = express.Router();
const { Membership, Book, User, Movie } = require('../db'); // Import Membership and Book models from db.js
const { authMiddleware } = require('../auth');
const bcrypt= require('bcrypt');

// // JWT Secret (this should be in your environment variables for security)
// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Define a Zod schema for the login input
const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

const addMembershipSchema = z.object({
  FirstName: z.string().min(1, { message: 'First Name is required' }),
  LastName: z.string().min(1, { message: 'Last Name is required' }),
  contactNo: z.string().min(10, { message: 'Contact Number must be at least 10 digits' }).max(15, { message: 'Contact Number cannot exceed 15 digits' }),
  AadharCardNo: z.string().length(12, { message: 'Aadhar Card Number must be 12 digits' }),
  contactAddress: z.string().min(1, { message: 'Contact Address is required' }),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid start date' }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid end date' }),
  membershipDuration: z.enum(['six months', 'one year', 'two years'], { errorMap: () => ({ message: 'Invalid membership duration' }) }),
});

const updateMembershipSchema = z.object({
  membershipId: z.number().positive('Membership ID must be a positive number'),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid start date' }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid end date' }),
  membershipDuration: z.enum(['six months', 'one year', 'two years'], { errorMap: () => ({ message: 'Invalid membership duration' }) }),
});

// Define the add-book schema
const bookMovieSchema = z.object({
  type: z.enum(['Book', 'Movie']),
  name: z.string().min(1),
  author: z.string().optional(), // Make author field optional
  director: z.string().optional(), // Add director field
  procurementDate: z.string().min(1),
  quantity: z.number().min(1),
}).refine((data) => {
  // Add conditional validation based on the type
  if (data.type === 'Book') {
    return data.author !== undefined;
  } else if (data.type === 'Movie') {
    return data.director !== undefined;
  }
  return false;
}, 'Either author or director is required');



// Function to generate a sequential membership ID
async function generateMembershipId() {
  const lastMembership = await Membership.findOne().sort('-membershipId');
  return lastMembership ? lastMembership.membershipId + 1 : 1; // Ensure this returns a number
}




// Zod schema for updating Book/Movie status and date
const updateBookMovieSchema = z.object({
    type: z.enum(['Book', 'Movie']),
    name: z.string().min(1),
    serialNo: z.string().min(1),
    status: z.enum(['Available', 'Checked Out', 'Lost', 'Damaged']),
    date: z.string().min(1),
  });




const userSchema = z.object({
  userType: z.enum(['New User', 'Existing User']),
  name: z.string().min(1),
  password: z.string().optional(), // Allows the password field to be empty
  status: z.enum(['active', 'inactive']),
  admin: z.boolean(),
  });


// Admin Login Route
router.post('/login', async (req, res) => {
  // Try to parse the request body with the schema
  const result = loginSchema.safeParse(req.body);
  
  // If the data is invalid, return a 400 status code and the errors
  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  const { username, password } = result.data;

  try {
    // First, check if username is 'admin'
    if (username === 'Admin' && password === 'Admin@123') {
      // If credentials are valid, create a JWT
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign({ username }, secret);
      return res.status(200).json({ message: 'Login successful', token });
    }

    // If not 'admin', check if the username exists in the User model and admin field is true
    const user = await User.findOne({ name: username, admin: true });

    // If user is found, compare the provided password with the hashed password in the database
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      // If passwords match, generate a JWT
      if (passwordMatch) {
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign({ username }, secret);
        return res.status(200).json({ message: 'Login successful', token });
      }
    }

    // If credentials are invalid, return a 401 status
    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    // Catch and handle any errors that occur
    return res.status(500).json({ message: 'An error occurred during login', error });
   }
  });
// Add Membership Route
router.post('/add-membership', authMiddleware, async (req, res) => {
  try {
    const validatedData = addMembershipSchema.parse(req.body);

    const existingMembership = await Membership.findOne({ AadharCardNo: validatedData.AadharCardNo });

    if (existingMembership) {
      return res.status(400).json({ message: 'Aadhar card number already exists' });
    }

    const membershipId = await generateMembershipId();
    const newMembership = new Membership({ ...validatedData, membershipId });

    await newMembership.save();
    res.status(201).json({ message: 'Membership added successfully', membershipId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation Failed', errors: error.errors });
    }
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update Membership Route
router.put('/update-membership', authMiddleware, async (req, res) => {
  try {
    req.body.membershipId = Number(req.body.membershipId);
    const validatedData = updateMembershipSchema.parse(req.body);

    const existingMember = await Membership.findOne({ membershipId: validatedData.membershipId });

    if (!existingMember) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    existingMember.startDate = validatedData.startDate;
    existingMember.endDate = validatedData.endDate;
    existingMember.membershipDuration = validatedData.membershipDuration;

    await existingMember.save();
    res.status(200).json({ message: 'Membership updated successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation Failed', errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add Books Route
router.post('/add-books', authMiddleware, async (req, res) => {
 
  // Try to parse the request body with the schema
    const result = bookMovieSchema.safeParse(req.body);
      
    // If the data is invalid, return a 400 status code and the errors
    if (!result.success) {
   
      return res.status(400).json({ errors: result.error.format() });
    }

    const { type, name, author, director, procurementDate, quantity } = result.data;

    try {
      let document;
      let lastDocument;
      let lastSerialNumber;

      if (type === 'Book') {
        // Check if the book already exists
        const existingBook = await Book.findOne({ name, author });
        if (existingBook) {
          return res.status(400).json({ message: 'Book already exists' });
        }

        // Find the last book in the database
        lastDocument = await Book.findOne().sort('-serialNumber');
        lastSerialNumber = lastDocument ? lastDocument.serialNumber : 0;

        // Generate a sequential serial number
        const serialNumber = lastSerialNumber + 1;

        document = new Book({ name, author, procurementDate, quantity, serialNumber });
      } else {
        // Check if the movie already exists
        const existingMovie = await Movie.findOne({ name, director });
        if (existingMovie) {
          return res.status(400).json({ message: 'Movie already exists' });
        }

        // Find the last movie in the database
        lastDocument = await Movie.findOne().sort('-serialNumber');
        lastSerialNumber = lastDocument ? lastDocument.serialNumber : 0;

        // Generate a sequential serial number
        const serialNumber = lastSerialNumber + 1;

        document = new Movie({ name, director, procurementDate, quantity, serialNumber });
      }

      // Save the document to the database
      await document.save();

      res.status(200).json({ message: `${type} added successfully, lastSerialNumber` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Error adding ${type}` });
    }
    });


// Update Book/Movie Route
router.put('/update-book-movie', authMiddleware, async (req, res) => {
  // Try to parse the request body with the schema
  const result = updateBookMovieSchema.safeParse(req.body);
    
  
  // If the data is invalid, return a 400 status code and the errors
  if (!result.success) {
    console.log(result.error);
    return res.status(400).json({ errors: result.error.format() });
  }

  const { type, name, serialNo, status, date } = result.data;
  const serialNumber=serialNo

  try {
    let document;

    if (type === 'Book') {
      // Find the book by name and serialNo
      document = await Book.findOne({ name, serialNumber });
    } else {
      // Find the movie by name and serialNo
      document = await Movie.findOne({ name, serialNumber });
    }

    if (!document) {
      return res.status(404).json({ message: `${type} not found` });
    }

    // Update the book/movie information
    document.status = status;
    document.procurementDate = date;

    // Save the updated book/movie to the database
    await document.save();

    res.status(200).json({ message: `${type} updated successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error updating ${type}` });
  }
});



router.post('/manageuser', authMiddleware, async (req, res) => {

  try {
    // Parse the request body against the schema
    
    const { userType, name, password, status, admin } = userSchema.parse(req.body);
    console.log(req.body);
    let user;
    if (userType === 'New User') {
      // Check if the user already exists
      const existingUser = await User.findOne({ name });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      // Hash and salt the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("a");
      // Create a new user with the hashed password
     
      user = new User({ name, password: hashedPassword, status, admin });
    } else {
      // Update an existing user
      user = await User.findOneAndUpdate({ name }, { status, admin }, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // If the password is provided, hash and salt it and update the user's password
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
    }

    // Save the user to the database
    await user.save();

    res.status(200).json({ message: 'User managed successfully', data: user });
  } catch (error) {
    console.log(error.errors);
  }
});


module.exports = router;
