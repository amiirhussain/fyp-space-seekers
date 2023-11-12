import './App.css';
import Login from './Auth/Login';
import Register from './Auth/Register';
import About from './pages/About';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ForgotPassword from './Auth/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Header';
import { useState, useEffect } from 'react';
import AppartmentList from './components/ApartmentList';
import Home from './pages/Home';

import SpaceSeekerServices from './pages/Services';
import ContactUs from './pages/Contact';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const setUserLoggedIn = (loggedIn) => {
    setIsUserLoggedIn(loggedIn);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <>
      {isUserLoggedIn ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/login"
          element={<Login setUserLoggedIn={setUserLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<Dashboard setUserLoggedIn={setUserLoggedIn} />}
        />
        <Route path="/services" element={<SpaceSeekerServices />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
