import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BasicLayout from './Layouts/BasicLayout';
import Login from './views/Login/Login';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/layout" element={<BasicLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
