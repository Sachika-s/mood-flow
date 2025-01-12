import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header.js';  // Import the header
import Home from './components/home/Home.js';      // Import the Home component
import Calendar from './components/Calendar/Calendar.js';  // Import the Calendar component
import Insights from './components/Insights/Insights.js';
import About from './components/About';      // Import the About component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />  {/* Display header across all pages */}
        
        <Routes>
          <Route path="/" element={<Home />} />  {/* Home page */}
          <Route path="/calendar" element={<Calendar />} />  {/* Calendar page */}
          <Route path="/insights" element={<Insights />} />  {/* Insights page */}
          <Route path="/about" element={<About />} />  {/* About page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
