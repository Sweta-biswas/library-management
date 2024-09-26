import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Axios for HTTP requests

const UserManagement = () => {
  const [formData, setFormData] = useState({
    userType: 'New User',
    name: '',
    password: '',
    status: false,
    admin: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const updatedFormData = { 
      ...formData, 
      status: formData.status ? 'active' : 'inactive' 
    };

    try {
      console.log(updatedFormData);
      const response = await axios.post('http://localhost:5000/api/v1/admin/manageuser', updatedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Form submitted:', response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle case where error.response might be undefined
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="p-8 bg-blue-100 shadow-xl rounded-2xl max-w-2xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Update User</h2>

      {/* Radio Buttons for New/Existing User */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Select User Type:</label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="userType"
              value="New User"
              checked={formData.userType === 'New User'}
              onChange={handleInputChange}
              className="mr-2"
            />
            New User
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="userType"
              value="Existing User"
              checked={formData.userType === 'Existing User'}
              onChange={handleInputChange}
              className="mr-2"
            />
            Existing User
          </label>
        </div>
      </div>

      {/* Name Field */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Username:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      {/* Password Field */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      {/* Status: Active Checkbox */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleInputChange}
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
            name="admin"
            checked={formData.admin}
            onChange={handleInputChange}
            className="mr-2"
          />
          Admin
        </label>
      </div>

      {/* Confirm and Cancel Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setFormData({
            userType: 'New User',
            name: '',
            password: '',
            status: false,
            admin: false,
          })}
          className="bg-gray-400 text-white py-2 px-6 rounded-xl shadow hover:bg-gray-500 transition duration-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-6 rounded-xl shadow hover:bg-blue-600 transition duration-300"
        >
          Confirm
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default UserManagement;
