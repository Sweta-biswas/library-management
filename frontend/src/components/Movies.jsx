import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch movie data from the API
  const fetchMovies = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');

      // Make an API call to fetch movies
      const response = await axios.get('http://localhost:5000/api/v1/report/movies-list', {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      });

      // Set the movie data in state
      setMovies(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching movie list:', err);
      setError('Failed to load movie data');
      setLoading(false);
    }
  };

  // useEffect to fetch movies when the component mounts
  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
 console.log()
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Master List of Movies</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 border">Serial No</th>
              <th className="py-2 px-4 border">Name of Movie</th>
              <th className="py-2 px-4 border">Director Name</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Procurement Date</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border">{movie.serialNo}</td>
                <td className="py-2 px-4 border">{movie.name}</td>
                <td className="py-2 px-4 border">{movie.director}</td>
                <td className={`py-2 px-4 border ${movie.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>
                  {movie.status}
                </td>
                <td className="py-2 px-4 border">{new Date(movie.procurementDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoviesList;
