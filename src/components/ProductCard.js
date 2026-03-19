import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
  const [showFullScreen, setShowFullScreen] = useState(false);

  const openFullScreen = () => {
    setShowFullScreen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeFullScreen = () => {
    setShowFullScreen(false);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  return (
    <>
      <div className="product-card">
        <div className="product-image-wrapper" onClick={openFullScreen}>
          <img 
            src={product.image} 
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
          <div className="product-badge">Featured</div>
          <div className="product-category-badge">{product.category}</div>
          <div className="image-zoom-icon">🔍</div>
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <Link to={`/product/${product.id}`} className="product-link">
            View Details
            <span className="product-link-icon">→</span>
          </Link>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {showFullScreen && (
        <div className="fullscreen-modal" onClick={closeFullScreen}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeFullScreen}>×</button>
            <img 
              src={product.image} 
              alt={product.name}
              className="fullscreen-image"
            />
            <div className="fullscreen-caption">
              <h3>{product.name}</h3>
              <p>{product.category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;