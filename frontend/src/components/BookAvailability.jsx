import React, { useState } from 'react';
import axios from 'axios';

const ItemAvailability = () => {
  const [items, setItems] = useState([]);
  const [itemType, setItemType] = useState('book');
  const [searchBy, setSearchBy] = useState('itemId');
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/transaction/${itemType}s/availability`, {
        params: {
          [searchBy]: encodeURIComponent(searchValue)
        },
        headers: {
          Authorization: `Bearer ${token}` // Add the token to the Authorization header
        }
      });
      setItems(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during the search');
      setItems([]);
    }
  };
  

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Check Item Availability</h2>

      <div className="mb-4 flex items-center">
        <label className="mr-2">Item Type: </label>
        <select 
          value={itemType} 
          onChange={(e) => setItemType(e.target.value)}
          className="border p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="book">Book</option>
          <option value="movie">Movie</option>
        </select>
      </div>

      <div className="mb-4 flex items-center">
        <label className="mr-2">Search By: </label>
        <select 
          value={searchBy} 
          onChange={(e) => setSearchBy(e.target.value)}
          className="border p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="itemId">Name</option>
          <option value="personId">{itemType === 'book' ? 'Author' : 'Director'}</option>
        </select>
      </div>

      <div className="mb-4 flex items-center">
        <label className="mr-2">Search Value: </label>
        <input 
          type="text" 
          value={searchValue} 
          onChange={(e) => setSearchValue(e.target.value)}
          className="border p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-6 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        Search
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {items.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <table className="table-auto w-full text-left text-gray-800">
            <thead className="bg-gray-100 rounded-md">
              <tr>
                <th className="px-6 py-4 border">Name</th>
                <th className="px-6 py-4 border">{itemType === 'book' ? 'Author' : 'Director'}</th>
                <th className="px-6 py-4 border">Serial Number</th>
                <th className="px-6 py-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="hover:bg-blue-100 transition-all duration-300">
                  <td className="px-6 py-4 border">{item.name}</td>
                  <td className="px-6 py-4 border">{item.author || item.director}</td>
                  <td className="px-6 py-4 border">{item.serialNumber}</td>
                  <td className="px-6 py-4 border">{item.status ? 'Available' : 'Not Available'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ItemAvailability;
