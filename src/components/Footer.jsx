import React from 'react';
import { MapPin, Phone, Mail, ChevronRight, MessageCircle, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#0b1120', color: 'white', borderTop: '1px solid #1e293b' }}>
      {/* Top Section */}
      <div className="container" style={{ padding: '5rem 0 3rem 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem' }}>
        
        {/* Brand Column */}
        <div>
          <div style={{ display: 'inline-block', backgroundColor: 'white', padding: '10px 20px', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            <img src="/logo.png" alt="Aaditya Industries" style={{ height: '45px', display: 'block' }} />
          </div>
          <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '2rem' }}>
            Premium office seating manufacturer based in Patna, Bihar. We blend ergonomic science with modern aesthetics to build chairs that last a lifetime.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#f8fafc', letterSpacing: '0.5px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { name: 'Home', path: '/' },
              { name: 'Products Catalog', path: '/products' },
            ].map((link, idx) => (
              <li key={idx}>
                <a href={link.path} style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}>
                  <ChevronRight size={16} style={{ color: '#4f46e5' }} /> {link.name}
                </a>
              </li>
            ))}
            <li>
              <a href="https://www.indiamart.com/bn-sharma-industries/profile.html?srsltid=AfmBOop2Tn3f4E6XRlffU7cB98IbFSBXOEsFg3tomQW1UmKryAWfVgXz" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#ef4444'} onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}>
                <ExternalLink size={16} style={{ color: '#ef4444' }} /> Our IndiaMART Profile
              </a>
            </li>
            <li>
              <a href="https://wa.me/916202759310" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#22c55e'} onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}>
                <MessageCircle size={16} style={{ color: '#22c55e' }} /> Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#f8fafc', letterSpacing: '0.5px' }}>Contact Us</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                <Phone size={20} style={{ color: '#4f46e5' }} />
              </div>
              <div>
                <p style={{ color: '#f8fafc', fontWeight: '500', margin: '0 0 0.25rem 0' }}>Sales & Support</p>
                <p style={{ color: '#94a3b8', margin: 0 }}>+91 7942657029</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                <MapPin size={20} style={{ color: '#4f46e5' }} />
              </div>
              <div>
                <p style={{ color: '#f8fafc', fontWeight: '500', margin: '0 0 0.25rem 0' }}>Factory</p>
                <p style={{ color: '#94a3b8', margin: 0, lineHeight: '1.6' }}>
                  Transport Nagar Rd, Maurya Vihar Colony,<br />
                  Kankarbagh, Kumhrar,<br />
                  Patna, Bihar 800026
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Section */}
      <div style={{ backgroundColor: '#020617', padding: '1.5rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#64748b', fontSize: '0.9rem' }}>
          <div>© {new Date().getFullYear()} Aaditya Industries. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
