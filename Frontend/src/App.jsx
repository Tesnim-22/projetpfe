import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Login from '../components/Login';
import Signin from '../components/Signin';
import About from '../components/About';
import Contact from '../components/Contact';

import PatientDashboard from '../components/PatientDashboard';
import DoctorDashboard from '../components/DoctorDashboard';
import LabsDashboard from '../components/LabsDashboard';
import HospitalDashboard from '../components/HospitalDashboard';
import CabinetDashboard from '../components/CabinetDashboard';

// Route protection function
const ProtectedRoute = ({ children }) => {
  const loggedIn = localStorage.getItem('loggedIn');
  return loggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />

        {/* Protected Routes */}
        <Route path="/patient-dashboard" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
        <Route path="/doctor-dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
        <Route path="/labs-dashboard" element={<ProtectedRoute><LabsDashboard /></ProtectedRoute>} />
        <Route path="/hospital-dashboard" element={<ProtectedRoute><HospitalDashboard /></ProtectedRoute>} />
        <Route path="/cabinet-dashboard" element={<ProtectedRoute><CabinetDashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
