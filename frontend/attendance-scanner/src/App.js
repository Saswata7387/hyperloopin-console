import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AdminPage from './pages/adminpage';
import UserPage from './pages/userpage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Club Attendance System</h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link to="/" className="hover:text-blue-300">Home</Link>
                </li>
                <li>
                  <Link to="/admin" className="hover:text-blue-300">Admin</Link>
                </li>
                <li>
                  <Link to="/user" className="hover:text-blue-300">Member View</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<div className="container mx-auto p-8 text-center">
              <h1 className="text-3xl font-bold mb-4">Welcome to Club Attendance System</h1>
              <p className="mb-6">Please select your view from the navigation menu.</p>
              <div className="flex justify-center gap-4">
                <Link to="/admin" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  Admin View
                </Link>
                <Link to="/user" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                  Member View
                </Link>
              </div>
            </div>} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;