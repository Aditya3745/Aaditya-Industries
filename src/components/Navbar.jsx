import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav style={{ padding: '1rem 0', borderBottom: '1px solid var(--surface-border)', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '0.75rem' }}>
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Aaditya Industries Logo" style={{ height: '40px', maxWidth: '100%', objectFit: 'contain' }} />
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>Aaditya Industries</span>
        </Link>
        
        {/* Desktop Menu */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-menu">
          <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
          <Link to="/products" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>Products</Link>
          <a href="#contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', display: 'none' }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="mobile-menu" style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', borderBottom: '1px solid var(--surface-border)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <Link to="/" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500', padding: '0.5rem 0' }}>Home</Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500', padding: '0.5rem 0' }}>Products</Link>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500', padding: '0.5rem 0' }}>Contact</a>
        </div>
      )}

      {/* We need some inline CSS for the media queries since we aren't using a CSS framework */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
