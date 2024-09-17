import React, { useState } from 'react';
import ActiveIssue from '../components/ActiveIssue';
import MembershipList from '../components/Membership';
import MoviesList from '../components/Movies';
import BooksList from '../components/Books';
import OverDueReturns from '../components/Overdue';
import PendingIssue from '../components/PendingIssue';

const ReportsPage = () => {
  const [activeSection, setActiveSection] = useState(''); // Track which section to display
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar toggle

  const handleActiveIssueClick = () => setActiveSection('activeissue');
  const handleMembershipClick = () => setActiveSection('membership');
  const handleMoviesClick = () => setActiveSection('movies');
  const handleBooksClick = () => setActiveSection('books');
  const handleOverdueClick = () => setActiveSection('overdue');
  const handlePendingIssueClick = () => setActiveSection('pendingissue');


  return (
    <div className="flex flex-col md:flex-row h-screen">
      
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden bg-blue-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Available Reports</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white focus:outline-none"
        >
          {/* Hamburger Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-1/4 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6`}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Library Services</h2>
        <ul className="space-y-4">
          <li
            className="cursor-pointer p-3 hover:bg-blue-600 rounded-lg transition duration-300 transform hover:scale-105"
            onClick={handleActiveIssueClick}
          >
            Active Issues
          </li>
          <li
            className="cursor-pointer p-3 hover:bg-blue-600 rounded-lg transition duration-300 transform hover:scale-105"
            onClick={handleMembershipClick}
          >
            MasterList of Membership
          </li>
          <li
            className="cursor-pointer p-3 hover:bg-blue-600 rounded-lg transition duration-300 transform hover:scale-105"
            onClick={handleMoviesClick}
          >
            MasterList of Movies
          </li>
          <li
            className="cursor-pointer p-3 hover:bg-blue-600 rounded-lg transition duration-300 transform hover:scale-105"
            onClick={handleBooksClick}
          >
            MasterList of Books
          </li>
          <li
            className="cursor-pointer p-3 hover:bg-blue-600 rounded-lg transition duration-300 transform hover:scale-105"
            onClick={handleOverdueClick}
          >
            Overdue Returns
          </li>
          <li
            className="cursor-pointer p-3 hover:bg-blue-600 rounded-lg transition duration-300 transform hover:scale-105"
            onClick={handlePendingIssueClick}
          >
            Pending Issues Request
          </li>
          <li
            className="cursor-pointer p-3 hover:bg-blue-600 rounded-lg transition duration-300 transform hover:scale-105"
            
          >
            Log Out
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-gray-100 overflow-y-auto">
        {activeSection === 'activeissue' && <ActiveIssue />}
        {activeSection === 'membership' && <MembershipList />}
        {activeSection === 'movies' && <MoviesList />}
        {activeSection === 'books' && <BooksList />}
        {activeSection === 'overdue' && <OverDueReturns/>}
        {activeSection === 'pendingissue' && <PendingIssue  />}
      </div>
    </div>
  );
};

export default ReportsPage;


