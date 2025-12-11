// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Workingarea from './pages/Workingarea';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/working" element={<Workingarea />} />
      </Routes>
    </Router>
  );
}

export default App;
