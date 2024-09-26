import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, FileText, DollarSign, User } from 'lucide-react';

const UserHomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center justify-center p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-white bg-opacity-80 shadow-xl rounded-2xl p-8 mb-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-700 hover:text-blue-500 transition-colors duration-200"
              onClick={() => navigate(-1)}
            >
              Back
            </motion.button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UserInfoCard />
            <ActivitySummary />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'View Reports', icon: FileText, path: '/reports', color: 'from-blue-200 to-blue-500' },
            { title: 'Transactions', icon: DollarSign, path: '/transactions', color: 'from-blue-200 to-indigo-500 ' }
          ].map((item) => (
            <motion.button
              key={item.title}
              variants={itemVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center justify-center bg-gradient-to-r ${item.color} text-white py-6 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200`}
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon size={24} className="mr-3" />
              <span className="text-lg font-semibold">{item.title}</span>
            </motion.button>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="flex justify-end mt-6"
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
      </motion.div>
    </div>
  );
};

const UserInfoCard = () => (
  <div className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-lg p-6 shadow-md">
    <div className="flex items-center mb-4">
      <User size={40} className="text-blue-600 mr-4" />
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Sweta Biswas</h2>
        <p className="text-gray-600">swetabiswas@gmail.com</p>
      </div>
    </div>
    <p className="text-gray-700">Account Status: <span className="font-semibold text-green-600">Active</span></p>
  </div>
);

const ActivitySummary = () => (
  <div className="bg-gradient-to-r from-indigo-200 to-purple-100 rounded-lg p-6 shadow-md">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
    <ul className="space-y-2">
      <li className="text-gray-700">Last login: 2 hours ago</li>
      <li className="text-gray-700">Reports generated: 5 this week</li>
      <li className="text-gray-700">Transactions: 3 pending</li>
    </ul>
  </div>
);

export default UserHomePage;