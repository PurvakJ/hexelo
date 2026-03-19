import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import './Products.css';

function Products() {
  const [products] = useState(productsData.products);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Get unique categories from product names (by extracting keywords)
  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Check screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsCategoryMenuOpen(false); // Close mobile menu on desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle body scroll when menu is open
  useEffect(() => {
    if (isCategoryMenuOpen && isMobile) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isCategoryMenuOpen, isMobile]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isCategoryMenuOpen && !e.target.closest('.category-filters.mobile-menu') && !e.target.closest('.category-hamburger')) {
        setIsCategoryMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isCategoryMenuOpen]);

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = filter === 'all' || product.category === filter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group products by category for display
  const groupedProducts = filteredProducts.reduce((groups, product) => {
    const category = product.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {});

  // Get category count for display
  const getCategoryCount = (category) => {
    if (category === 'all') return products.length;
    return products.filter(p => p.category === category).length;
  };

  return (
    <div className="products">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="container">
          <h1>Our Products</h1>
          <p>Premium Hardware for Every Need</p>
        </div>
      </section>

      {/* Search Section */}
      <section className="section search-section">
        <div className="container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="search-clear"
                onClick={() => setSearchTerm('')}
              >
                ×
              </button>
            )}
          </div>
        </div>
      </section>



      {/* Products Grid */}
      <section className="section products-grid-section">
        <div className="container">
          {/* Results Summary */}
          <div className="results-summary">
            <p>Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}</p>
          </div>

          {filteredProducts.length > 0 ? (
            filter === 'all' ? (
              // Show grouped by category when 'all' is selected
              Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                <div key={category} className="category-group">
                  <h2 className="category-title">
                    {category}
                    <span className="category-title-count">({categoryProducts.length})</span>
                  </h2>
                  <div className="products-grid">
                    {categoryProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Show single category when specific category is selected
              <>
                <h2 className="category-title single-category">
                  {filter}
                  <span className="category-title-count">({filteredProducts.length})</span>
                </h2>
                <div className="products-grid">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )
          ) : (
            <div className="no-products">
              <div className="no-products-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your search term or category filter.</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSearchTerm('');
                  setFilter('all');
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Products;