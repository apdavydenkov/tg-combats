import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainPage from './components/MainPage';
import TestFunctionsPage from './components/TestFunctionsPage';
import BasicFunctions from './components/BasicFunctions';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-blue-500 hover:text-blue-700">Main Page</Link></li>
            <li><Link to="/test" className="text-blue-500 hover:text-blue-700">Test Functions</Link></li>
            <li><Link to="/basic" className="text-blue-500 hover:text-blue-700">Basic Functions</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/test" element={<TestFunctionsPage />} />
          <Route path="/basic" element={<BasicFunctions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;