import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch books from the backend API
  const fetchBooks = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');

      // Make an API call to get the list of books
      const response = await axios.get('https://backend-smoky-ten-70.vercel.app/api/v1/report/books-list', {
        headers: {
          Authorization: `Bearer ${token}` // Pass the token in the Authorization header
        }
      });

      // Update the state with the fetched books data
      setBooks(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books.');
      setLoading(false);
    }
  };

  // Use useEffect to fetch data when the component is mounted
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Master List of Books</h2>

      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading books...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-2 px-4 border">Serial No</th>
                <th className="py-2 px-4 border">Name of Book</th>
                <th className="py-2 px-4 border">Author Name</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Procurement Date</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border">{book.serialNo}</td>
                  <td className="py-2 px-4 border">{book.name}</td>
                  <td className="py-2 px-4 border">{book.author}</td>
                  <td
                    className={`py-2 px-4 border ${
                      book.status === 'Available' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {book.status}
                  </td>
                  <td className="py-2 px-4 border">{new Date(book.procurementDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BooksList;
