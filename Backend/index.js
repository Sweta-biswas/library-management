const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index");

const app = express();

const allowedOrigins = ['http://localhost:3000', 'https://your-frontend-domain.com'];

// CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use the main router for API routes
app.use("/api/v1", mainRouter);

// For Vercel, we don't need to specify a port or call app.listen()
// Vercel will handle that for us
module.exports = app;