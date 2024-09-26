import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Settings, FileText, DollarSign } from 'lucide-react';

const AdminHomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-blue-100 flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white bg-opacity-90 shadow-lg rounded-lg p-10 mb-8" // Increased padding for a taller box
      >
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-3xl font-bold text-gray-800"
          >
            Admin Dashboard
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-700 hover:text-blue-500 transition-colors duration-200"
            onClick={() => navigate(-1)}
          >
            Back
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Maintenance', icon: Settings, path: '/maintainance' },
            { title: 'Reports', icon: FileText, path: '/reports' },
            { title: 'Transactions', icon: DollarSign, path: '/transactions' }
          ].map((item, index) => (
            <motion.button
              key={item.title}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-300 text-white py-8 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() => handleNavigation(item.path)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <item.icon size={32} className="mb-2" />
              <span className="text-lg font-semibold">{item.title}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-6xl flex justify-end mt-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex items-center bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-colors duration-200"
        >
          <LogOut size={18} className="mr-2" />
          Log Out
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AdminHomePage;
