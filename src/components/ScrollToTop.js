// Alternative approach - using a separate ScrollToTop component file
// components/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediate scroll to top (instant)
    window.scrollTo(0, 0);
    
    // Alternative with smooth scrolling
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth'
    // });
  }, [pathname]);

  return null;
}

export default ScrollToTop;