import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, User, Lock } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // For making API requests

const LandingPageLibrary = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (activeTab === 'user') {
      navigate('/user-home-page');
    } else if (activeTab === 'admin') {
      try {
        // Send a POST request to the backend API for admin login
        const response = await axios.post('http://localhost:5000/api/v1/admin/login', {
          username,
          password,
        });
  
        // If login is successful, store the token in localStorage
        const token = response.data.token; // Assuming the token is sent in the response
        localStorage.setItem('token', token);
  
        // Show a success toast notification
        toast.success(response.data.message, { position: 'top-right' });
  
        // Navigate to the admin home page
        navigate('/admin-home-page');
      } catch (error) {
        // If there's an error, show a toast notification
        toast.error(error.response?.data.message || 'Invalid Admin Credentials', {
          position: 'top-right',
        });
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-center">
        {/* Left Side - Features */}
        <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
          <div className="flex items-center justify-center lg:justify-start mb-6">
            <h1 className="text-5xl font-bold text-gray-800">
              <span className="text-blue-600">Library</span> Management System
            </h1>
          </div>
          <p className="text-gray-600 text-2xl mb-6">
            Welcome to our state-of-the-art Library Management System. Efficiently manage your library resources and enhance user experience.
          </p>
          <ul className="space-y-2">
            {['Book cataloging', 'User management', 'Loan tracking', 'Online reservations', 'Analytics and reporting'].map((feature, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-2xl p-8 w-full lg:w-1/3"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
            className="flex justify-center mb-8"
          >
            <Book className="text-blue-600 w-16 h-16" />
          </motion.div>

          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Library Management System
          </h1>

          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 ${activeTab === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-l-lg transition-colors duration-300`}
              onClick={() => setActiveTab('user')}
            >
              User
            </button>
            <button
              className={`flex-1 py-2 ${activeTab === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-r-lg transition-colors duration-300`}
              onClick={() => setActiveTab('admin')}
            >
              Admin
            </button>
          </div>

          <motion.form
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
            onSubmit={handleLogin}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <User className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              {activeTab === 'user' ? 'Login as User' : 'Login as Admin'}
            </button>
          </motion.form>
        </motion.div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LandingPageLibrary;
