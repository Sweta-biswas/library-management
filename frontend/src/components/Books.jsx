import React from 'react';

const BooksList = () => {
  // Sample data for the books (you can replace this with actual data from props or an API)
  const books = [
    { serialNo: 1, name: 'Book One', author: 'Author One', category: 'Fiction', status: 'Available', cost: '$10', procurementDate: '2023-01-01' },
    { serialNo: 2, name: 'Book Two', author: 'Author Two', category: 'Science', status: 'Issued', cost: '$12', procurementDate: '2023-02-15' },
    { serialNo: 3, name: 'Book Three', author: 'Author Three', category: 'History', status: 'Available', cost: '$8', procurementDate: '2023-03-10' },
    // Add more book data here...
  ];

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Master List of Books</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 border">Serial No</th>
              <th className="py-2 px-4 border">Name of Book</th>
              <th className="py-2 px-4 border">Author Name</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Cost</th>
              <th className="py-2 px-4 border">Procurement Date</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border">{book.serialNo}</td>
                <td className="py-2 px-4 border">{book.name}</td>
                <td className="py-2 px-4 border">{book.author}</td>
                <td className="py-2 px-4 border">{book.category}</td>
                <td className={`py-2 px-4 border ${book.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>
                  {book.status}
                </td>
                <td className="py-2 px-4 border">{book.cost}</td>
                <td className="py-2 px-4 border">{book.procurementDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer Section */}
     
    </div>
  );
};

export default BooksList;
