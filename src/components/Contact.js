import React from 'react';
import './Contact.css';
import { FaWhatsapp, FaInstagram, FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaStore, FaWarehouse } from 'react-icons/fa';
import { MdLocationOn, MdEmail, MdPhone, MdChat } from 'react-icons/md';
import { SiGooglemaps } from 'react-icons/si';

function Contact() {
  // Business information
  const businessInfo = {
    name: 'GG Hardware',
    locations: [
      {
        city: 'Bathinda (Head Office)',
        address: 'Behind Kikar Bazar, Gali Singh Sabha Gurudwara, Bathinda, Punjab - 151005',
        phone: '+91 97797 42103',
        phone2: '+91 95308 22202',
        phone2Whatsapp: false,
        email: 'gghardware2023@gmail.com',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.123456789012!2d74.945678!3d30.234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391234567890abcd%3A0x1234567890abcdef!2sBathinda!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
        hours: 'Mon-Sat: 9:00 AM - 8:00 PM, Sun: Closed'
      }
    ],
    socialMedia: [
      {
        platform: 'WhatsApp',
        link: 'https://wa.me/919774742103?text=Hello%20GG%20Hardware%2C%20I%20have%20a%20query%20about%20your%20products.',
        icon: FaWhatsapp,
        username: '+91 97797 42103',
        color: '#25D366'
      },
      {
        platform: 'Instagram',
        link: 'https://www.instagram.com/gghardware_13/',
        icon: FaInstagram,
        username: '@gghardware_13',
        color: '#E4405F'
      },
      {
        platform: 'Facebook',
        link: 'https://m.facebook.com/manish.garg.58555/',
        icon: FaFacebook,
        username: 'Manish Garg',
        color: '#1877F2'
      }
    ],
    quickContact: {
      whatsapp: 'https://wa.me/919774742103?text=Hello%20GG%20Hardware%2C%20I%20need%20assistance%20with%20hardware%20products.',
      email: 'gghardware2023@gmail.com',
      phone: '+91 97797 42103',
      phone2: '+91 95308 22202'
    }
  };

  // Function to handle WhatsApp click
  const handleWhatsAppClick = (phone, message = '', isWhatsappEnabled = true) => {
    if (!isWhatsappEnabled) {
      alert('This number is not available on WhatsApp. Please call us directly at ' + phone);
      return;
    }
    const defaultMessage = 'Hello GG Hardware, I would like to know more about your products.';
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message || defaultMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Function to handle phone call
  const handlePhoneCall = (phone) => {
    window.location.href = `tel:${phone.replace(/[^0-9]/g, '')}`;
  };

  // Function to handle email
  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-pattern"></div>
        <div className="container hero-content">
          <span className="hero-badge" style={{ color: '#ffffff' }}>Get in Touch</span>
          <h1 className="hero-title">
            <span className="hero-title-line">Connect with</span>
            <span className="hero-title-main">
              <span className="hero-letter">H</span>
              <span className="hero-letter">E</span>
              <span className="hero-letter">X</span>
              <span className="hero-letter">E</span>
              <span className="hero-letter">L</span>
              <span className="hero-letter">O</span>
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
            <div className="whatsapp-icon-large">
              <FaWhatsapp size={48} />
            </div>
            <h2>Chat with Us on WhatsApp</h2>
            <p>Get instant responses from our hardware experts</p>
            <button 
              onClick={() => handleWhatsAppClick(businessInfo.quickContact.phone)}
              className="btn btn-whatsapp"
            >
              <span className="btn-icon"><FaWhatsapp /></span>
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
            {businessInfo.socialMedia.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a 
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                  style={{'--social-color': social.color}}
                >
                  <div className="social-icon">
                    <IconComponent size={48} />
                  </div>
                  <h3>{social.platform}</h3>
                  <p>{social.username}</p>
                  <span className="social-link">Connect →</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section 
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
              <h3>Bathinda Headquarters, Punjab</h3>
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
              <h3>Rajkot Branch, Gujrat</h3>
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
              <h4><MdLocationOn /> HEXELO - Bathinda</h4>
              <div className="map-buttons">
                <button 
                  onClick={() => handleWhatsAppClick(businessInfo.locations[0].phone, '', true)}
                  className="btn btn-primary btn-small"
                >
                  <FaWhatsapp /> WhatsApp Us
                </button>
                <button 
                  onClick={() => handlePhoneCall(businessInfo.locations[0].phone2)}
                  className="btn btn-secondary btn-small"
                >
                  <FaPhone /> Call Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours Banner */}
      <section className="section hours-banner">
        <div className="container">
          <div className="hours-grid">
            <div className="hours-item">
              <span className="hours-icon"><FaClock /></span>
              <div>
                <h4>Store Hours</h4>
                <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div className="hours-item highlight">
              <span className="hours-icon"><FaWhatsapp /></span>
              <div>
                <h4>WhatsApp Support</h4>
                <p>24/7 Quick Response</p>
                <button 
                  onClick={() => handleWhatsAppClick(businessInfo.quickContact.phone)}
                  className="btn-link"
                >
                  Chat Now →
                </button>
              </div>
            </div>
            <div className="hours-item">
              <span className="hours-icon"><FaPhone /></span>
              <div>
                <h4>Call Support</h4>
                <p>+91 97797 42103</p>
                <p>+91 95308 22202 (Call Only)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Footer */}
    </div>
  );
}

export default Contact;