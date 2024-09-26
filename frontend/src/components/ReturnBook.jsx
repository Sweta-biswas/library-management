import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReturnBook = () => {
  const [itemName, setItemName] = useState('');
  const [authorOrDirector, setAuthorOrDirector] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [itemType, setItemType] = useState('book');
  const [error, setError] = useState('');

  useEffect(() => {
    if (itemName && serialNumber) {
      fetchIssueDate();
    }
  }, [itemName, serialNumber]);

  const fetchIssueDate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/v1/transaction/fetch-issue-date',
        { name: itemName, authorOrDirector, serialNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIssueDate(response.data.issueDate);
    } catch (error) {
      setError('Failed to fetch issue date. Please check the item details.');
    }
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      const formattedReturnDate = new Date(returnDate).toISOString();
      const response = await axios.post(
        'http://localhost:5000/api/v1/transaction/return',
        {
          itemId: itemName,
          serialNumber,
          issueDate,
          returnDate: formattedReturnDate,
          remarks,
          type: itemType
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Item returned successfully:', response.data);
      // Reset form or show success message
    } catch (error) {
      setError('Failed to return the item. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Return Item</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-4">
        <label className="block mb-2">Item Type:</label>
        <select
          value={itemType}
          onChange={(e) => setItemType(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        >
          <option value="book">Book</option>
          <option value="movie">Movie</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Enter Item Name:</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Enter {itemType === 'book' ? 'Author' : 'Director'}:</label>
        <input
          type="text"
          value={authorOrDirector}
          onChange={(e) => setAuthorOrDirector(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Serial Number (Mandatory):</label>
        <input
          type="text"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Issue Date:</label>
        <input
          type="text"
          value={issueDate}
          readOnly
          className="w-full border p-2 rounded-lg shadow-md bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Return Date:</label>
        <input
          type="date"
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

export default ReturnBook;
