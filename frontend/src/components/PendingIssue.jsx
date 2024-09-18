import React from 'react';

const Active = () => {
  // Sample data for the books (you can replace this with actual data from props or an API)
  const books = [
    { MembershipId: 'M01',name: 'Book One', requestDate: '2022-01-01', fulfillDate: '2023-01-01' },
    {  MembershipId: 'M02', name: 'Movie One',requestDate: '2023-01-01', fulfillDate: '2023-02-15' },
    { MembershipId: 'M03', name: 'Book Three',requestDate: '2023-02-01', fulfillDate: '2023-03-10' },
    // Add more book data here...
  ];

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Issues Requests</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 border">Membership Id</th>
              <th className="py-2 px-4 border">Name of Book/Movie</th>
              <th className="py-2 px-4 border">Date of Request</th>
              <th className="py-2 px-4 border">Date of Request Fullfillment</th>
             
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border">{book.MembershipId}</td>
                <td className="py-2 px-4 border">{book.name}</td>
                <td className="py-2 px-4 border">{book.requestDate}</td>
                <td className="py-2 px-4 border">{book.fulfillDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default Active;
