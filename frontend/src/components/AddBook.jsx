import React, { useState } from 'react';

const AddBookOrMovie = () => {
  const [mediaType, setMediaType] = useState('book'); // For selecting Book or Movie
  const [mediaName, setMediaName] = useState('');
  const [procurementDate, setProcurementDate] = useState('');
  const [quantity, setQuantity] = useState(1); // Default to 1

  const handleConfirm = () => {
    // Handle confirm logic
    console.log({
      mediaType,
      mediaName,
      procurementDate,
      quantity,
    });
  };

  return (
    <div className="p-8 bg-blue-100 shadow-xl rounded-2xl max-w-2xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Add Book/Movie</h2>

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
      </div>

      {/* Date of Procurement */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Date of Procurement:</label>
        <input
          type="date"
          value={procurementDate}
          onChange={(e) => setProcurementDate(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      {/* Quantity/Copies */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Quantity/Copies:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          min="1"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button className="bg-gray-400 text-white py-2 px-6 rounded-xl shadow hover:bg-gray-500 transition duration-300">
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="bg-blue-500 text-white py-2 px-6 rounded-xl shadow hover:bg-blue-600 transition duration-300"
        >
          Confirm
        </button>
      </div>

      
    </div>
  );
};

export default AddBookOrMovie;
