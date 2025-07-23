import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import About from './pages/About';
import Login from './pages/Login';
import App from './App';

export function Router() {
  return (
    <Routes>
      <Route path="/App" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
