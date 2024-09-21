const express = require('express');
const jwt = require('jsonwebtoken'); // For token-based authentication
const { z } = require('zod'); // Import Zod for schema validation
const router = express.Router();
const { Membership, Book } = require('../db'); // Import Membership and Book models from db.js
const { authMiddleware } = require('../middleware');

// JWT Secret (this should be in your environment variables for security)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

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
const addBookSchema = z.object({
  mediaType: z.enum(['book', 'movie'], { message: 'Media type must be either book or movie' }),
  mediaName: z.string().min(1, { message: 'Media name is required' }),
  AuthorName: z.string().min(1, { message: 'Author name is required' }),
  procurementDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid procurement date' }),
  quantity: z.preprocess((value) => Number(value), z.number().min(1, { message: 'Quantity must be at least 1' }).default(1)),
});

// Function to generate a sequential membership ID
async function generateMembershipId() {
  const lastMembership = await Membership.findOne().sort('-membershipId');
  return lastMembership ? lastMembership.membershipId + 1 : 1; // Ensure this returns a number
}

// Function to generate a sequential serial number for books
async function generateSerialNumber() {
  const lastBook = await Book.findOne().sort('-serialNumber');
  return lastBook ? lastBook.serialNumber + 1 : 1; // Ensure the serial number increments correctly
}

// Admin Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    if (username === 'Admin' && password === 'Admin@123') {
      const token = jwt.sign({ username }, JWT_SECRET);
      return res.json({ token, message: 'Admin Logged In Successfully' });
    } else {
      return res.status(401).json({ message: 'Invalid Username or Password' });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors });
    }

    console.error(error);
    res.status(500).json({ message: 'Server Error' });
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
  try {
    const validatedData = addBookSchema.parse(req.body);

    // Generate a sequential serial number and set the default status to 'Available'
    const serialNumber = await generateSerialNumber();

    const newBook = new Book({
      ...validatedData,
      serialNumber,
      status: 'Available', // Default status
    });

    await newBook.save();

    res.status(201).json({ message: 'Book added successfully', serialNumber });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation Error:', error.errors); 
      return res.status(400).json({ message: 'Validation Failed', errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
