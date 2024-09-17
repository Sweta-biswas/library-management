import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminHomePage from './pages/AdminHomePage';
import UserHomePage from './pages/UserHomePage';
import TransactionPage from './pages/TransactionPage';
import ReportsPage from './pages/ReportsPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/admin-home-page" element={<AdminHomePage/>} />
          <Route path="/user-home-page" element={<UserHomePage/>} />
          <Route path="/transactions" element={<TransactionPage />} />
          <Route path="/reports" element={<ReportsPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;