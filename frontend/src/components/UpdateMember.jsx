import React, { useState } from 'react';
import axios from 'axios'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IssueBook = () => {
  const [MembershipId, setMembershipId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [membershipDuration, setMembershipDuration] = useState('');

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      if (!token) {
        toast.error('Unauthorized, please log in first');
        return;
      }
     

      const response = await axios.put(`http://localhost:5000/api/v1/admin/update-membership`, // Assuming the endpoint will be '/update-membership'
        {
          membershipId: MembershipId,
          startDate,
          endDate,
          membershipDuration,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        }
      );

      if (response.status === 200) {
        toast.success('Membership updated successfully');
        clearFormFields();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update membership');
    }
  };

  const clearFormFields = () => {
    setMembershipId('');
    setStartDate('');
    setEndDate('');
    setMembershipDuration('');
    
  };


  return (
    <div className="p-8 bg-blue-100 shadow-xl rounded-2xl max-w-2xl mx-auto">
       <ToastContainer />
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Update Membership</h2>

      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Membership Id:</label>
        <input
          type="text"
          value={MembershipId}
          onChange={(e) => setMembershipId(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-gray-600">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Membership Duration:</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="six months"
              checked={membershipDuration === 'six months'}
              onChange={(e) => setMembershipDuration(e.target.value)}
              className="mr-2"
            />
            Six Months
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="one year"
              checked={membershipDuration === 'one year'}
              onChange={(e) => setMembershipDuration(e.target.value)}
              className="mr-2"
            />
            One Year
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="two years"
              checked={membershipDuration === 'two years'}
              onChange={(e) => setMembershipDuration(e.target.value)}
              className="mr-2"
            />
            Two Years
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="bg-gray-400 text-white py-2 px-6 rounded-xl shadow hover:bg-gray-500 transition duration-300">
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="bg-blue-500 text-white py-2 px-6 rounded-xl shadow hover:bg-blue-600 transition duration-300"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default IssueBook;
