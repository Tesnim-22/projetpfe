import React from 'react';
import './Dashboard.css';

const PatientDashboard = () => {
  return (
    <div className="dashboard-container patient-dashboard">
      <div className="dashboard-card">
        <h1>👩‍⚕️ Welcome, Patient!</h1>
        <p>This is your personal dashboard. Here you can access health tips, track your progress, and more.</p>
      </div>
    </div>
  );
};

export default PatientDashboard;
