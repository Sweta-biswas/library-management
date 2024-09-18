import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHomePage = () => {
    const navigate = useNavigate();

    const handleTransactionsClick = () => {
    navigate('/transactions'); // Navigate to the TransactionsPage
        };
   const handleReportsClick = () => {
    navigate('/reports'); // Navigate to the TransactionsPage
      };
      const handleMaintainanceClick = () => {
        navigate('/maintainance'); // Navigate to the TransactionsPage
          };
    const handleLogout = () => {
            // Remove the token from localStorage
     localStorage.removeItem('token'); // Assuming 'token' is the key for your JWT or session token
        
            // Perform any other necessary cleanup actions like clearing user data, etc.
            
            // Navigate to the login page or home page
      navigate('/'); // Or navigate to your login page route
     };
        

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex flex-col items-center p-8">
      {/* Header Section */}
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-4 mb-8">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">Admin Home Page</div>
          <button className="text-gray-700 hover:text-blue-500">Back</button>
        </div>
       
        <div className="flex justify-between mt-4">
        <button  onClick={handleMaintainanceClick}  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
            Maintenance
          </button>
          <button  onClick={handleReportsClick}  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
            Reports
          </button>
          <button onClick={handleTransactionsClick} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
            Transactions
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Product Details</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left text-gray-800">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border border-gray-300">Code No From</th>
                <th className="px-4 py-2 border border-gray-300">Code No To</th>
                <th className="px-4 py-2 border border-gray-300">Category</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 transition">
                <td className="px-4 py-2 border border-gray-300">SC(B/M)000001</td>
                <td className="px-4 py-2 border border-gray-300">SC(B/M)000000</td>
                <td className="px-4 py-2 border border-gray-300">Science</td>
              </tr>
              <tr className="hover:bg-gray-100 transition">
                <td className="px-4 py-2 border border-gray-300">EC(B/M)000001</td>
                <td className="px-4 py-2 border border-gray-300">EC(B/M)000000</td>
                <td className="px-4 py-2 border border-gray-300">Economics</td>
              </tr>
              <tr className="hover:bg-gray-100 transition">
                <td className="px-4 py-2 border border-gray-300">FC(B/M)000001</td>
                <td className="px-4 py-2 border border-gray-300">FC(B/M)000000</td>
                <td className="px-4 py-2 border border-gray-300">Fiction</td>
              </tr>
              <tr className="hover:bg-gray-100 transition">
                <td className="px-4 py-2 border border-gray-300">CH(B/M)000001</td>
                <td className="px-4 py-2 border border-gray-300">CH(B/M)000000</td>
                <td className="px-4 py-2 border border-gray-300">Children</td>
              </tr>
              <tr className="hover:bg-gray-100 transition">
                <td className="px-4 py-2 border border-gray-300">PD(B/M)000001</td>
                <td className="px-4 py-2 border border-gray-300">PD(B/M)000000</td>
                <td className="px-4 py-2 border border-gray-300">Personal Development</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full max-w-6xl flex justify-end mt-4">
        <button onClick={handleLogout} className="text-red-500 hover:underline">Log Out</button>
      </div>
    </div>
  );
};

export default AdminHomePage;
