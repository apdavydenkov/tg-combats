import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import TestFunctionsPage from './components/TestFunctionsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<TestFunctionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;