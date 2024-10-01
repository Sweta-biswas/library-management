import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminHomePage from './pages/AdminHomePage';
import UserHomePage from './pages/UserHomePage';
import TransactionPage from './pages/TransactionPage';
import ReportsPage from './pages/ReportsPage'
import Maintainance from './pages/MaintainancePage';
import Protected from './components/protected';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/admin-home-page/*" element={<Protected Component={AdminHomePage}/>}/>
          <Route path="/user-home-page/*" element={<Protected Component={UserHomePage}/>}/>
          <Route path="/transactions"  element={<Protected Component={TransactionPage}/>}/>
          <Route path="/reports"  element={<Protected Component={ReportsPage}/>}/>
          <Route path="/maintainance"  element={<Protected Component={Maintainance}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;