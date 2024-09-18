import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const UpdateBookOrMovie = () => {
  const [userType, setUserType] = useState('new'); // Radio buttons for New User/Existing User
  const [name, setName] = useState(''); // Textbox for Name
  const [isActive, setIsActive] = useState(false); // Checkbox for Status (Active)
  const [isAdmin, setIsAdmin] = useState(false); // Checkbox for Admin status

  // Handle Confirm Button
  const handleConfirm = () => {
    toast.success('Transaction Completed Successfully'); // Toast for success

    // Log data for development purposes
    console.log({
      userType,
      name,
      isActive,
      isAdmin,
    });
  };

  // Handle Cancel Button
  const handleCancel = () => {
    toast.error('Transaction Canceled'); // Toast for cancel
  };

  return (
    <div className="p-8 bg-blue-100 shadow-xl rounded-2xl max-w-2xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Update User</h2>

      {/* User Type: New or Existing */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">User Type:</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="new"
              checked={userType === 'new'}
              onChange={(e) => setUserType(e.target.value)}
              className="mr-2"
            />
            New User
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="existing"
              checked={userType === 'existing'}
              onChange={(e) => setUserType(e.target.value)}
              className="mr-2"
            />
            Existing User
          </label>
        </div>
      </div>

      {/* Name Field */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      {/* Status: Active Checkbox */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
            className="mr-2"
          />
          Active
        </label>
      </div>

      {/* Admin Checkbox */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
            className="mr-2"
          />
          Admin
        </label>
      </div>

      {/* Confirm and Cancel Buttons */}
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

      {/* Log Out */}
      

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default UpdateBookOrMovie;
