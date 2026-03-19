// components/Home.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import productsData from '../data/products.json';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentLeftImage, setCurrentLeftImage] = useState(0);
  const [currentRightImage, setCurrentRightImage] = useState(0);
  const [currentTopImage, setCurrentTopImage] = useState(0);
  const [currentBottomImage, setCurrentBottomImage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  const sectionRefs = {
    hero: useRef(null),
    features: useRef(null),
    categories: useRef(null),
    products: useRef(null),
    showcase: useRef(null),
    cta: useRef(null)
  };

  // Check screen size for responsive carousels
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.dataset.section = key;
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Carousel images from the provided URLs
  const carouselImages = [
    'https://i.postimg.cc/rmSzBvHX/Whats-App-Image-2026-03-19-at-11-34-55-removebg-preview.png',
    'https://i.postimg.cc/FRj1M26X/Whats-App-Image-2026-03-19-at-11-34-57-removebg-preview.png',
    'https://i.postimg.cc/W3MtBQyv/Whats-App-Image-2026-03-19-at-12-02-27-removebg-preview.png',
    'https://i.postimg.cc/DZqm9tNK/Whats-App-Image-2026-03-19-at-12-02-41-1-removebg-preview.png',
    'https://i.postimg.cc/vBWDJpKY/Whats-App-Image-2026-03-19-at-12-17-22-removebg-preview.png',
    'https://i.postimg.cc/gJvrCf7c/Whats-App-Image-2026-03-19-at-12-17-23-8-removebg-preview.png',
    'https://i.postimg.cc/DwSGjfqJ/Whats-App-Image-2026-03-19-at-11-35-56-removebg-preview.png',
    'https://i.postimg.cc/y8DRQ6FZ/Whats-App-Image-2026-03-19-at-11-35-57-1-removebg-preview.png',
    'https://i.postimg.cc/htXmy49j/Whats-App-Image-2026-03-19-at-12-17-13-removebg-preview.png',
    'https://i.postimg.cc/MpnBPZyG/Whats-App-Image-2026-03-19-at-12-17-15-removebg-preview.png',
    'https://i.postimg.cc/hPyx1Q7g/Whats-App-Image-2026-03-19-at-12-33-05-removebg-preview.png',
    'https://i.postimg.cc/RVsfLJn0/Whats-App-Image-2026-03-19-at-12-33-05-removebg-preview-copy.png',
    'https://i.postimg.cc/BQYDBP16/Whats-App-Image-2026-03-19-at-12-33-08-1-removebg-preview.png',
    'https://i.postimg.cc/jdgN4nJS/Whats-App-Image-2026-03-19-at-12-33-08-removebg-preview.png'
  ];

  // Auto-rotate carousel images
  useEffect(() => {
    const interval = setInterval(() => {
      if (isMobile) {
        // For mobile, rotate top and bottom carousels
        setCurrentTopImage((prev) => (prev + 1) % carouselImages.length);
        setCurrentBottomImage((prev) => (prev + 2) % carouselImages.length);
      } else {
        // For desktop, rotate left and right carousels
        setCurrentLeftImage((prev) => (prev + 1) % carouselImages.length);
        setCurrentRightImage((prev) => (prev + 2) % carouselImages.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselImages.length, isMobile]);

  // Process products data
  useEffect(() => {
    const loadProducts = async () => {
      setTimeout(() => {
        const products = productsData.products;
        
        const categories = {};
        products.forEach(product => {
          if (!categories[product.category]) {
            categories[product.category] = [];
          }
          categories[product.category].push(product);
        });
        
        setCategoryProducts(categories);
        
        const hardwareCategories = [
          'Main Door handles',
          'Mortise Handles',
          'Knobs',
          'Knocks',
          'Brass Dooms & Knockers',
          'Door silencer',
          'Buffers',
          'Magnet Door Holder',
          'Mortise Locks',
          'Antique Brass',
          'Sofa Legs'
        ];

        const featured = [];
        hardwareCategories.forEach(category => {
          if (categories[category] && categories[category].length > 0 && featured.length < 10) {
            featured.push(categories[category][0]);
          }
        });

        if (featured.length < 10) {
          Object.keys(categories).forEach(category => {
            if (hardwareCategories.includes(category) && 
                categories[category].length > 1 && 
                featured.length < 10) {
              featured.push(categories[category][1]);
            }
          });
        }

        setFeaturedProducts(featured.slice(0, 10));
        setLoading(false);
      }, 500);
    };

    loadProducts();
  }, []);

  const features = [
    { 
      icon: '🔩', 
      title: 'Premium Quality', 
      description: 'High-quality brass, stainless steel, and zinc alloy hardware with lasting durability',
    },
    { 
      icon: '🚪', 
      title: 'Complete Hardware Solutions', 
      description: 'Everything from door handles to knobs, knockers, and door accessories',
    },
    { 
      icon: '📦', 
      title: 'Wholesale & Retail', 
      description: 'Serving both bulk orders and individual customers with the same care',
    },
    { 
      icon: '⏱️', 
      title: '25+ Years Experience', 
      description: 'Serving customers since 2000 with expert knowledge and quality products',
    }
  ];

  const getHardwareCategories = () => {
    const categoryData = [
      { 
        name: 'Main Door handles', 
        icon: '🚪', 
        image: productsData.products.find(p => p.category === 'Main Door handles')?.image || 'https://images.unsplash.com/photo-1499955085172-a104c9463ece?w=600&h=400&fit=crop',
        count: productsData.products.filter(p => p.category === 'Main Door handles').length
      },
      { 
        name: 'Mortise Handles', 
        icon: '🔐', 
        image: productsData.products.find(p => p.category === 'Mortise Handles')?.image || 'https://images.unsplash.com/photo-1558005137-4ce5c84b1b1b?w=600&h=400&fit=crop',
        count: productsData.products.filter(p => p.category === 'Mortise Handles').length
      },
      { 
        name: 'Knobs', 
        icon: '🔘', 
        image: productsData.products.find(p => p.category === 'Knobs')?.image || 'https://images.unsplash.com/photo-1567703818793-9632f7e15f7a?w=600&h=400&fit=crop',
        count: productsData.products.filter(p => p.category === 'Knobs').length
      },
      { 
        name: 'Knocks', 
        icon: '🔨', 
        image: productsData.products.find(p => p.category === 'Knocks')?.image || 'https://images.unsplash.com/photo-1567703818793-9632f7e15f7a?w=600&h=400&fit=crop',
        count: productsData.products.filter(p => p.category === 'Knocks').length
      },
      { 
        name: 'Brass Dooms & Knockers', 
        icon: '🥇', 
        image: productsData.products.find(p => p.category === 'Brass Dooms & Knockers')?.image || 'https://images.unsplash.com/photo-1567703818793-9632f7e15f7a?w=600&h=400&fit=crop',
        count: productsData.products.filter(p => p.category === 'Brass Dooms & Knockers').length
      },
      { 
        name: 'Door silencer', 
        icon: '🔇', 
        image: productsData.products.find(p => p.category === 'Door silencer')?.image || 'https://images.unsplash.com/photo-1567703818793-9632f7e15f7a?w=600&h=400&fit=crop',
        count: productsData.products.filter(p => p.category === 'Door silencer').length
      },
      { 
        name: 'Buffers', 
        icon: '🛑', 
        image: productsData.products.find(p => p.category === 'Buffers')?.image || 'https://images.unsplash.com/photo-1567703818793-9632f7e15f7a?w=600&h=400&fit=crop',
        count: productsData.products.filter(p => p.category === 'Buffers').length
      },
      { 
        name: 'Magnet Door Holder', 
        icon: '🧲', 
        image: productsData.products.find(p => p.category === 'Magnet Door Holder')?.image || 'https://images.unsplash.com/photo-1567703818793-9632f7e15f7a?w=600&h=400&fit=crop',
        count: productsData.products.filter(p => p.category === 'Magnet Door Holder').length
      },
      { 
        name: 'Mortise Locks', 
        icon: '🔒', 
        image: productsData.products.find(p => p.category === 'Mortise Locks')?.image || 'https://images.unsplash.com/photo-1558005137-4ce5c84b1b1b?w=600&h=400&fit=crop',
        count: productsData.products.filter(p => p.category === 'Mortise Locks').length
      },
      { 
        name: 'Antique Brass', 
        icon: '🏺', 
        image: productsData.products.find(p => p.category === 'Antique Brass')?.image || 'https://images.unsplash.com/photo-1567703818793-9632f7e15f7a?w=600&h=400&fit=crop',
        count: productsData.products.filter(p => p.category === 'Antique Brass').length
      },
      { 
        name: 'Sofa Legs', 
        icon: '🪑', 
        image: productsData.products.find(p => p.category === 'Sofa Legs')?.image || 'https://images.unsplash.com/photo-1567703818793-9632f7e15f7a?w=600&h=400&fit=crop',
        count: productsData.products.filter(p => p.category === 'Sofa Legs').length
      }
    ];
    return categoryData.filter(cat => cat.count > 0);
  };

  const hardwareCategories = getHardwareCategories();

  const testimonials = [
    {
      name: 'Rajesh Patel',
      rating: 5,
      text: 'Hexelo has been our trusted hardware supplier for years. Their door handles and knobs collection is exceptional. Whether for retail or wholesale, they deliver quality products every time.'
    },
    {
      name: 'Priya Sharma',
      rating: 5,
      text: 'I was looking for antique brass handles for my heritage home renovation. Hexelo not only had exactly what I needed but also provided expert advice. Truly knowledgeable team!'
    },
    {
      name: 'Amit Kumar',
      rating: 5,
      text: 'As a contractor, I need reliable hardware suppliers. Hexelo never disappoints. Great prices, excellent quality, and timely delivery to our sites in both Bathinda and Rajkot.'
    },
    {
      name: 'Simran Kaur',
      rating: 5,
      text: 'The team at Hexelo understands hardware like no one else. They helped me select the perfect mortise locks and handles for my new home. Highly recommended!'
    }
  ];

  const totalProducts = productsData.products.length;
  const uniqueCategories = new Set(productsData.products.map(p => p.category)).size;

  return (
    <div className="home">
      {/* Hero Section */}
      <section 
        ref={sectionRefs.hero} 
        className={`hero-section ${visibleSections.hero ? 'fade-in' : ''}`}
      >
        <div className="hero-overlay"></div>
        <div className="hero-pattern"></div>
        
        {/* Desktop Carousels (left and right) */}
        {!isMobile && (
          <>
            <div className="hero-carousel-left">
              {carouselImages.map((img, index) => (
                <img
                  key={`left-${index}`}
                  src={img}
                  alt={`Hardware product ${index + 1}`}
                  className={`carousel-image ${index === currentLeftImage ? 'active' : ''}`}
                />
              ))}
            </div>

            <div className="hero-carousel-right">
              {carouselImages.map((img, index) => (
                <img
                  key={`right-${index}`}
                  src={img}
                  alt={`Hardware product ${index + 1}`}
                  className={`carousel-image ${index === currentRightImage ? 'active' : ''}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Mobile Carousels (top and bottom) */}
        {isMobile && (
          <>
            <div className="hero-carousel-top">
              {carouselImages.map((img, index) => (
                <img
                  key={`top-${index}`}
                  src={img}
                  alt={`Hardware product ${index + 1}`}
                  className={`carousel-image ${index === currentTopImage ? 'active' : ''}`}
                />
              ))}
            </div>

            <div className="hero-carousel-bottom">
              {carouselImages.map((img, index) => (
                <img
                  key={`bottom-${index}`}
                  src={img}
                  alt={`Hardware product ${index + 1}`}
                  className={`carousel-image ${index === currentBottomImage ? 'active' : ''}`}
                />
              ))}
            </div>
          </>
        )}
        
        <div className="container hero-content">
          <span className="hero-badge">Serving Since 2000 • Registered 2018</span>
          <h1 className="hero-title">
            <span className="hero-title-line">Welcome to</span>
            <span className="hero-title-main">
              <span className="hero-letter">H</span>
              <span className="hero-letter">e</span>
              <span className="hero-letter">x</span>
              <span className="hero-letter">e</span>
              <span className="hero-letter">l</span>
              <span className="hero-letter">o</span>
            </span>
          </h1>
          <p className="hero-subtitle">Premium Hardware Solutions</p>
          <p className="hero-description">
            Your trusted destination for premium door handles, knobs, and architectural hardware. 
            With over 25 years of experience serving customers from Bathinda and Rajkot, 
            we bring you the finest quality hardware for wholesale and retail needs.
          </p>
          <div className="hero-buttons">
            <Link to="/product" className="btn btn-primary">
              Explore Collection
              <span className="btn-icon">→</span>
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
          <div className="hero-features">
            <div className="hero-feature">
              <span className="hero-feature-icon">📍</span>
              <span>Bathinda (Main) • Rajkot</span>
            </div>
            <div className="hero-feature">
              <span className="hero-feature-icon">📦</span>
              <span>Wholesale & Retail</span>
            </div>
            <div className="hero-feature">
              <span className="hero-feature-icon">⭐</span>
              <span>25+ Years Experience</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span className="scroll-text">Scroll to explore</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={sectionRefs.features} 
        className={`section features-section ${visibleSections.features ? 'fade-in-up' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Why Choose Hexelo</span>
            <h2 className="section-title">The <span className="text-highlight">Hexelo</span> Advantage</h2>
            <p className="section-description">
              With decades of experience and a commitment to quality, we serve customers across India
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section 
        ref={sectionRefs.categories} 
        className={`section categories-section ${visibleSections.categories ? 'slide-in' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Shop by Category</span>
            <h2 className="section-title">Our <span className="text-highlight">Collections</span></h2>
            <p className="section-description">
              Explore our extensive range of door hardware, from classic to contemporary designs
            </p>
          </div>

          <div className="categories-grid">
            {hardwareCategories.map((category, index) => (
              <div 
                key={index} 
                className="category-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="category-image-wrapper">
                  <img src={category.image} alt={category.name} className="category-image" loading="lazy" />
                  <div className="category-overlay"></div>
                </div>
                <div className="category-content">
                  <span className="category-icon">{category.icon}</span>
                  <h3 className="category-name">{category.name}</h3>
                  <span className="category-count">{category.count} Products</span>
                  <Link to={`/product?category=${encodeURIComponent(category.name)}`} className="category-link">
                    Explore
                    <span className="category-link-icon">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section 
        ref={sectionRefs.products} 
        className={`section featured-section ${visibleSections.products ? 'zoom-in' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Featured Products</span>
            <h2 className="section-title">Popular <span className="text-highlight">Hardware</span></h2>
            <p className="section-description">
              Discover our most sought-after door handles, knobs, and accessories
            </p>
          </div>

          {loading ? (
            <div className="products-skeleton">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <div key={n} className="skeleton-card">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-content">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-category"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="product-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredCard(`product-${product.id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="product-image-wrapper">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="product-image"
                      loading="lazy"
                    />
                    <div className="product-badge">Featured</div>
                    <span className="product-category-tag">{product.category}</span>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="section-footer">
            <Link to="/product" className="btn btn-outline-dark">
              View All Products
              <span className="btn-icon">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Presence Section */}
      <section className="section brands-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Presence</span>
            <h2 className="section-title">Serving <span className="text-highlight">Across India</span></h2>
            <p className="section-description">
              Main office in Bathinda with a strong presence in Rajkot and growing nationwide
            </p>
          </div>

          <div className="brands-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="brand-item">
              <span className="brand-name" style={{ fontSize: '1.5rem' }}>🏛️ Bathinda</span>
              <p style={{ marginTop: '10px', color: '#666' }}>Main Office & Warehouse</p>
            </div>
            <div className="brand-item">
              <span className="brand-name" style={{ fontSize: '1.5rem' }}>🏭 Rajkot</span>
              <p style={{ marginTop: '10px', color: '#666' }}>Branch Office</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Customer Stories</span>
            <h2 className="section-title">What Our <span className="text-highlight">Customers Say</span></h2>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <span className="author-name">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={sectionRefs.cta} 
        className={`section cta-section ${visibleSections.cta ? 'scale-in' : ''}`}
      >
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Elevate Your Space?</h2>
            <p className="cta-description">
              Whether you're a contractor looking for wholesale rates or a homeowner seeking the perfect hardware, we're here to help
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-large">
                Get in Touch
              </Link>
              <Link to="/contact" className="btn btn-outline-light btn-large">
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">25+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{totalProducts}+</span>
              <span className="stat-label">Hardware Products</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{uniqueCategories}</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Section */}
      <section className="section seo-section">
        <div className="container">
          <div className="seo-content">
            <h2>Hexelo - Premium Door Handles, Knobs & Hardware in Bathinda & Rajkot</h2>
            <p>
              Welcome to Hexelo, your trusted destination for premium door hardware since 2000. With our main office in Bathinda and a strong presence in Rajkot, we serve customers across India with the finest quality door handles, knobs, mortise locks, brass dooms, knockers, and door accessories. Whether you're looking for wholesale rates for your construction project or retail purchases for your home, Hexelo delivers quality and reliability.
            </p>
            <p>
              Browse our extensive collection online at hexelo.com and discover elegant hardware solutions for every style. From contemporary stainless steel handles to classic antique brass fittings, we have everything you need to add the perfect finishing touch to your doors and furniture. With over two decades of experience, our team provides expert advice to help you select the perfect hardware for your specific needs.
            </p>
            <p>
              Visit our Bathinda main office or contact our Rajkot branch to experience the Hexelo difference. We offer competitive pricing on all products, making it easier to find high-quality hardware at affordable rates. Look out for special offers and bulk discounts for wholesale customers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;