import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Our Health Care Platform</h1>
        <p>
          Your health is our priority. We provide the best care services and educational resources to help you stay healthy and informed.
          Explore our courses, read valuable health tips, and consult with professionals—all in one place.
        </p>
        <button className="cta-button">Get Started</button>
      </div>
    </div>
  );
};

export default Home;
