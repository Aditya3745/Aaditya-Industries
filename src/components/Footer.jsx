import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#ffffff', color: '#334155', borderTop: '1px solid #e2e8f0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div className="container" style={{ padding: '4rem 0 2rem 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
        
        {/* Brand Column */}
        <div>
          <img src="/logo.png" alt="Aaditya Industries" style={{ height: '50px', marginBottom: '1.25rem' }} />
          <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '1rem', marginBottom: '1.5rem', maxWidth: '300px' }}>
            Premium office seating manufacturer based in Patna, Bihar. We blend ergonomic science with robust manufacturing to build chairs that last.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.25rem', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li>
              <a href="/" style={{ color: '#475569', textDecoration: 'none', transition: 'color 0.2s', fontWeight: '500' }} onMouseOver={e => e.currentTarget.style.color = '#c22121'} onMouseOut={e => e.currentTarget.style.color = '#475569'}>
                Home
              </a>
            </li>
            <li>
              <a href="/products" style={{ color: '#475569', textDecoration: 'none', transition: 'color 0.2s', fontWeight: '500' }} onMouseOver={e => e.currentTarget.style.color = '#c22121'} onMouseOut={e => e.currentTarget.style.color = '#475569'}>
                Products Catalog
              </a>
            </li>
            <li style={{ marginTop: '0.5rem' }}>
              <a href="https://www.indiamart.com/bn-sharma-industries/profile.html?srsltid=AfmBOop2Tn3f4E6XRlffU7cB98IbFSBXOEsFg3tomQW1UmKryAWfVgXz" target="_blank" rel="noopener noreferrer" style={{ color: '#c22121', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600' }} onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'} onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}>
                <ExternalLink size={16} /> Our IndiaMART Profile
              </a>
            </li>
            <li>
              <a href="https://wa.me/916202759310" target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600' }} onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'} onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}>
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.25rem', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Us</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Phone size={18} style={{ color: '#64748b', marginTop: '2px' }} />
              <div>
                <p style={{ color: '#0f172a', fontWeight: '600', margin: '0 0 0.1rem 0' }}>Sales & Support</p>
                <p style={{ color: '#475569', margin: 0 }}>+91 7942657029</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <MapPin size={18} style={{ color: '#64748b', marginTop: '2px' }} />
              <div>
                <p style={{ color: '#0f172a', fontWeight: '600', margin: '0 0 0.1rem 0' }}>Headquarters</p>
                <p style={{ color: '#475569', margin: 0, lineHeight: '1.5' }}>
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
      <div style={{ borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc', padding: '1.5rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
          <div>© {new Date().getFullYear()} Aaditya Industries. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
