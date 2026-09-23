import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const links = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Command Center' },
    { to: '/roadmaps', label: 'Career Plan' },
    { to: '/skill-roadmap', label: 'Skill Graph' },
    { to: '/portfolio-generator', label: 'Projects' },
    { to: '/jobs', label: 'Opportunities' },
    { to: '/mock-interview', label: 'Interview Lab' },
    { to: '/resume-builder', label: 'Resume Intelligence' },
    { to: '/profile', label: 'Career Identity' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
          <span className="logo-main">CareerPilot</span>
          <span className="logo-accent">AI</span>
        </NavLink>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          <NavLink to="/assessment" className="sign-in-btn" onClick={() => setIsMenuOpen(false)}>
            AI Assistant
          </NavLink>
        </div>

        <div className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation menu">
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
