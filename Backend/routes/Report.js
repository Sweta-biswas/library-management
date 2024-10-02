const express = require('express');
const router = express.Router();
const { z } = require('zod');
const { Issue, Book, Movie, Membership, Fine } = require('../db');
const { authMiddleware } = require('../auth');

// Define Zod schema to validate the issue data
const issueSchema = z.object({
  itemId: z.string().nonempty(),
  itemType: z.enum(['Book', 'Movie']),
  issueDate: z.date(),
  returnDate: z.date(),
  username: z.string().nonempty(),
});


// Zod schema for validating query parameters (if any)
const membershipListQuerySchema = z.object({
    page: z.string().optional(),  // Pagination
    limit: z.string().optional()  // Limit number of memberships returned
  });
  
  // Zod schema for validating membership data
  const membershipSchema = z.object({
    membershipId: z.number(),
    FirstName: z.string(),
    LastName: z.string(),
    contactNo: z.string(),
    contactAddress: z.string(),
    AadharCardNo: z.string(),
    startDate: z.date(),
    endDate: z.date(),
  });
  
  // Zod schema for fine data
  const fineSchema = z.object({
    fine: z.number(),
  });
  

// Route to get active issues (books/movies)
router.get('/active-issue', authMiddleware, async (req, res) => {
  try {
    // Fetch all active issues from the database
    const activeIssues = await Issue.find({ status: 'issued' });

    // Validate the active issues using Zod
    const validatedIssues = activeIssues.map((issue) => issueSchema.parse(issue));

    // Map through the validated issues to gather the required data
    const issuesWithDetails = await Promise.all(
      validatedIssues.map(async (issue) => {
        // Destructure the issue object
        const { itemId, itemType, issueDate, returnDate, username } = issue;

        // Find the serial number based on the itemType (Book or Movie)
        let serialNumber, name;
        if (itemType === 'Book') {
          const book = await Book.findOne({ name: itemId });
          if (book) {
            serialNumber = book.serialNumber;
            name = book.name;
          }
        } else if (itemType === 'Movie') {
          const movie = await Movie.findOne({ name: itemId });
          if (movie) {
            serialNumber = movie.serialNumber;
            name = movie.name;
          }
        }

        // Fetch membership ID from the Membership collection based on the first name (username)
        const membership = await Membership.findOne({ FirstName: username });
        const membershipId = membership ? membership.membershipId : null;

        // Return the required data
        return {
          serialNumber,
          name,
          membershipId,
          issueDate,
          returnDate,
        };
      })
    );

    // Send the detailed active issues back to the frontend
    res.status(200).json(issuesWithDetails);
  } catch (error) {
    console.error('Error fetching active issues:', error);
    res.status(500).json({ error: 'Failed to fetch active issues' });
  }
});

  // /membership-list route
  router.get('/membership-list', authMiddleware, async (req, res) => {
    try {
      // Step 1: Validate query parameters (if any)
      const queryValidation = membershipListQuerySchema.safeParse(req.query);
      if (!queryValidation.success) {
        return res.status(400).json({ error: queryValidation.error.errors });
      }
  
      // Step 2: Fetch all memberships
      const memberships = await Membership.find();
  
      // Step 3: Validate membership data fetched from the database using Zod schema
      const validMemberships = memberships.map((member) => {
        const validation = membershipSchema.safeParse(member);
        if (!validation.success) {
          console.error('Membership data validation failed', validation.error);
          return null;
        }
        return member;
      }).filter(Boolean); // Remove invalid entries
  
      // Step 4: Iterate over valid memberships to build response data
      const results = await Promise.all(
        validMemberships.map(async (member) => {
          // Check the issue collection to find if there is a username that matches the membership
          const issue = await Issue.findOne({ username: member.FirstName });
  
          if (!issue) {
            return null; // Skip if no issue found for this member
          }
  
          // Determine the membership status (Active/Inactive)
          const currentDate = new Date();
          const endDate = new Date(member.endDate);
          const status = endDate < currentDate ? 'Inactive' : 'Active';
  
                 // Check for active fines using the username (stored in Fine collection)
        const fine = await Fine.findOne({ username: member.FirstName, type: { $in: ['Book', 'Movie'] } });

        // Validate fine using Zod
        let activeFine = '$0';
        if (fine) {
          const fineValidation = fineSchema.safeParse(fine);
          if (fineValidation.success) {
            activeFine = `$${fine.fine}`;
          } else {
            console.error('Fine data validation failed', fineValidation.error);
          }
        }

          
          return {
            membershipId: member.membershipId,
            name: `${member.FirstName} ${member.LastName}`,
            contactNo: member.contactNo,
            contactAddress: member.contactAddress,
            aadharCardNo: member.AadharCardNo,
            startDate: member.startDate,
            endDate: member.endDate,
            status, // Active or Inactive
            fine: activeFine // Fine amount or $0
          };
        })
      );
  
      // Filter out null values
      const filteredResults = results.filter(Boolean);
  
      // Step 6: Send the final response
      return res.status(200).json(filteredResults);
  
    } catch (error) {
      console.error('Error fetching membership list:', error);
      return res.status(500).json({ error: 'An error occurred while fetching the membership list.' });
    }
  });
  

  router.get('/movies-list', authMiddleware, async (req, res) => {
    try {
      // Fetch only the required fields from the 'movies' collection
      const movies = await Movie.find({}, 'serialNumber name director status procurementDate');
  
      // Check if any movies were found
      if (!movies || movies.length === 0) {
        return res.status(404).json({ message: 'No movies found.' });
      }
  
      // Map the data to match the front-end structure
      const movieList = movies.map(movie => ({
        serialNo: movie.serialNumber,
        name: movie.name,
        director: movie.director,
        status: movie.status,
        procurementDate: movie.procurementDate
      }));
  
      // Respond with the mapped movie data
      res.status(200).json(movieList);
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ message: 'Server error while fetching movies.' });
    }
  });

  router.get('/books-list', authMiddleware, async (req, res) => {
    try {
      // Fetch only the required fields from the books collection
      const books = await Book.find({}, 'serialNumber name author status procurementDate');
  
      // Check if any books were found
      if (!books || books.length === 0) {
        return res.status(404).json({ message: 'No books found.' });
      }
  
      // Map the fetched books data to the desired structure
      const bookList = books.map(book => ({
        serialNo: book.serialNumber,
        name: book.name,
        author: book.author,
        status: book.status,
        procurementDate: book.procurementDate
      }));
  
      // Respond with the mapped book data
      res.status(200).json(bookList);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Server error while fetching books.' });
    }
  });

  router.get('/overdue', authMiddleware, async (req, res) => {
    try {
      const currentDate = new Date();
  
      // Fetch all issues that are overdue
      const overdueIssues = await Issue.find({
        status: 'issued',
        returnDate: { $lt: currentDate }
      });
  
      // Validate the overdue issues using Zod
      const validatedIssues = overdueIssues.map((issue) => issueSchema.parse(issue));
  
      // Map through the validated issues to gather the required data
      const issuesWithDetails = await Promise.all(
        validatedIssues.map(async (issue) => {
          const { itemId, itemType, issueDate, returnDate, username } = issue;
  
          // Find the serial number and name based on the itemType (Book or Movie)
          let serialNumber, name;
          if (itemType === 'Book') {
            const book = await Book.findOne({ name: itemId });
            if (book) {
              serialNumber = book.serialNumber;
              name = book.name;
            }
          } else if (itemType === 'Movie') {
            const movie = await Movie.findOne({ name: itemId });
            if (movie) {
              serialNumber = movie.serialNumber;
              name = movie.name;
            }
          }
  
          // Fetch membership ID based on username (first name)
          const membership = await Membership.findOne({ FirstName: username });
          const membershipId = membership ? membership.membershipId : null;
  
          // Return the required data
          return {
            serialNumber,
            name,
            membershipId,
            issueDate,
            returnDate,
            fine: calculateFine(issueDate, returnDate) // Implement this function if you have fine logic
          };
        })
      );
  
      // Send the detailed overdue issues back to the frontend
      res.status(200).json(issuesWithDetails);
    } catch (error) {
      console.error('Error fetching overdue issues:', error);
      res.status(500).json({ error: 'Failed to fetch overdue issues' });
    }
  });
  
  // Optional: Function to calculate fines
  const calculateFine = (issueDate, returnDate) => {
    const overdueDays = Math.ceil((new Date() - returnDate) / (1000 * 60 * 60 * 24));
    return overdueDays > 0 ? overdueDays * 10 : 0; // Example fine rate of 10 per day
  };
  
  
module.exports = router;
