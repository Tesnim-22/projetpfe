import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!email || !password) {
      setMessage('Please enter your email and password.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login Successful! ✅');
        localStorage.setItem('userRole', data.role); 
        localStorage.setItem('loggedIn', 'true'); 

        // Redirect to the appropriate dashboard
        switch (data.role) {
          case 'Patient':
            navigate('/patient-dashboard');
            break;
          case 'Doctor':
            navigate('/doctor-dashboard');
            break;
          case 'Labs':
            navigate('/labs-dashboard');
            break;
          case 'Hospital':
            navigate('/hospital-dashboard');
            break;
          case 'Cabinet':
            navigate('/cabinet-dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        setMessage(data.message || 'Invalid login credentials. Please try again.');
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
