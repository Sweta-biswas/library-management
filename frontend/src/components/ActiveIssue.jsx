import React from 'react';

const Active = () => {
  // Sample data for the books (you can replace this with actual data from props or an API)
  const books = [
    { serialNo: 1, name: 'Book One', MembershipId: 'M01', IssueDate: '2022-01-01', ReturnDate: '2023-01-01' },
    { serialNo: 2, name: 'Movie One', MembershipId: 'M02',IssueDate: '2023-01-01', ReturnDate: '2023-02-15' },
    { serialNo: 3, name: 'Book Three', MembershipId: 'M03',IssueDate: '2023-02-01', ReturnDate: '2023-03-10' },
    // Add more book data here...
  ];

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Active Issues</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 border">Serial No Book/Movie</th>
              <th className="py-2 px-4 border">Name of Book/Movie</th>
              <th className="py-2 px-4 border">Membership Id</th>
              <th className="py-2 px-4 border">Date of Issue</th>
              <th className="py-2 px-4 border">Date of Return</th>
             
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border">{book.serialNo}</td>
                <td className="py-2 px-4 border">{book.name}</td>
                <td className="py-2 px-4 border">{book.MembershipId}</td>
                <td className="py-2 px-4 border">{book.IssueDate}</td>
                <td className="py-2 px-4 border">{book.ReturnDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
      
    </div>
  );
};

export default Active;
