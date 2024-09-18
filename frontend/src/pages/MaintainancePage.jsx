import React, { useState } from 'react';
import { ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AddMember from '../components/AddMember';
import UpdateMember from '../components/UpdateMember';
import AddBook from '../components/AddBook';
import UpdateBook from '../components/UpdateBook';
import User from '../components/UserManagement';

const MaintainencePage = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token'); // Assuming 'token' is the key for your JWT or session token

    // Perform any other necessary cleanup actions like clearing user data, etc.
    
    // Navigate to the login page or home page
    navigate('/'); // Or navigate to your login page route
};


  const menuItems = [
    {
      title: 'Membership',
      items: [
        { name: 'Add', action: () => handleSectionClick('addmember') },
        { name: 'Update', action: () => handleSectionClick('updatemember') },
      ],
    },
    {
      title: 'Books/Movies',
      items: [
        { name: 'Add', action: () => handleSectionClick('addbook') },
        { name: 'Update', action: () => handleSectionClick('updatebook') },
      ],
    },
    {
      title: 'User Management', // Only the section header, no subsections
      items: [], // Empty items array to remove the Add/Update subsections
      action: () => handleSectionClick('usermanagement'), // Directly links to User Management page
    },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden bg-blue-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Library Services</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-1/4 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6`}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">HouseKeeping</h2>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((menu, index) => (
              <li key={index} className="mb-4">
                <button
                  onClick={menu.items.length > 0 ? () => toggleMenu(menu.title) : menu.action}
                  className="flex items-center justify-between w-full p-3 hover:bg-blue-600 rounded-lg transition duration-300 transform hover:scale-105"
                >
                  <span className="font-semibold">{menu.title}</span>
                  {menu.items.length > 0 &&
                    (openMenus[menu.title] ? <ChevronUp size={20} /> : <ChevronDown size={20} />)}
                </button>
                {openMenus[menu.title] && menu.items.length > 0 && (
                  <ul className="mt-2 ml-4 space-y-2">
                    {menu.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <button
                          onClick={item.action}
                          className="w-full p-2 text-left hover:bg-blue-600 rounded-md transition duration-300 transform hover:scale-105"
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>
            <button
          onClick={handleLogout} // Logout handler
          className="flex items-center w-full p-3 hover:bg-blue-600 rounded-lg transition duration-300 transform hover:scale-105"
        >
          <LogOut size={20} className="mr-2" />
          <span className="font-semibold">Log Out</span>
        </button>

            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-gray-100 overflow-y-auto">
        {activeSection === 'addmember' && <AddMember />}
        {activeSection === 'updatemember' && <UpdateMember />}
        {activeSection === 'addbook' && <AddBook />}
        {activeSection === 'updatebook' && <UpdateBook />}
        {activeSection === 'usermanagement' && <User />}
        {!activeSection && (
          <div className="text-center text-gray-600 mt-10">
            <h3 className="text-2xl font-semibold">Welcome to HouseKeeping Services</h3>
            <p className="mt-4">Please select an option from the sidebar to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintainencePage;
