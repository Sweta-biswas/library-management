import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBookOrMovie = () => {
  const [type, setType] = useState('Book');  // 'Book' or 'Movie'
  const [name, setName] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [status, setStatus] = useState('Available');
  const [date, setDate] = useState('');

  const handleConfirm = async () => {
    if (!date) {
      toast.error('Please select a valid date.');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(
        'https://backend-smoky-ten-70.vercel.app/api/v1/admin/update-book-movie',
        {
          type,      // Changed from mediaType to type
          name,      // Changed from mediaName to name
          serialNo,  // Changed from serialNumber to serialNo
          status,
          date,      // Changed from updateDate to date
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
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
              value="Book"
              checked={type === 'Book'}
              onChange={(e) => setType(e.target.value)}
              className="mr-2"
            />
            Book
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="Movie"
              checked={type === 'Movie'}
              onChange={(e) => setType(e.target.value)}
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      {/* Serial No */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Serial Number:</label>
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
          <option value="Available">Available</option>
          <option value="Checked Out">Checked Out</option>
          <option value="Lost">Lost</option>
          <option value="Damaged">Damaged</option>
        </select>
      </div>

      {/* Date */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)} // Update date state
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
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

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default UpdateBookOrMovie;
