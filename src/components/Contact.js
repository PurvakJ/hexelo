import React from 'react';
import './Contact.css';

function Contact() {
  // Business information
  const businessInfo = {
    name: 'Hexelo Hardware',
    locations: [
      {
        city: 'Bathinda (Head Office)',
        address: 'Main Bazar Road, Near Railway Station, Bathinda, Punjab - 151001',
        phone: '+91 98765 43210',
        phone2: '+91 98765 43211',
        email: 'bathinda@hexelo.com',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.123456789012!2d74.945678!3d30.234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391234567890abcd%3A0x1234567890abcdef!2sBathinda!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
        hours: 'Mon-Sat: 9:00 AM - 8:00 PM, Sun: Closed'
      },
      {
        city: 'Rajkot Branch',
        address: 'Kalavad Road, Opp. Race Course, Rajkot, Gujarat - 360001',
        phone: '+91 98240 12345',
        phone2: '+91 98240 12346',
        email: 'rajkot@hexelo.com',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.123456789012!2d70.798678!3d22.273456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959abcd12345678%3A0x87654321fedcba98!2sRajkot!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
        hours: 'Mon-Sat: 10:00 AM - 7:00 PM, Sun: Closed'
      }
    ],
    socialMedia: [
      {
        platform: 'WhatsApp',
        link: 'https://wa.me/919876543210?text=Hello%20Hexelo%20Hardware%2C%20I%20have%20a%20query%20about%20your%20products.',
        icon: '📱',
        username: '+91 98765 43210',
        color: '#25D366'
      },
      {
        platform: 'Instagram',
        link: 'https://instagram.com/hexelo.hardware',
        icon: '📷',
        username: '@hexelo.hardware',
        color: '#E4405F'
      },
      {
        platform: 'Facebook',
        link: 'https://facebook.com/hexelohardware',
        icon: '📘',
        username: 'Hexelo Hardware',
        color: '#1877F2'
      },
      {
        platform: 'Twitter',
        link: 'https://twitter.com/hexelo_hardware',
        icon: '🐦',
        username: '@hexelo_hardware',
        color: '#1DA1F2'
      }
    ],
    quickContact: {
      whatsapp: 'https://wa.me/919876543210?text=Hello%20Hexelo%20Hardware%2C%20I%20need%20assistance%20with%20hardware%20products.',
      email: 'info@hexelo.com',
      phone: '+91 98765 43210'
    }
  };

  // Function to handle WhatsApp click
  const handleWhatsAppClick = (phone, message = '') => {
    const defaultMessage = 'Hello Hexelo Hardware, I would like to know more about your products.';
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message || defaultMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-pattern"></div>
        <div className="container hero-content">
          <span className="hero-badge">Get in Touch</span>
          <h1 className="hero-title">
            <span className="hero-title-line">Connect with</span>
            <span className="hero-title-main">
              <span className="hero-letter">H</span>
              <span className="hero-letter">e</span>
              <span className="hero-letter">x</span>
              <span className="hero-letter">e</span>
              <span className="hero-letter">l</span>
              <span className="hero-letter">o</span>
            </span>
          </h1>
          <p className="hero-description">
            We're just a message away! Reach out to us on WhatsApp for instant support, 
            or connect with us on social media for updates and inspiration.
          </p>
        </div>
      </section>

      {/* Quick WhatsApp Contact */}
      <section className="section whatsapp-quick-section">
        <div className="container">
          <div className="whatsapp-quick-card">
            <div className="whatsapp-icon-large">📱</div>
            <h2>Chat with Us on WhatsApp</h2>
            <p>Get instant responses from our hardware experts</p>
            <button 
              onClick={() => handleWhatsAppClick(businessInfo.quickContact.whatsapp)}
              className="btn btn-whatsapp"
            >
              <span className="btn-icon">📱</span>
              Start WhatsApp Chat
              <span className="btn-icon">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Social Media Grid */}
      <section className="section social-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Connect With Us</span>
            <h2 className="section-title">Follow Us on <span className="text-highlight">Social Media</span></h2>
            <p className="section-description">
              Stay updated with our latest products, offers, and hardware inspiration
            </p>
          </div>

          <div className="social-grid">
            {businessInfo.socialMedia.map((social, index) => (
              <a 
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                style={{'--social-color': social.color}}
              >
                <div className="social-icon">{social.icon}</div>
                <h3>{social.platform}</h3>
                <p>{social.username}</p>
                <span className="social-link">Connect →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="section locations-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Visit Us</span>
            <h2 className="section-title">Our <span className="text-highlight">Locations</span></h2>
            <p className="section-description">
              Visit our stores in Bathinda and Rajkot for personalized service
            </p>
          </div>

          <div className="locations-grid">
            {businessInfo.locations.map((location, index) => (
              <div key={index} className="location-card">
                <div className="location-header">
                  <div className="location-icon">📍</div>
                  <h3>{location.city}</h3>
                </div>
                
                <div className="location-details">
                  <div className="location-detail">
                    <span className="detail-icon">🏢</span>
                    <p>{location.address}</p>
                  </div>
                  
                  <div className="location-detail">
                    <span className="detail-icon">📞</span>
                    <div className="phone-numbers">
                      <button 
                        onClick={() => handleWhatsAppClick(location.phone)}
                        className="phone-link"
                      >
                        {location.phone} <span className="whatsapp-indicator">(WhatsApp)</span>
                      </button>
                      <button 
                        onClick={() => handleWhatsAppClick(location.phone2)}
                        className="phone-link"
                      >
                        {location.phone2} <span className="whatsapp-indicator">(WhatsApp)</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="location-detail">
                    <span className="detail-icon">✉️</span>
                    <a href={`mailto:${location.email}`} className="email-link">
                      {location.email}
                    </a>
                  </div>
                  
                  <div className="location-detail">
                    <span className="detail-icon">🕒</span>
                    <p>{location.hours}</p>
                  </div>
                </div>

                <div className="location-actions">
                  <button 
                    onClick={() => handleWhatsAppClick(location.phone, `Hi, I'm interested in products at your ${location.city} store.`)}
                    className="btn btn-outline btn-small"
                  >
                    <span className="btn-icon">📱</span>
                    WhatsApp
                  </button>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-small"
                  >
                    <span className="btn-icon">🗺️</span>
                    Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section map-section">
        <div className="container">
          <div className="map-container">
            <iframe
              title="Bathinda Location"
              src={businessInfo.locations[0].map}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
            <div className="map-overlay">
              <h4>Bathinda Head Office</h4>
              <button 
                onClick={() => handleWhatsAppClick(businessInfo.locations[0].phone)}
                className="btn btn-primary btn-small"
              >
                WhatsApp Us
              </button>
            </div>
          </div>
          
          <div className="map-container">
            <iframe
              title="Rajkot Location"
              src={businessInfo.locations[1].map}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
            <div className="map-overlay">
              <h4>Rajkot Branch</h4>
              <button 
                onClick={() => handleWhatsAppClick(businessInfo.locations[1].phone)}
                className="btn btn-primary btn-small"
              >
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours Banner */}
      <section className="section hours-banner">
        <div className="container">
          <div className="hours-grid">
            <div className="hours-item">
              <span className="hours-icon">🕒</span>
              <div>
                <h4>Bathinda Store Hours</h4>
                <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div className="hours-item">
              <span className="hours-icon">🕒</span>
              <div>
                <h4>Rajkot Store Hours</h4>
                <p>Monday - Saturday: 10:00 AM - 7:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div className="hours-item highlight">
              <span className="hours-icon">📱</span>
              <div>
                <h4>WhatsApp Support</h4>
                <p>24/7 Quick Response</p>
                <button 
                  onClick={() => handleWhatsAppClick(businessInfo.quickContact.whatsapp)}
                  className="btn-link"
                >
                  Chat Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;