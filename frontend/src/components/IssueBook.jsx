import React, { useState } from 'react';

const IssueBook = () => {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleConfirm = () => {
    // Handle confirm logic
    console.log({
      bookName,
      author,
      issueDate,
      returnDate,
      remarks,
    });
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Book Issue</h2>

      <div className="mb-4">
        <label className="block mb-2">Enter Book Name:</label>
        <select
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        >
          <option>Select Book</option>
          <option>Book A</option>
          <option>Book B</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Enter Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Issue Date:</label>
        <input
          type="date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
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
      <div className="w-full max-w-6xl flex justify-end mt-4">
        <button className="text-red-500 hover:underline">Log Out</button>
      </div>
    </div>
  );
};

export default IssueBook;
