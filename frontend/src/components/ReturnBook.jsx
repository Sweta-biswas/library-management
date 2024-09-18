import React, { useState } from 'react';

const ReturnBook = () => {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleConfirm = () => {
    // Handle confirm logic
    console.log({
      bookName,
      author,
      serialNo,
      issueDate,
      returnDate,
      remarks,
    });
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Return Book</h2>

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
        <textarea
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
          rows="2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Serial No (Mandatory):</label>
        <select
          value={serialNo}
          onChange={(e) => setSerialNo(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        >
          <option>Select Serial No</option>
          <option>001</option>
          <option>002</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Issue Date:</label>
        <input
          type="text"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
          placeholder="MM/DD/YYYY"
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
