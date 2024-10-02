import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Active = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch active issues data from the API
  useEffect(() => {
    const fetchActiveIssues = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');

        // Make the API call with the token in the headers
        const response = await axios.get('https://backend-smoky-ten-70.vercel.app/api/v1/report/active-issue', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set the fetched data to the state
        setIssues(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch active issues');
        setLoading(false);
      }
    };

    fetchActiveIssues();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Active Issues</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 border">Serial No</th>
              <th className="py-2 px-4 border">Name of Book/Movie</th>
              <th className="py-2 px-4 border">Membership Id</th>
              <th className="py-2 px-4 border">Date of Issue</th>
              <th className="py-2 px-4 border">Date of Return</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border">{issue.serialNumber}</td>
                <td className="py-2 px-4 border">{issue.name}</td>
                <td className="py-2 px-4 border">{issue.membershipId}</td>
                <td className="py-2 px-4 border">{new Date(issue.issueDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">{new Date(issue.returnDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Active;
