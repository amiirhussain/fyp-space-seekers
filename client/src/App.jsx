import './App.css';
import Login from './Auth/Login';
import Register from './Auth/Register';
import About from './pages/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import ForgotPassword from './Auth/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Header';
import SidebarMenuList from './components/SidebarMenuList';
import { useState } from 'react';
import AppartmentList from './components/ApartmentList';
function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const locaion = useLocation();
  const setUserLoggedIn = (loggedIn) => {
    setIsUserLoggedIn(loggedIn);
  };

  return (
    <>
      {location.pathname === '/' ||
      location.pathname === '/login' ||
      location.pathname === '/register' ||
      location.pathname === '/about' ||
      location.pathname === '/contact' ? (
        <Navbar />
      ) : (
        <SidebarMenuList />
      )}

      {/* {isUserLoggedIn ? null : <Navbar />}
      {isUserLoggedIn ? <SidebarMenuList /> : null} */}
      <Routes>
        <Route path="/" element={<Login setUserLoggedIn={setUserLoggedIn} />} />
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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/list" element={<AppartmentList />} />
      </Routes>
    </>
  );
}

export default App;
