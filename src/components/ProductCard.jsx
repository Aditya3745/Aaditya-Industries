import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ProductCard.module.css';

const ProductCard = ({ title, description, images, category, badge, materials, dimensions, weight_capacity, colors, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSpecs, setShowSpecs] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (images?.length || 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? (images?.length || 1) - 1 : prev - 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={styles.card}
    >
      <div className={styles.imageContainer} style={{ position: 'relative' }}>
        {badge && (
          <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--primary)', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            {badge}
          </div>
        )}
        {category && (
          <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.9)', color: 'var(--text-primary)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', zIndex: 10 }}>
            {category}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images && images.length > 0 ? images[currentImageIndex] : 'https://placehold.co/400x300?text=No+Image'}
            alt={`${title} view ${currentImageIndex + 1}`}
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.productImage}
          />
        </AnimatePresence>

        {images && images.length > 1 && (
          <div className={styles.controls}>
            <button onClick={prevImage} className={styles.controlButton}>
              <ChevronLeft size={16} />
            </button>
            <div className={styles.dots}>
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.dot} ${idx === currentImageIndex ? styles.dotActive : styles.dotInactive}`}
                />
              ))}
            </div>
            <button onClick={nextImage} className={styles.controlButton}>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <div className={styles.details}>
        <h3 className={styles.title} style={{ marginBottom: '0.5rem' }}>{title}</h3>
        
        {!showSpecs ? (
          <>
            <p className={styles.description}>{description}</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a href="#contact" className={styles.exploreButton} style={{ textDecoration: 'none', display: 'inline-block', flex: 1, textAlign: 'center' }}>Inquire Now</a>
              {(materials || dimensions || weight_capacity || colors) && (
                <button onClick={() => setShowSpecs(true)} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#475569', padding: '0.75rem 1.5rem', borderRadius: '4px', fontWeight: '600', cursor: 'pointer', flex: 1 }}>Specs</button>
              )}
            </div>
          </>
        ) : (
          <div style={{ fontSize: '0.875rem', marginBottom: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: '4px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Specifications</h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-secondary)' }}>
              {materials && <li><strong>Materials:</strong> {materials}</li>}
              {dimensions && <li><strong>Dimensions:</strong> {dimensions}</li>}
              {weight_capacity && <li><strong>Capacity:</strong> {weight_capacity}</li>}
              {colors && <li><strong>Colors:</strong> {colors}</li>}
            </ul>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a href="#contact" className={styles.exploreButton} style={{ textDecoration: 'none', display: 'inline-block', flex: 1, textAlign: 'center' }}>Inquire Now</a>
              <button onClick={() => setShowSpecs(false)} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#475569', padding: '0.75rem 1.5rem', borderRadius: '4px', fontWeight: '600', cursor: 'pointer', flex: 1 }}>Description</button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
