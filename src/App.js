// Alternative App.js structure with separate ScrollToTop component
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Product from './components/Product';
import Contact from './components/Contact';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.querySelector('.sidebar');
        const hamburger = document.querySelector('.hamburger-menu');
        
        if (sidebar && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, sidebarOpen]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location, isMobile]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app">
      {/* ScrollToTop component ensures page starts from top on route change */}
      <ScrollToTop />
      
      {/* Hamburger Menu Button */}
      <button 
        className={`hamburger-menu ${sidebarOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle navigation menu"
      >
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </button>

      {/* Overlay for mobile */}
      <div 
        className={`overlay ${sidebarOpen ? 'show' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <div className="logo">
            <h1>HEXELO</h1>
            <p className="logo-tagline">Hardware & Architectural Finishes</p>
          </div>
          
          <nav className="nav-menu">
            <ul>
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  <span className="nav-text">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  <span className="nav-text">About</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/product" 
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  <span className="nav-text">Product</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact" 
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  <span className="nav-text">Contact</span>
                </NavLink>
              </li>
            </ul>
          </nav>
          
          <div className="sidebar-footer">
            <div className="footer-text">
              <p>Premium hardware solutions<br />for your dream spaces</p>
            </div>
            <div className="footer-copyright">
              © 2026 HEXELO
            </div>
          </div>
        </div>
      </aside>
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <Router>
      {loading ? (
        <Loader onLoadingComplete={handleLoadingComplete} />
      ) : (
        <AppContent />
      )}
    </Router>
  );
}

export default App;