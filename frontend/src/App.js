import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminHomePage from './pages/AdminHomePage';
import UserHomePage from './pages/UserHomePage';
import TransactionPage from './pages/TransactionPage';
import ReportsPage from './pages/ReportsPage'
import Maintainance from './pages/MaintainancePage';

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
          <Route path="/maintainance" element={<Maintainance/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;