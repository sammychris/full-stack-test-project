import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm'; 
import LoginForm from './components/LoginForm';
import ProtectedPage from './components/ProtectedPage';
import HomePage from './components/HomePage'; // Assuming you have this

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/protected" element={<ProtectedPage />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;
