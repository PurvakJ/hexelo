// components/Home.js - Updated with background image slideshow instead of carousels
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import productsData from '../data/products.json';
import companyReel from '../data/Hexelo Reel 3.mp4';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);
  
  // Background images for hero section slideshow
  const backgroundImages = [
    'https://i.postimg.cc/6Qfj8vCm/blue-kitchen-drawers-half-open-beside-tall-cabinet-organized-space.jpg',
    'https://i.postimg.cc/MHNtCb8R/close-up-modern-dark-wood-furniture-with-black-handles.jpg',
    'https://i.postimg.cc/nrjGGjQB/closeup-shot-set-wooden-drawers.jpg',
    'https://i.postimg.cc/bw3L8h8z/closeup-wooden-boxes-house-home-decor-detail.jpg',
    'https://i.postimg.cc/nVBkr7pf/door-handle.jpg',
    'https://i.postimg.cc/RVwbkyNq/light-switches-near-metal-door-handle-stairs-lighting-control.jpg',
    'https://i.postimg.cc/pLGQ4JYV/side-view-open-drawer-sage-green-kitchen-declutter-mood.jpg',
    'https://i.postimg.cc/wMgs71c4/wood-door.jpg'
  ];
  
  // Featured images array - Using actual product images from JSON
  const featuredImages = [
    'https://i.postimg.cc/XYG3w1rB/Whats-App-Image-2026-03-19-at-11-29-35.jpg', // Main door handle
    'https://i.postimg.cc/0yPSHms2/Whats_App_Image_2026_03_19_at_12_02_41.jpg', // Mortise Handle
    'https://i.postimg.cc/YCXCtLJt/Whats-App-Image-2026-03-19-at-12-17-13.jpg', // Knob
    'https://i.postimg.cc/jdgN4nJS/Whats_App_Image_2026_03_19_at_12_33_08_removebg_preview.png', // Door Knock
    'https://i.postimg.cc/RVsfLJn0/Whats_App_Image_2026_03_19_at_12_33_05_removebg_preview_copy.png', // Antique Brass
    'https://i.postimg.cc/L5VPH6t3/Whats-App-Image-2026-03-19-at-12-15-06.jpg', // Sofa Leg
    'https://i.postimg.cc/XY2YnBTd/Whats-App-Image-2026-03-19-at-12-17-22.jpg', // Magnet Door holder
    'https://i.postimg.cc/FFPG1jLR/Whats-App-Image-2026-03-19-at-20-48-01.jpg', // Brass Mortise Handle
    'https://i.postimg.cc/qMZ46Hvs/Whats-App-Image-2026-03-19-at-11-26-18.jpg', // Main door handle
    'https://i.postimg.cc/y6fnWFSt/Whats_App_Image_2026_03_19_at_18_35_49.jpg' // Curtains Bracket
  ];
  
  // Hardcoded category images with specific URLs
  const categoryImages = {
    'Mortise Handles': 'https://i.postimg.cc/FsjcZpwZ/Whats-App-Image-2026-03-19-at-12-02-25.jpg',
    'Main door handles': 'https://i.postimg.cc/XYG3w1rB/Whats-App-Image-2026-03-19-at-11-29-35.jpg',
    'Knobs': 'https://i.postimg.cc/YCXCtLJt/Whats-App-Image-2026-03-19-at-12-17-13.jpg',
    'Magnet Door holder': 'https://i.postimg.cc/XY2YnBTd/Whats-App-Image-2026-03-19-at-12-17-22.jpg',
    'Door Knocks': 'https://i.postimg.cc/7Yjy9M8S/Whats-App-Image-2026-03-19-at-12-33-07-1.jpg',
    'Antique Brass': 'https://i.postimg.cc/y6QKgCf8/Whats-App-Image-2026-03-19-at-12-33-04-1.jpg',
    'Sofa Legs': 'https://i.postimg.cc/L5VPH6t3/Whats-App-Image-2026-03-19-at-12-15-06.jpg',
    'Brass Mortise Handles': 'https://i.postimg.cc/FFPG1jLR/Whats-App-Image-2026-03-19-at-20-48-01.jpg',
    'Key holes': 'https://i.postimg.cc/pLwvkQ8t/Whats-App-Image-2026-03-19-at-11-35-56.jpg',
    'Curtains Bracket': 'https://i.postimg.cc/y6fnWFSt/Whats_App_Image_2026_03_19_at_18_35_49.jpg',
    'Door closer': 'https://i.postimg.cc/2jHT34Bs/Whats-App-Image-2026-03-19-at-18-47-06.jpg',
    'Telescopy channels': 'https://i.postimg.cc/tRrD7hx9/Whats-App-Image-2026-03-19-at-18-48-48.jpg',
    'Screw': 'https://i.postimg.cc/Rhq0nvfw/Whats-App-Image-2026-03-19-at-18-40-48.jpg'
  };
  
  const sectionRefs = {
    hero: useRef(null),
    features: useRef(null),
    categories: useRef(null),
    video: videoSectionRef,
    products: useRef(null),
    showcase: useRef(null),
    cta: useRef(null)
  };

  // Check screen size for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Intersection Observer for scroll animations and video autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // For animations
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true
            }));
          }

          // For video autoplay when section is visible
          if (entry.target.dataset.section === 'video') {
            if (entry.isIntersecting) {
              if (videoRef.current) {
                videoRef.current.play()
                  .then(() => {
                    setIsVideoPlaying(true);
                  })
                  .catch(error => {
                    console.log('Autoplay prevented:', error);
                    setIsVideoPlaying(false);
                  });
              }
            } else {
              if (videoRef.current && isVideoPlaying) {
                videoRef.current.pause();
                setIsVideoPlaying(false);
              }
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.dataset.section = key;
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [isVideoPlaying]);

  // Process products data - Show 10 featured products from actual data
  useEffect(() => {
    const loadProducts = async () => {
      setTimeout(() => {
        const products = productsData.products;
        
        // Group products by category
        const categories = {};
        products.forEach(product => {
          if (!categories[product.category]) {
            categories[product.category] = [];
          }
          categories[product.category].push(product);
        });
        
        setCategoryProducts(categories);
        
        // Define categories to feature (excluding Door silencer)
        const featuredCategories = [
          'Main door handles',
          'Mortise Handles',
          'Knobs',
          'Door Knocks',
          'Antique Brass',
          'Sofa Legs',
          'Magnet Door holder',
          'Brass Mortise Handles',
          'Key holes',
          'Curtains Bracket'
        ];

        const featured = [];
        
        // Get one product from each featured category
        featuredCategories.forEach(category => {
          if (categories[category] && categories[category].length > 0 && featured.length < 10) {
            const product = { ...categories[category][0] }; // Create a copy to avoid modifying original
            // Use the corresponding featured image if available
            if (featured.length < featuredImages.length) {
              product.image = featuredImages[featured.length];
            }
            featured.push(product);
          }
        });

        // If we still need more products, add from other categories (excluding Door silencer)
        if (featured.length < 10) {
          const otherCategories = Object.keys(categories).filter(cat => 
            !featuredCategories.includes(cat) && 
            cat !== 'door silencer' &&
            cat !== 'Door silencer'
          );
          
          for (let cat of otherCategories) {
            if (categories[cat] && categories[cat].length > 0 && featured.length < 10) {
              const product = { ...categories[cat][0] };
              if (featured.length < featuredImages.length) {
                product.image = featuredImages[featured.length];
              }
              featured.push(product);
            }
          }
        }

        setFeaturedProducts(featured.slice(0, 10));
        setLoading(false);
      }, 500);
    };

    loadProducts();
  }, []);

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const handleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

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

  // Updated categories to use hardcoded images
  const getHardwareCategories = () => {
    const products = productsData.products;
    
    // Define the 4 main categories with the most products (excluding Door silencer)
    const categoryCounts = {};
    products.forEach(product => {
      if (product.category !== 'door silencer' && product.category !== 'Door silencer') {
        categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
      }
    });
    
    // Get the top 4 categories by count
    const topCategories = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([category]) => category);
    
    // Create category objects with hardcoded images
    const categoryMap = new Map();
    topCategories.forEach(category => {
      // Use hardcoded image from categoryImages object, or fallback to first product image
      const image = categoryImages[category] || 
                    (products.find(p => p.category === category)?.image || 
                    'https://via.placeholder.com/300x300?text=No+Image');
      
      categoryMap.set(category, {
        name: category,
        count: categoryCounts[category],
        image: image
      });
    });

    // Define icons for the selected categories
    const categoryIcons = {
      'Mortise Handles': '🔐',
      'Main door handles': '🚪',
      'Knobs': '🔘',
      'Magnet Door holder': '🧲',
      'Door Knocks': '🚪',
      'Antique Brass': '⚜️',
      'Sofa Legs': '🪑',
      'Brass Mortise Handles': '⚜️',
      'Key holes': '🔑',
      'Curtains Bracket': '🪟',
      'Door closer': '🚪',
      'Telescopy channels': '📺',
      'Screw': '🔩'
    };

    // Convert map to array and add icons
    return Array.from(categoryMap.values()).map(cat => ({
      ...cat,
      icon: categoryIcons[cat.name] || '🔩'
    }));
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
      {/* Hero Section with Background Slideshow */}
      <section 
        ref={sectionRefs.hero} 
        className={`hero-section ${visibleSections.hero ? 'fade-in' : ''}`}
      >
        {/* Background Slideshow */}
        <div className="hero-background-slideshow">
          {backgroundImages.map((img, index) => (
            <div
              key={index}
              className={`hero-background-image ${index === currentBackgroundImage ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="hero-overlay"></div>
          <div className="hero-pattern"></div>
        </div>
        
        <div className="container hero-content">
          <span className="hero-badge">Serving Since 2000 • Registered 2018</span>
          <h1 className="hero-title">
            <span className="hero-title-line">Welcome to</span>
            <span className="hero-title-main">
              <span className="hero-letter">H</span>
              <span className="hero-letter">E</span>
              <span className="hero-letter">X</span>
              <span className="hero-letter">E</span>
              <span className="hero-letter">L</span>
              <span className="hero-letter">O</span>
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
                className={`feature-card ${visibleSections.features ? 'animate' : ''}`}
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

      {/* Categories Section - Showing top 4 categories with hardcoded images */}
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

          <div className="categories-grid" style={{ gridTemplateColumns: `repeat(${hardwareCategories.length}, 1fr)` }}>
            {hardwareCategories.map((category, index) => (
              <div 
                key={index} 
                className={`category-card ${visibleSections.categories ? 'animate' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="category-image-wrapper">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="category-image" 
                    loading="lazy"
                  />
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

      {/* Video Showcase Section */}
      <section 
        ref={sectionRefs.video} 
        className={`section video-showcase-section ${visibleSections.video ? 'fade-in-up' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Hexelo in Motion</span>
            <h2 className="section-title">Experience Our <span className="text-highlight">Craftsmanship</span></h2>
            <p className="section-description">
              Watch our premium hardware collection come to life
            </p>
          </div>

          <div className="video-container">
            <div className="video-wrapper">
              <video
                ref={videoRef}
                src={companyReel}
                className="video-player"
                loop
                muted={isVideoMuted}
                playsInline
                poster="https://images.unsplash.com/photo-1558005137-4ce5c84b1b1b?w=1200&h=675&fit=crop"
              />
              <div className={`video-overlay ${!isVideoPlaying ? 'visible' : ''}`}>
                <button 
                  className="video-play-button"
                  onClick={handleVideoPlay}
                  aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
                >
                  {isVideoPlaying ? '⏸️' : '▶️'}
                </button>
                <h3 className="video-title">Hexelo Premium Hardware</h3>
                <p className="video-subtitle">Quality that speaks for itself</p>
              </div>
              
              {/* Mute/Unmute Button */}
              <button 
                className={`video-mute-button ${isVideoPlaying ? 'visible' : ''}`}
                onClick={handleVideoMute}
                aria-label={isVideoMuted ? 'Unmute video' : 'Mute video'}
              >
                {isVideoMuted ? '🔇' : '🔊'}
              </button>
            </div>
            <div className="video-caption">
              <p>Discover the finest collection of door handles, knobs, and architectural hardware from Hexelo. 
              With over 25 years of experience, we bring elegance and durability to every project.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section - Showing 10 featured products from actual data */}
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
                </div>
              ))}
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className={`product-card ${visibleSections.products ? 'animate' : ''}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
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
      <section className={`section brands-section ${visibleSections.showcase ? 'fade-in-up' : ''}`}>
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