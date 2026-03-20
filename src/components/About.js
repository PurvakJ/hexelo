import React from 'react';
import './About.css';

function About() {
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
      {/* Hero Section with Parallax Effect */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-pattern"></div>
        <div className="container hero-content">
        <span className="hero-badge" style={{ color: '#ffffff' }}>Est. 2000 • Regd. 2018</span>
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
      <section className="stats-section">
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
      <section className="section story-section">
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
      <section className="section values-section">
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

      {/* Partners Section - Enhanced */}
      <section className="section partners-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Meet the Leaders</span>
            <h2 className="section-title">Our <span className="text-highlight">Founding Partners</span></h2>
            <p className="section-description">
              The visionaries behind Hexelo's success, bringing decades of expertise to every interaction
            </p>
          </div>

          <div className="partners-grid-enhanced">
            {partners.map((partner, index) => (
              <div key={index} className="partner-card">
                <div className="partner-image-wrapper">
                  <img 
                    src={partner.image} 
                    alt={partner.name}
                    className="partner-image"
                    onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/400x500?text=' + partner.name; }}
                  />
                  <div className="partner-overlay">
                    <p className="partner-quote">"{partner.quote}"</p>
                  </div>
                </div>
                <div className="partner-info">
                  <h3 className="partner-name">{partner.name}</h3>
                  <p className="partner-role">{partner.role}</p>
                  <div className="partner-details">
                    <div className="partner-detail">
                      <span className="detail-icon">⏱️</span>
                      <span>{partner.experience}</span>
                    </div>
                    <div className="partner-detail">
                      <span className="detail-icon">⚙️</span>
                      <span>{partner.expertise}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="section locations-section">
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