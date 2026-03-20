// components/About.js - Updated with background image slideshow
import React, { useState, useEffect, useRef } from 'react';
import './About.css';

function About() {
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  
  const sectionRefs = {
    hero: useRef(null),
    stats: useRef(null),
    story: useRef(null),
    values: useRef(null),
    partners: useRef(null),
    locations: useRef(null)
  };

  // Background images for hero section slideshow
  const backgroundImages = [
    'https://i.postimg.cc/MHNtCb8R/close-up-modern-dark-wood-furniture-with-black-handles.jpg',
    'https://i.postimg.cc/nrjGGjQB/closeup-shot-set-wooden-drawers.jpg',
    'https://i.postimg.cc/bw3L8h8z/closeup-wooden-boxes-house-home-decor-detail.jpg',
    'https://i.postimg.cc/nVBkr7pf/door-handle.jpg',
    'https://i.postimg.cc/RVwbkyNq/light-switches-near-metal-door-handle-stairs-lighting-control.jpg',
    'https://i.postimg.cc/pLGQ4JYV/side-view-open-drawer-sage-green-kitchen-declutter-mood.jpg',
    'https://i.postimg.cc/wMgs71c4/wood-door.jpg'
  ];

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

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
      { threshold: 0.1, rootMargin: '0px' }
    );

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.dataset.section = key;
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const partners = [
    {
      name: 'Suresh Goyal',
      role: 'Founding Partner',
      experience: '30+ Years',
      expertise: 'Strategic Planning & Operations',
      image: 'https://i.postimg.cc/fykCyrCD/Screenshot-2026-03-19-at-13-44-32.png',
      quote: 'Quality is not an act, it\'s a habit. We\'ve built Hexelo on the foundation of uncompromising quality and lasting relationships.'
    },
    {
      name: 'Manish Garg',
      role: 'Founding Partner',
      experience: '28+ Years',
      expertise: 'Product Sourcing & Customer Relations',
      image: 'https://i.postimg.cc/j2Cc2Fcx/Screenshot-2026-03-19-at-13-45-23.png',
      quote: 'Every hardware piece tells a story of craftsmanship. Our mission is to bring the finest stories to your doorstep.'
    }
  ];

  const milestones = [
    { year: '2000', title: 'The Beginning', description: 'Started hardware trading with decades of collective experience', icon: '🌱' },
    { year: '2010', title: 'Bathinda Headquarters', description: 'Established main office in Bathinda to serve North India', icon: '🏛️' },
    { year: '2015', title: 'Rajkot Expansion', description: 'Opened branch office in Rajkot to serve Western India', icon: '🏭' },
    { year: '2018', title: 'Hexelo Brand Launch', description: 'Officially registered Hexelo as our flagship brand', icon: '✨' },
    { year: '2020', title: 'Digital Transformation', description: 'Launched online presence to serve customers nationwide', icon: '💻' },
    { year: '2024', title: 'Growing Strong', description: 'Serving 10,000+ happy customers with premium hardware', icon: '📈' }
  ];

  const achievements = [
    { number: '25+', label: 'Years of Experience', icon: '⏱️' },
    { number: '10k+', label: 'Happy Customers', icon: '😊' },
    { number: '1000+', label: 'Premium Products', icon: '🔩' },
    { number: '50+', label: 'Product Categories', icon: '📋' },
    { number: '2', label: 'Major Locations', icon: '📍' },
    { number: '100%', label: 'Genuine Products', icon: '✓' }
  ];

  const values = [
    {
      icon: '🏆',
      title: 'Uncompromising Quality',
      description: 'We source only the finest materials—brass, stainless steel, and zinc alloy—ensuring every product meets the highest standards of durability and finish.'
    },
    {
      icon: '🤝',
      title: 'Relationship First',
      description: 'Whether you\'re a contractor buying wholesale or a homeowner for a single project, we treat every customer with the same respect and care.'
    },
    {
      icon: '📚',
      title: 'Decades of Expertise',
      description: 'With over 50 years of combined experience, our partners Suresh Goyal and Manish Garg bring unmatched knowledge to every consultation.'
    },
    {
      icon: '🔧',
      title: 'Complete Solutions',
      description: 'From door handles to mortise locks, antique brass to modern finishes—we have everything for your hardware needs under one roof.'
    }
  ];

  return (
    <div className="about">
      {/* Hero Section with Background Slideshow */}
      <section 
        ref={sectionRefs.hero} 
        className={`about-hero ${visibleSections.hero ? 'fade-in' : ''}`}
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
          <span className="hero-badge">Est. 2000 • Regd. 2018</span>
          <h1 className="hero-title">
            <span className="hero-title-line">Crafting Excellence Since</span>
            <span className="hero-title-main">
              <span className="hero-letter">T</span>
              <span className="hero-letter">w</span>
              <span className="hero-letter">o</span>
              <span className="hero-letter"> </span>
              <span className="hero-letter">D</span>
              <span className="hero-letter">e</span>
              <span className="hero-letter">c</span>
              <span className="hero-letter">a</span>
              <span className="hero-letter">d</span>
              <span className="hero-letter">e</span>
              <span className="hero-letter">s</span>
            </span>
          </h1>
          <p className="hero-subtitle">The Hardware People You Can Trust</p>
          <p className="hero-description">
            From a small trading setup to one of India's most trusted hardware suppliers—our journey has been defined by quality, relationships, and an unwavering commitment to excellence.
          </p>
        </div>
        <div className="hero-scroll-indicator">
          <span className="scroll-text">Discover Our Story</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section 
        ref={sectionRefs.stats} 
        className={`stats-section ${visibleSections.stats ? 'fade-in-up' : ''}`}
      >
        <div className="container">
          <div className="stats-grid">
            {achievements.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-icon">{stat.icon}</span>
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section with Timeline */}
      <section 
        ref={sectionRefs.story} 
        className={`section story-section ${visibleSections.story ? 'fade-in-up' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Journey</span>
            <h2 className="section-title">The <span className="text-highlight">Hexelo</span> Story</h2>
            <p className="section-description">
              Two decades of dedication, growth, and unwavering commitment to quality hardware
            </p>
          </div>

          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <span className="timeline-year">{milestone.year}</span>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
                <div className="timeline-dot">{milestone.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section with Cards */}
      <section 
        ref={sectionRefs.values} 
        className={`section values-section ${visibleSections.values ? 'zoom-in' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What Drives Us</span>
            <h2 className="section-title">Our Core <span className="text-highlight">Values</span></h2>
            <p className="section-description">
              The principles that guide every decision we make and every product we offer
            </p>
          </div>

          <div className="values-grid-enhanced">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon-wrapper">
                  <span className="value-icon">{value.icon}</span>
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
                <div className="value-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section 
        ref={sectionRefs.locations} 
        className={`section locations-section ${visibleSections.locations ? 'scale-in' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Where to Find Us</span>
            <h2 className="section-title">Our <span className="text-highlight">Presence</span></h2>
            <p className="section-description">
              Strategically located to serve you better across India
            </p>
          </div>

          <div className="locations-grid">
            <div className="location-card">
              <div className="location-icon">🏛️</div>
              <h3>Bathinda Headquarters</h3>
              <p className="location-address">Main Office & Central Warehouse</p>
              <p className="location-detail">Serving North India with comprehensive inventory and quick dispatch</p>
              <div className="location-features">
                <span>✓ 25,000+ sq. ft. warehouse</span>
                <span>✓ Same-day dispatch</span>
                <span>✓ Wholesale & retail</span>
              </div>
            </div>
            <div className="location-card">
              <div className="location-icon">🏭</div>
              <h3>Rajkot Branch</h3>
              <p className="location-address">Branch Office & Showroom</p>
              <p className="location-detail">Serving Western India with personalized service and local inventory</p>
              <div className="location-features">
                <span>✓ 10,000+ sq. ft. showroom</span>
                <span>✓ Expert consultation</span>
                <span>✓ Sample display</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;