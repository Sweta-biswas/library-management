const express = require('express');
const jwt = require('jsonwebtoken'); // For token-based authentication
const { z } = require('zod'); // Import Zod for schema validation
const router = express.Router();
const mongoose = require('mongoose');

// JWT Secret (this should be in your environment variables for security)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Define a Zod schema for the login input
const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

// Admin Login Route
router.post('/login', async (req, res) => {
  try {
    // Parse and validate the request body using Zod
    const { username, password } = loginSchema.parse(req.body);

    // Static check: Admin login with predefined credentials
    if (username === 'Admin' && password === 'Admin@123') {
      // Generate a token
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

      // Send the token as a response
      return res.json({ token, message: 'Admin Logged In Successfully' });
    } else {
      // Return invalid credentials message
      return res.status(401).json({ message: 'Invalid Username or Password' });
    }
  } catch (error) {
    // If validation fails, Zod will throw an error
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors });
    }

    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});




// Define the membership schema
const membershipSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  contactNo: String,
  contactAddress: String,
  startDate: Date,
  endDate: Date,
  membershipDuration: String,
});

// Create the Membership model
const Membership = mongoose.model('Membership', membershipSchema);

// Add Membership Route
router.post('/add-membership', async (req, res) => {
  try {
    const {
      FirstName,
      LastName,
      contactNo,
      contactAddress,
      startDate,
      endDate,
      membershipDuration,
    } = req.body;

    // Create a new membership document
    const newMembership = new Membership({
      FirstName,
      LastName,
      contactNo,
      contactAddress,
      startDate,
      endDate,
      membershipDuration,
    });

    // Save the new membership document to the database
    await newMembership.save();

    res.status(201).json({ message: 'Membership added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



module.exports = router;
