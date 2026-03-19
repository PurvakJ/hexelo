import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3>Hexelo Hardware</h3>
          <p>Your trusted partner for all hardware needs since 1995.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>📍 123 Hardware Street, NY 10001</p>
          <p>📞 (555) 123-4567</p>
          <p>✉️ info@hexelo.com</p>
        </div>
        <div className="footer-section">
          <h4>Hours</h4>
          <p>Mon-Fri: 8am - 8pm</p>
          <p>Saturday: 9am - 6pm</p>
          <p>Sunday: 10am - 4pm</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2024 Hexelo Hardware Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;