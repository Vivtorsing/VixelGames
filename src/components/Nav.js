import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="nav-logo-icon">🎮</span>
          <span className="nav-logo-text">Vixel Games</span>
          <span className="nav-logo-sparkle">✨</span>
        </Link>
        <button 
          className={`nav-hamburger ${menuOpen ? 'nav-hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`}>
          <Link to="/" className="nav-link">
            <span className="nav-link-icon">🏠</span> Home
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;