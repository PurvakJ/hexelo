import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import './App.css';

// ScrollToTop component to handle scrolling to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: adds smooth scrolling effect
    });
  }, [pathname]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling while loader is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loading]);

  return (
    <>
      {loading && <Loader onLoadingComplete={() => setLoading(false)} />}
      
      <Router>
        <ScrollToTop /> {/* Add this component here */}
        <div className="App" style={{ visibility: loading ? 'hidden' : 'visible' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;