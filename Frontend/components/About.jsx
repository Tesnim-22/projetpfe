import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Us</h1>
        <p>
          Welcome to our Health Care Platform! We are dedicated to providing comprehensive health care services 
          and resources to help you achieve your wellness goals.
        </p>
        
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower individuals to take control of their health and well-being. 
            We offer a wide range of educational resources, professional advice, and health care services 
            designed to help you live your best life.
          </p>
        </div>
        
        <div className="about-section">
          <h2>Meet Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src="https://via.placeholder.com/100" alt="Doctor" />
              <p>Dr. John Doe</p>
              <span>Chief Medical Officer</span>
            </div>
            <div className="team-member">
              <img src="https://via.placeholder.com/100" alt="Doctor" />
              <p>Dr. Jane Smith</p>
              <span>Nutrition Expert</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
