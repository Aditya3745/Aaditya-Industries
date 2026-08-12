import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';

const Hero = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_visible', true)
          .order('display_order', { ascending: true });
          
        if (error) throw error;
        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching hero products: ", error);
      }
    };
    
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [products]);

  return (
    <div style={{ 
      backgroundColor: '#f8fafc',
      padding: '6rem 0', 
      borderBottom: '1px solid #e2e8f0',
      overflow: 'hidden'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        alignItems: 'center'
      }}>
        {/* Left Side: Text content */}
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', color: '#0f172a', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            Elevate Your <span style={{ color: '#4f46e5' }}>Workspace</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#475569', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            Discover our premium collection of office seating. Engineered for ergonomic comfort, unmatched durability, and crafted for modern aesthetics.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link 
              to="/products" 
              style={{ padding: '0.875rem 2.5rem', backgroundColor: '#4f46e5', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '1.125rem', transition: 'background-color 0.2s', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.4)' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
            >
              Shop Collection
            </Link>
            <a 
              href="#contact" 
              style={{ padding: '0.875rem 2.5rem', backgroundColor: 'white', color: '#0f172a', textDecoration: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '1.125rem', border: '1px solid #cbd5e1', transition: 'background-color 0.2s', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'white' }}
            >
              Contact Sales
            </a>
          </div>
        </div>

        {/* Right Side: Product Image Slideshow */}
        <div style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Decorative background blob */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            backgroundColor: '#e0e7ff',
            borderRadius: '50%',
            zIndex: 0,
            filter: 'blur(40px)',
            opacity: 0.7
          }}></div>
          
          {/* Image Container */}
          {products.length > 0 ? (
            <div 
              key={currentIndex} // Add key to force re-render for simple transition if needed
              style={{ 
                position: 'relative', 
                width: '100%',
                zIndex: 1,
                transform: 'perspective(1000px) rotateY(-5deg)',
                transition: 'all 0.5s ease',
                animation: 'fadeIn 0.5s ease-in-out'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) scale(1.02)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'perspective(1000px) rotateY(-5deg)'}
            >
              <img 
                src={products[currentIndex].images && products[currentIndex].images.length > 0 ? products[currentIndex].images[0] : '/hero_product.jpg'} 
                alt={products[currentIndex].title} 
                style={{ 
                  width: '100%', 
                  height: '400px', 
                  objectFit: 'cover',
                  borderRadius: '24px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  display: 'block'
                }} 
              />
              {/* Name Overlay */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                fontWeight: '600',
                color: '#0f172a',
                backdropFilter: 'blur(4px)'
              }}>
                {products[currentIndex].title}
              </div>
            </div>
          ) : (
            <div style={{ position: 'relative', zIndex: 1, color: '#94a3b8' }}>Loading products...</div>
          )}
          
          {/* Inline styles for keyframe animation to make the image transition smooth */}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0.8; transform: perspective(1000px) rotateY(-5deg) scale(0.98); }
              to { opacity: 1; transform: perspective(1000px) rotateY(-5deg) scale(1); }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default Hero;
