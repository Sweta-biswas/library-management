import React, { useState } from 'react';
import axios from 'axios';

const IssueBook = () => {
  const [itemId, setItemId] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [type, setItemType] = useState('book'); // Default to 'Book'
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
   
    try {
      
      const response = await axios.post(
        'https://backend-smoky-ten-70.vercel.app/api/v1/transaction/issue',
        {
          itemId,
          type, // Use the selected item type
          issueDate: new Date(issueDate).toISOString(), // Convert to ISO string format
          returnDate: new Date(returnDate).toISOString(), // Convert to ISO string format
          remarks,
          status: 'Available', // Assuming this is handled server-side by default
          // username will be handled by the backend using the authenticated user
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );

      if (response.status === 201) {
        alert('Item issued successfully');
        // Reset form or redirect user after successful issue
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || 'Failed to issue item');
      } else {
        setError('Network error');
      }
    }
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Issue Item</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
          placeholder="Enter Item ID"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Item Type:</label>
        <select
          value={type}
          onChange={(e) => setItemType(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        >
          <option value="book">Book</option>
          <option value="movie">Movie</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Issue Date:</label>
        <input
          type="datetime-local"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Return Date:</label>
        <input
          type="datetime-local"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Remarks (optional):</label>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
          rows="3"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button className="bg-gray-500 text-white py-2 px-6 rounded-lg">Cancel</button>
        <button
          onClick={handleConfirm}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default IssueBook;
