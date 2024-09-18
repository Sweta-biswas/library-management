import React from 'react';

const MoviesList = () => {
  // Sample data for the movies (you can replace this with actual data from props or an API)
  const movies = [
    { serialNo: 1, name: 'Movie One', author: 'Director One', category: 'Action', status: 'Available', cost: '$15', procurementDate: '2023-01-05' },
    { serialNo: 2, name: 'Movie Two', author: 'Director Two', category: 'Comedy', status: 'Issued', cost: '$20', procurementDate: '2023-02-18' },
    { serialNo: 3, name: 'Movie Three', author: 'Director Three', category: 'Drama', status: 'Available', cost: '$12', procurementDate: '2023-03-20' },
    // Add more movie data here...
  ];

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Master List of Movies</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 border">Serial No</th>
              <th className="py-2 px-4 border">Name of Movie</th>
              <th className="py-2 px-4 border">Author Name</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Cost</th>
              <th className="py-2 px-4 border">Procurement Date</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border">{movie.serialNo}</td>
                <td className="py-2 px-4 border">{movie.name}</td>
                <td className="py-2 px-4 border">{movie.author}</td>
                <td className="py-2 px-4 border">{movie.category}</td>
                <td className={`py-2 px-4 border ${movie.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>
                  {movie.status}
                </td>
                <td className="py-2 px-4 border">{movie.cost}</td>
                <td className="py-2 px-4 border">{movie.procurementDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default MoviesList;
