const express = require('express');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../db');
const router = express.Router();
require('dotenv').config();

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

router.post('/userlogin', async (req, res) => {
  try {

    const { username, password } = loginSchema.parse(req.body);
    const name=username;

    // Find the user in the database by username
    const user = await User.findOne({ name });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the hashed password in the database with the password provided by the user
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // If the username and password are valid, create a JWT token
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ username }, secret);

    // Return the token to the client
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    // If there's an error, return a 500 status code and the error message
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;