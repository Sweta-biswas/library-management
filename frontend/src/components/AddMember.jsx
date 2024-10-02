import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const IssueBook = () => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [AadharCardNo, setAadharCardNo] = useState(''); 
  const [contactAddress, setContactAddress] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [membershipDuration, setMembershipDuration] = useState('');
 
  const handleConfirm = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');

      // Prepare the request body
      const data = {
        FirstName,
        LastName,
        contactNo,
        AadharCardNo, 
        contactAddress,
        startDate,
        endDate,
        membershipDuration,
       
      };

      // Send POST request with token in the headers
     
      const response = await axios.post('https://backend-smoky-ten-70.vercel.app/api/v1/admin/add-membership', data, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token here
        },
      });

      console.log(response.data);
      toast.success('Membership added successfully!'); // Show success toast

      // Clear form fields after confirmation
      clearFormFields();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add membership.'); // Show error toast
    }
  };

  const handleCancel = () => {
    clearFormFields();
    toast.info('Form canceled.'); // Show cancel toast
  };

  // Function to clear all the form fields
  const clearFormFields = () => {
    setFirstName('');
    setLastName('');
    setContactNo('');
    setAadharCardNo(''); // Clear AadharCard No
    setContactAddress('');
    setStartDate('');
    setEndDate('');
    setMembershipDuration('');
    
  };

  return (
    <div className="p-8 bg-blue-100 shadow-xl rounded-2xl max-w-2xl mx-auto">
      <ToastContainer /> {/* Toastify container */}
      
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Add Membership</h2>

      {/* First Name */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">First Name:</label>
        <input
          type="text"
          value={FirstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      {/* Last Name */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Last Name:</label>
        <input
          type="text"
          value={LastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      {/* Contact Number */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Contact Number:</label>
        <input
          type="text"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      {/* AadharCard No */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">AadharCard No:</label>
        <input
          type="text"
          value={AadharCardNo}
          onChange={(e) => setAadharCardNo(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      {/* Contact Address */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Contact Address:</label>
        <input
          type="text"
          value={contactAddress}
          onChange={(e) => setContactAddress(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      {/* Start Date */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      {/* End Date */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      {/* Membership Duration */}
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

      

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleCancel}
          className="bg-gray-400 text-white py-2 px-6 rounded-xl shadow hover:bg-gray-500 transition duration-300"
        >
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