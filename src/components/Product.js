// components/Product.js
import React, { useState, useEffect } from 'react';
import './Product.css';
import productsData from '../data/products.json';

function Product() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  
  // Get unique categories and sort them
  const categories = ['All', ...new Set(productsData.products.map(p => p.category))].sort((a, b) => {
    if (a === 'All') return -1;
    if (b === 'All') return 1;
    return a.localeCompare(b);
  });
  
  // Filter products by category and search query
  const filteredProducts = productsData.products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'category-asc':
        return a.category.localeCompare(b.category);
      case 'category-desc':
        return b.category.localeCompare(a.category);
      default:
        return a.id - b.id;
    }
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Handle image click to show modal
  const handleImageClick = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  // Handle keyboard events
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Handle next/previous in modal
  const handleNext = () => {
    if (selectedProduct) {
      const currentIndex = sortedProducts.findIndex(p => p.id === selectedProduct.id);
      const nextIndex = (currentIndex + 1) % sortedProducts.length;
      setSelectedProduct(sortedProducts[nextIndex]);
    }
  };

  const handlePrevious = () => {
    if (selectedProduct) {
      const currentIndex = sortedProducts.findIndex(p => p.id === selectedProduct.id);
      const previousIndex = (currentIndex - 1 + sortedProducts.length) % sortedProducts.length;
      setSelectedProduct(sortedProducts[previousIndex]);
    }
  };

  return (
    <div className="product-page">
      {/* Hero Section */}
      <section className="product-hero">
        <div className="hero-overlay"></div>
        <div className="hero-pattern"></div>
        <div className="container hero-content">
          <span className="hero-badge">Premium Hardware Collection</span>
          <h1 className="hero-title">
            <span className="hero-title-line">Explore Our</span>
            <span className="hero-title-main">
              <span className="hero-letter">P</span>
              <span className="hero-letter">r</span>
              <span className="hero-letter">o</span>
              <span className="hero-letter">d</span>
              <span className="hero-letter">u</span>
              <span className="hero-letter">c</span>
              <span className="hero-letter">t</span>
              <span className="hero-letter">s</span>
            </span>
          </h1>
          <p className="hero-description">
            Discover our extensive collection of premium door handles, knobs, locks, and architectural hardware
          </p>
        </div>
        <div className="hero-scroll-indicator">
          <span className="scroll-text">Browse Collection</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{productsData.products.length}+</span>
              <span className="stat-label">Total Products</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{categories.length - 1}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Genuine Quality</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Online Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-wrapper">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="sort-box">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="default">Default Sort</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="category-asc">Category (A-Z)</option>
                <option value="category-desc">Category (Z-A)</option>
              </select>
            </div>
          </div>

          <div className="categories-wrapper">
            <div className="categories-scroll">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                  {category !== 'All' && (
                    <span className="category-count">
                      ({productsData.products.filter(p => p.category === category).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="results-info">
            <p>Showing {currentProducts.length} of {sortedProducts.length} products</p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          {currentProducts.length > 0 ? (
            <>
              <div className="products-grid-enhanced">
                {currentProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="product-card-enhanced"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div 
                      className="product-image-wrapper"
                      onClick={() => handleImageClick(product)}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="product-image"
                        loading="lazy"
                      />
                      <div className="product-image-overlay">
                        <span className="view-icon">🔍</span>
                      </div>
                      <span className="product-badge">New</span>
                    </div>
                    <div className="product-info-enhanced">
                      <h3 className="product-name">{product.name}</h3>
                      <span className="product-category-tag">{product.category}</span>
                      <div className="product-actions">
                        <button 
                          className="product-action-btn"
                          onClick={() => handleImageClick(product)}
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    ← Previous
                  </button>
                  
                  <div className="pagination-numbers">
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        pageNum === currentPage - 3 ||
                        pageNum === currentPage + 3
                      ) {
                        return <span key={pageNum} className="pagination-ellipsis">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <button 
                    className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-products">
              <span className="no-products-icon">🔍</span>
              <h3>No products found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button 
                className="reset-btn"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setSortBy('default');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <button className="modal-nav modal-prev" onClick={handlePrevious}>
              ←
            </button>
            
            <button className="modal-nav modal-next" onClick={handleNext}>
              →
            </button>

            <div className="modal-image-container">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="modal-image"
              />
            </div>

            <div className="modal-details">
              <h2 className="modal-product-name">{selectedProduct.name}</h2>
              <span className="modal-product-category">{selectedProduct.category}</span>
              
              <div className="modal-product-info">
                <div className="info-item">
                  <span className="info-label">Product ID</span>
                  <span className="info-value">#{selectedProduct.id}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Category</span>
                  <span className="info-value">{selectedProduct.category}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Availability</span>
                  <span className="info-value in-stock">In Stock</span>
                </div>
              </div>

              <div className="modal-navigation-info">
                {sortedProducts.findIndex(p => p.id === selectedProduct.id) + 1} / {sortedProducts.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;