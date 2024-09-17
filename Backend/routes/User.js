const express = require("express");
const { User } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
require('dotenv').config();

const router = express.Router();

const userBody = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;

// User Signup
router.post("/signup", async (req, res) => {
    const parsedBody = userBody.safeParse(req.body);

    if (!parsedBody.success) {
        return res.status(411).json({
            message: 'Incorrect input'
        });
    }

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, userId: user._id });
    } catch (error) {
        
        res.status(500).json({ message: 'Error signing up user' });
    }
});

// User Signin
router.post("/signin", async (req, res) => {
    const parsedBody = userBody.safeParse(req.body);

    if (!parsedBody.success) {
        
        return res.status(411).json({
            message: 'Incorrect input'
        });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Error signing in user' });
    }
});

module.exports = router;
