import React, { useState } from 'react';

const UpdateBookOrMovie = () => {
  const [mediaType, setMediaType] = useState('book'); // For selecting Book or Movie
  const [mediaName, setMediaName] = useState(''); // Textbox or dropdown for book/movie name
  const [serialNo, setSerialNo] = useState(''); // Textbox for serial number
  const [status, setStatus] = useState('available'); // Dropdown for status
  const [updateDate, setUpdateDate] = useState(''); // Calendar for date

  const handleConfirm = () => {
    // Handle confirm logic
    console.log({
      mediaType,
      mediaName,
      serialNo,
      status,
      updateDate,
    });
  };

  return (
    <div className="p-8 bg-blue-100 shadow-xl rounded-2xl max-w-2xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Update Book/Movie</h2>

      {/* Media Type (Book or Movie) */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Select Type:</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="book"
              checked={mediaType === 'book'}
              onChange={(e) => setMediaType(e.target.value)}
              className="mr-2"
            />
            Book
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="movie"
              checked={mediaType === 'movie'}
              onChange={(e) => setMediaType(e.target.value)}
              className="mr-2"
            />
            Movie
          </label>
        </div>
      </div>

      {/* Book/Movie Name */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Book/Movie Name:</label>
        <input
          type="text"
          value={mediaName}
          onChange={(e) => setMediaName(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
        {/* You can also replace this text box with a dropdown if necessary */}
        {/* <select className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300">
          <option>Book 1</option>
          <option>Book 2</option>
        </select> */}
      </div>

      {/* Serial No */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Serial No:</label>
        <input
          type="text"
          value={serialNo}
          onChange={(e) => setSerialNo(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      {/* Status Dropdown */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        >
          <option value="available">Available</option>
          <option value="checked out">Checked Out</option>
          <option value="lost">Lost</option>
          <option value="damaged">Damaged</option>
        </select>
      </div>

      {/* Date */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Date:</label>
        <input
          type="date"
          value={updateDate}
          onChange={(e) => setUpdateDate(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button className="bg-gray-400 text-white py-2 px-6 rounded-xl shadow hover:bg-gray-500 transition duration-300">
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="bg-blue-500 text-white py-2 px-6 rounded-xl shadow hover:bg-green-600 transition duration-300"
        >
          Confirm
        </button>
      </div>

      
    </div>
  );
};

export default UpdateBookOrMovie;
