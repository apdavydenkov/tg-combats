import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import BasicFunctions from './components/BasicFunctions';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/basic" element={<BasicFunctions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;