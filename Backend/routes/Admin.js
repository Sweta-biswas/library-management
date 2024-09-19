const express = require('express');
const jwt = require('jsonwebtoken'); // For token-based authentication
const { z } = require('zod'); // Import Zod for schema validation
const router = express.Router();
const Membership = require('../db'); // Import Membership model from db.js
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

// Function to generate a sequential membership ID
async function generateMembershipId() {
  const lastMembership = await Membership.findOne().sort('-membershipId');
  return lastMembership ? lastMembership.membershipId + 1 : 1; // Ensure this returns a number
}


// Admin Login Route
router.post('/login', async (req, res) => {
  try {
    // Parse and validate the request body using Zod
    const { username, password } = loginSchema.parse(req.body);

    // Static check: Admin login with predefined credentials
    if (username === 'Admin' && password === 'Admin@123') {
      // Generate a token
      const token = jwt.sign({ username }, JWT_SECRET);

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

// Add Membership Route
router.post('/add-membership', authMiddleware, async (req, res) => {
  try {
    const validatedData = addMembershipSchema.parse(req.body);

    const existingMembership = await Membership.findOne({ AadharCardNo: validatedData.AadharCardNo });

    if (existingMembership) {
      return res.status(400).json({ message: 'Aadhar card number already exists' });
    }

    // Generate a new membership ID
    const membershipId =(await generateMembershipId());
  

    // Create a new membership document with the generated ID
    const newMembership = new Membership({ ...validatedData, membershipId });

    await newMembership.save();

    res.status(201).json({ message: 'Membership added successfully', membershipId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors to the client
      console.log(error.message)
      return res.status(400).json({ message: 'Validation Failed', errors: error.errors });
    }

    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Update Membership Route
router.put('/update-membership', authMiddleware, async (req, res) => {
  try {
    // Convert membershipId to a number before validating
    req.body.membershipId = Number(req.body.membershipId);

    // Validate the request body using Zod
    const validatedData = updateMembershipSchema.parse(req.body);

    // Find the member by membership ID
    const existingMember = await Membership.findOne({ membershipId: validatedData.membershipId });

    if (!existingMember) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    // Update the member's start date, end date, and membership duration
    existingMember.startDate = validatedData.startDate;
    existingMember.endDate = validatedData.endDate;
    existingMember.membershipDuration = validatedData.membershipDuration;

    // Save the updated member
    await existingMember.save();

    res.status(200).json({ message: 'Membership updated successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors to the client
      return res.status(400).json({ message: 'Validation Failed', errors: error.errors });
    }

    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router; 