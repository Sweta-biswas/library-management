import React, { useState } from 'react';

const BookAvailability = () => {
  const [bookList, setBookList] = useState([]);

  const handleSearch = () => {
    // Simulate search result
    setBookList([
      { name: 'Book A', author: 'Author A', serial: '001', available: 'Y' },
      { name: 'Book B', author: 'Author B', serial: '002', available: 'Y' },
      { name: 'Book C', author: 'Author C', serial: '003', available: 'N' }
    ]);
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Check Book Availability</h2>

      {/* Dropdowns */}
      <div className="mb-4 flex items-center">
        <label className="mr-2">Enter Book Name: </label>
        <select className="border p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          <option>Select Book</option>
          <option>Book A</option>
          <option>Book B</option>
        </select>
      </div>
      <div className="mb-4 flex items-center">
        <label className="mr-2">Enter Author: </label>
        <select className="border p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          <option>Select Author</option>
          <option>Author A</option>
          <option>Author B</option>
        </select>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-6 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        Search
      </button>

      {/* Table */}
      {bookList.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <table className="table-auto w-full text-left text-gray-800">
            <thead className="bg-gray-100 rounded-md">
              <tr>
                <th className="px-6 py-4 border">Book Name</th>
                <th className="px-6 py-4 border">Author Name</th>
                <th className="px-6 py-4 border">Serial Number</th>
                <th className="px-6 py-4 border">Available</th>
                <th className="px-6 py-4 border">Issue</th>
              </tr>
            </thead>
            <tbody>
              {bookList.map((book, index) => (
                <tr key={index} className="hover:bg-blue-100 transition-all duration-300">
                  <td className="px-6 py-4 border">{book.name}</td>
                  <td className="px-6 py-4 border">{book.author}</td>
                  <td className="px-6 py-4 border">{book.serial}</td>
                  <td className="px-6 py-4 border">{book.available}</td>
                  <td className="px-6 py-4 border text-center">
                    <input type="radio" name="issue" disabled={book.available === 'N'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="w-full max-w-6xl flex justify-end mt-4">
        <button className="text-red-500 hover:underline">Log Out</button>
      </div>
    </div>
  );
};

export default BookAvailability;
