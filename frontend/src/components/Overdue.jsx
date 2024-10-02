import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Overdue = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverdueBooks = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');

        // Make the API call to fetch overdue books with the token in the Authorization header
        const response = await axios.get('https://backend-smoky-ten-70.vercel.app/api/v1/report/overdue', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);

        // Set the books data from the response
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching overdue books:', err);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchOverdueBooks();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Overdue Returns</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 border">Serial No Book/Movie</th>
              <th className="py-2 px-4 border">Name of Book/Movie</th>
              <th className="py-2 px-4 border">Membership Id</th>
              <th className="py-2 px-4 border">Date of Issue</th>
              <th className="py-2 px-4 border">Date of Return</th>
              <th className="py-2 px-4 border">Fine Calculations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border">{book.serialNumber}</td>
                <td className="py-2 px-4 border">{book.name}</td>
                <td className="py-2 px-4 border">{book.membershipId}</td>
                <td className="py-2 px-4 border">{new Date(book.issueDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">{new Date(book.returnDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">{book.fine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Overdue;
