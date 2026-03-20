// components/Catalog.js
import React, { useState, useEffect } from 'react';
import './Catalog.css';

const Catalog = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Array of catalog images
  const catalogImages = [
    'https://i.postimg.cc/bvyxZ26r/Gemini-Generated-Image-dzjo45dzjo45dzjo.png',
    'https://i.postimg.cc/T3vkXTbq/TRIONE-MORTISE-CATALOGUE-2025-(C)-01.jpg',
    'https://i.postimg.cc/dVcWKJCG/TRIONE-MORTISE-CATALOGUE-2025-(C)-02.jpg',
    'https://i.postimg.cc/3xQLH3GF/TRIONE-MORTISE-CATALOGUE-2025-(C)-03.jpg',
    'https://i.postimg.cc/x1VsS9m5/TRIONE-MORTISE-CATALOGUE-2025-(C)-04.jpg',
    'https://i.postimg.cc/pLQsW3QC/TRIONE-MORTISE-CATALOGUE-2025-(C)-05.jpg',
    'https://i.postimg.cc/rw2hLq4g/TRIONE-MORTISE-CATALOGUE-2025-(C)-06.jpg',
    'https://i.postimg.cc/XYKsjtKz/TRIONE-MORTISE-CATALOGUE-2025-(C)-07.jpg',
    'https://i.postimg.cc/kgNTJLNz/TRIONE-MORTISE-CATALOGUE-2025-(C)-08.jpg',
    'https://i.postimg.cc/FHbTrwbM/TRIONE-MORTISE-CATALOGUE-2025-(C)-09.jpg',
    'https://i.postimg.cc/zGwxz4SY/TRIONE-MORTISE-CATALOGUE-2025-(C)-10.jpg',
    'https://i.postimg.cc/FHbTrwg5/TRIONE-MORTISE-CATALOGUE-2025-(C)-11.jpg',
    'https://i.postimg.cc/XYKsjtc3/TRIONE-MORTISE-CATALOGUE-2025-(C)-12.jpg',
    'https://i.postimg.cc/7LxmfXXp/TRIONE-MORTISE-CATALOGUE-2025-(C)-13.jpg',
    'https://i.postimg.cc/xd0tcggw/TRIONE-MORTISE-CATALOGUE-2025-(C)-14.jpg',
    'https://i.postimg.cc/nLH0CT0x/TRIONE-MORTISE-CATALOGUE-2025-(C)-15.jpg',
    'https://i.postimg.cc/25z2VT2D/TRIONE-MORTISE-CATALOGUE-2025-(C)-16.jpg',
    'https://i.postimg.cc/43JBmwBX/TRIONE-MORTISE-CATALOGUE-2025-(C)-17.jpg',
    'https://i.postimg.cc/Dz2B85B2/TRIONE-MORTISE-CATALOGUE-2025-(C)-18.jpg',
    'https://i.postimg.cc/wB607F0T/TRIONE-MORTISE-CATALOGUE-2025-(C)-19.jpg',
    'https://i.postimg.cc/tgX2YD24/TRIONE-MORTISE-CATALOGUE-2025-(C)-20.jpg',
    'https://i.postimg.cc/5txn6pn0/TRIONE-MORTISE-CATALOGUE-2025-(C)-21.jpg',
    'https://i.postimg.cc/mrb8tV8k/TRIONE-MORTISE-CATALOGUE-2025-(C)-22.jpg',
    'https://i.postimg.cc/jjsZLvZC/TRIONE-MORTISE-CATALOGUE-2025-(C)-23.jpg',
    'https://i.postimg.cc/nLH0CT0C/TRIONE-MORTISE-CATALOGUE-2025-(C)-24.jpg',
    'https://i.postimg.cc/pd2qpkqm/TRIONE-MORTISE-CATALOGUE-2025-(C)-25.jpg',
    'https://i.postimg.cc/k5nfBwfR/TRIONE-MORTISE-CATALOGUE-2025-(C)-26.jpg',
    'https://i.postimg.cc/g0YNn4NR/TRIONE-MORTISE-CATALOGUE-2025-(C)-27.jpg',
    'https://i.postimg.cc/KYZJRQJn/TRIONE-MORTISE-CATALOGUE-2025-(C)-28.jpg',
    'https://i.postimg.cc/hGpMxx5f/TRIONE-MORTISE-CATALOGUE-2025-(C)-29.jpg',
    'https://i.postimg.cc/HLB355hJ/TRIONE-MORTISE-CATALOGUE-2025-(C)-30.jpg',
    'https://i.postimg.cc/zf0pWWcy/TRIONE-MORTISE-CATALOGUE-2025-(C)-31.jpg',
    'https://i.postimg.cc/7LmX77WJ/TRIONE-MORTISE-CATALOGUE-2025-(C)-32.jpg',
    'https://i.postimg.cc/hGpMxx57/TRIONE-MORTISE-CATALOGUE-2025-(C)-33.jpg',
    'https://i.postimg.cc/cJXTYYbn/TRIONE-MORTISE-CATALOGUE-2025-(C)-34.jpg',
    'https://i.postimg.cc/bv3LbbBb/TRIONE-MORTISE-CATALOGUE-2025-(C)-35.jpg',
    'https://i.postimg.cc/fbB5XXrY/TRIONE-MORTISE-CATALOGUE-2025-(C)-36.jpg',
    'https://i.postimg.cc/W4XSrrHm/TRIONE-MORTISE-CATALOGUE-2025-(C)-37.jpg',
    'https://i.postimg.cc/nL0T77PY/TRIONE-MORTISE-CATALOGUE-2025-(C)-38.jpg',
    'https://i.postimg.cc/5tnpvvRS/TRIONE-MORTISE-CATALOGUE-2025-(C)-39.jpg',
    'https://i.postimg.cc/R0XGffDR/TRIONE-MORTISE-CATALOGUE-2025-(C)-40.jpg',
    'https://i.postimg.cc/BvMNDDVp/TRIONE-MORTISE-CATALOGUE-2025-(C)-41.jpg',
    'https://i.postimg.cc/nL0T77PT/TRIONE-MORTISE-CATALOGUE-2025-(C)-42.jpg',
    'https://i.postimg.cc/8CtwWW0Z/TRIONE-MORTISE-CATALOGUE-2025-(C)-43.jpg',
    'https://i.postimg.cc/wB0FJJG4/TRIONE-MORTISE-CATALOGUE-2025-(C)-44.jpg',
    'https://i.postimg.cc/vm3X99NP/TRIONE-MORTISE-CATALOGUE-2025-(C)-45.jpg',
    'https://i.postimg.cc/VND4MMVH/TRIONE-MORTISE-CATALOGUE-2025-(C)-46.jpg',
    'https://i.postimg.cc/43BwttSM/TRIONE-MORTISE-CATALOGUE-2025-(C)-47.jpg',
    'https://i.postimg.cc/k5fw88pz/TRIONE-MORTISE-CATALOGUE-2025-(C)-48.jpg',
    'https://i.postimg.cc/zBv7kBsp/TRIONE-MORTISE-CATALOGUE-2025-(C)-49.jpg',
    'https://i.postimg.cc/yNvn99b2/TRIONE-MORTISE-CATALOGUE-2025-(C)-50.jpg',
    'https://i.postimg.cc/0ydG5CCD/Gemini-Generated-Image-s94zjss94zjss94z.png'
  ];

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = isMobile ? catalogImages.length : Math.ceil(catalogImages.length / 2);

  const goToPreviousPage = () => {
    if (currentPage > 0 && !isFlipping && !isMobile) {
      setFlipDirection('right');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setTimeout(() => {
          setIsFlipping(false);
          setFlipDirection(null);
        }, 300);
      }, 150);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping && !isMobile) {
      setFlipDirection('left');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setTimeout(() => {
          setIsFlipping(false);
          setFlipDirection(null);
        }, 300);
      }, 150);
    }
  };

  // Get current content based on device
  const getCurrentContent = () => {
    if (isMobile) {
      return {
        single: catalogImages[currentPage]
      };
    } else {
      const startIndex = currentPage * 2;
      return {
        left: catalogImages[startIndex],
        right: catalogImages[startIndex + 1]
      };
    }
  };

  const content = getCurrentContent();

  // Handle PDF download
  const handleDownload = () => {
    const pdfUrl = 'https://drive.google.com/file/d/1c2I0y8WvH9zcqtGa71NdEAYAUEeJ4WSg/view?usp=sharing';
    window.open(pdfUrl, '_blank');
  };

  // Keyboard navigation (only for desktop)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isMobile) {
        if (e.key === 'ArrowLeft') {
          goToPreviousPage();
        } else if (e.key === 'ArrowRight') {
          goToNextPage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isFlipping, isMobile]);

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1>TRIONE MORTISE CATALOGUE 2025</h1>
        <p className="catalog-subtitle">
          {isMobile 
            ? `${catalogImages.length} Pages` 
            : `Spread ${currentPage + 1} of ${totalPages}`}
        </p>
      </div>

      <div className="book-container">
        <div className={`book-spread ${isMobile ? 'mobile-view' : ''} ${isFlipping ? `flipping-${flipDirection}` : ''}`}>
          {isMobile ? (
            // Mobile: Vertical scroll view
            <div className="mobile-scroll-view">
              {catalogImages.map((image, index) => (
                <div key={index} className="mobile-page-item">
                  <img 
                    src={image} 
                    alt={`Catalog page ${index + 1}`}
                    className="mobile-page-image"
                    loading="lazy"
                  />
                  <div className="mobile-page-number">Page {index + 1}</div>
                </div>
              ))}
            </div>
          ) : (
            // Desktop: Two-page spread
            <>
              {/* Left Page */}
              <div className="book-page left-page">
                {content.left && (
                  <img 
                    src={content.left} 
                    alt={`Catalog page ${currentPage * 2 + 1}`}
                    className="page-image"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Right Page */}
              <div className="book-page right-page">
                {content.right && (
                  <img 
                    src={content.right} 
                    alt={`Catalog page ${currentPage * 2 + 2}`}
                    className="page-image"
                    loading="lazy"
                  />
                )}
              </div>
            </>
          )}
        </div>

        {/* Desktop Navigation Controls - Hidden on Mobile */}
        {!isMobile && (
          <>
            <div className="navigation-controls">
              <button 
                className="nav-button prev-button"
                onClick={goToPreviousPage}
                disabled={currentPage === 0 || isFlipping}
              >
                <span className="nav-icon">◀</span>
                Previous
              </button>

              <div className="page-indicator">
                <span className="current-page">{currentPage + 1}</span>
                <span className="separator">/</span>
                <span className="total-pages">{totalPages}</span>
              </div>

              <button 
                className="nav-button next-button"
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1 || isFlipping}
              >
                Next
                <span className="nav-icon">▶</span>
              </button>
            </div>

            <div className="keyboard-hint">
              ← Use keyboard arrows to flip pages →
            </div>
          </>
        )}

        {/* Download Button - Visible on all devices */}
        <div className="download-section">
          <button 
            className="download-button"
            onClick={handleDownload}
          >
            <span className="download-icon">📥</span>
            Download Full Catalog (PDF)
            <span className="download-icon">📄</span>
          </button>
          <p className="download-info">Complete TRIONE Mortise Catalogue 2025 • 52 pages</p>
        </div>
      </div>
    </div>
  );
};

export default Catalog;