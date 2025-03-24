import React, { useState } from 'react';
import { FaUser, FaUserMd, FaFlask, FaHospital, FaClinicMedical } from 'react-icons/fa';
import './Signin.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const roles = [
    { name: 'Patient', icon: <FaUser /> },
    { name: 'Doctor', icon: <FaUserMd /> },
    { name: 'Labs', icon: <FaFlask /> },
    { name: 'Hospital', icon: <FaHospital /> },
    { name: 'Cabinet', icon: <FaClinicMedical /> }
  ];

  const handleRoleChange = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(item => item !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!email || !password || !confirmPassword) {
      setMessage('All fields are required.');
      setLoading(false);
      return;
    }

    if (selectedRoles.length === 0) {
      setMessage('Please select at least one role.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, roles: selectedRoles })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registration Successful! You can now log in.');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSelectedRoles([]);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2>Sign Up</h2>
        
        {message && <div className="message">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />

          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />

          <label>Confirm Password</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />

          <div className="roles-section">
            <h3>Select Your Role(s)</h3>
            <div className="roles-container">
              {roles.map(role => (
                <div key={role.name} className="role-item">
                  <input 
                    type="checkbox" 
                    id={role.name} 
                    value={role.name} 
                    checked={selectedRoles.includes(role.name)}
                    onChange={() => handleRoleChange(role.name)}
                  />
                  <label htmlFor={role.name}>
                    {role.icon} {role.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
