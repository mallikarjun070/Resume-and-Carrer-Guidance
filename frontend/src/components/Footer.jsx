import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>&copy; 2026 CareerPilot AI. Navigate Skills. Build Proof. Launch Your Career.</p>
        <div className="footer-links">
          <Link to="/about">Terms</Link>
          <Link to="/about">Privacy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
