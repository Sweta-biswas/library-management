import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Membership = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchMemberships = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        // Make the API call with the token in the headers
        const response = await axios.get('http://localhost:5000/api/v1/report/membership-list', {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token for authorization
          },
        });
      console.log(response.data);
        setMembers(response.data); // Set the data fetched from the API
        setLoading(false); // Mark loading as false
      } catch (err) {
        console.error('Error fetching membership data:', err);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchMemberships(); // Call the fetch function when the component loads
  }, []); // Empty dependency array means this effect runs only once after initial render

  // Loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">List of Active Members</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 border">Membership Id</th>
              <th className="py-2 px-4 border">Name of Member</th>
              <th className="py-2 px-4 border">Contact No</th>
              <th className="py-2 px-4 border">Contact Address</th>
              <th className="py-2 px-4 border">Aadhar Card No</th>
              <th className="py-2 px-4 border">Start Date of Membership</th>
              <th className="py-2 px-4 border">End Date of Membership</th>
              <th className="py-2 px-4 border">Status (Active/Inactive)</th>
              <th className="py-2 px-4 border">Active Fine</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border">{member.membershipId}</td>
                <td className="py-2 px-4 border">{member.name}</td>
                <td className="py-2 px-4 border">{member.contactNo}</td>
                <td className="py-2 px-4 border">{member.contactAddress}</td>
                <td className="py-2 px-4 border">{member.aadharCardNo}</td>
                <td className="py-2 px-4 border">{new Date(member.startDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">{new Date(member.endDate).toLocaleDateString()}</td>
                <td className={`py-2 px-4 border ${member.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                  {member.status}
                </td>
                <td className="py-2 px-4 border">{member.fine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Membership;
