// components/Catalog.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Catalog.css';

const Catalog = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const scrollContainerRef = useRef(null);
  
  // Array of catalog images (keep all your images)
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
    'https://i.postimg.cc/0ydG5CCD/Gemini-Generated-Image-s94zjss94zjss94z.png',
  ];

  // Detect iOS device
  useEffect(() => {
    const checkIOS = () => {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    };
    setIsIOS(checkIOS());
  }, []);

  // Handle resize with debounce
  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);
        
        // Reset page when switching between mobile/desktop
        if (mobile !== isMobile) {
          setCurrentPage(0);
        }
        
        // Reset visible count for iOS when switching to mobile
        if (mobile && isIOS) {
          setVisibleCount(20);
        }
      }, 250);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [isMobile, isIOS]);

  // Progressive loading for iOS with Intersection Observer
  useEffect(() => {
    if (!isMobile || !isIOS || !scrollContainerRef.current) return;
    
    let observer;
    let loadingTimeout;
    
    const loadMoreImages = () => {
      if (isLoadingMore) return;
      if (visibleCount >= catalogImages.length) return;
      
      setIsLoadingMore(true);
      
      // Simulate loading delay for better UX
      loadingTimeout = setTimeout(() => {
        setVisibleCount(prev => Math.min(prev + 10, catalogImages.length));
        setIsLoadingMore(false);
      }, 500);
    };
    
    // Create an observer to watch for the last image
    const setupObserver = () => {
      const lastImage = document.querySelector('.mobile-page-item:last-child');
      if (lastImage) {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && visibleCount < catalogImages.length) {
              loadMoreImages();
            }
          },
          { root: scrollContainerRef.current, threshold: 0.1, rootMargin: '100px' }
        );
        
        observer.observe(lastImage);
      }
    };
    
    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(setupObserver, 100);
    
    return () => {
      if (observer) observer.disconnect();
      clearTimeout(timeoutId);
      clearTimeout(loadingTimeout);
    };
  }, [isMobile, isIOS, visibleCount, catalogImages.length, isLoadingMore]);

  // Manual scroll listener as fallback
  useEffect(() => {
    if (!isMobile || !isIOS || !scrollContainerRef.current) return;
    
    let scrollTimeout;
    
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        
        const { scrollTop, scrollHeight, clientHeight } = container;
        const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
        
        // Load more when user scrolls to 80% of the content
        if (scrollPercentage > 0.8 && !isLoadingMore && visibleCount < catalogImages.length) {
          setIsLoadingMore(true);
          
          setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + 10, catalogImages.length));
            setIsLoadingMore(false);
          }, 300);
        }
      }, 150);
    };
    
    const container = scrollContainerRef.current;
    container.addEventListener('scroll', handleScroll);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isMobile, isIOS, visibleCount, catalogImages.length, isLoadingMore]);

  // Lazy load images with IntersectionObserver
  useEffect(() => {
    if (!isMobile || !isIOS) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src && !img.src) {
              img.src = src;
              img.classList.add('loaded');
            }
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '100px', threshold: 0.01 }
    );
    
    const images = document.querySelectorAll('.mobile-page-image[data-src]');
    images.forEach(img => observer.observe(img));
    
    return () => observer.disconnect();
  }, [isMobile, isIOS, visibleCount]);

  const totalPages = isMobile ? catalogImages.length : Math.ceil(catalogImages.length / 2);

  const goToPreviousPage = useCallback(() => {
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
  }, [currentPage, isFlipping, isMobile]);

  const goToNextPage = useCallback(() => {
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
  }, [currentPage, totalPages, isFlipping, isMobile]);

  const getCurrentContent = useCallback(() => {
    if (isMobile) {
      return { single: catalogImages[currentPage] };
    } else {
      const startIndex = currentPage * 2;
      return {
        left: catalogImages[startIndex],
        right: catalogImages[startIndex + 1]
      };
    }
  }, [isMobile, currentPage, catalogImages]);

  const content = getCurrentContent();

  const handleDownload = () => {
    const pdfUrl = 'https://drive.google.com/file/d/1sSa4pJ0spc3PRXRmkLLnhoTSbO1xEvQZ/view?usp=sharing';
    window.open(pdfUrl, '_blank');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isMobile && !isIOS) {
        if (e.key === 'ArrowLeft') {
          goToPreviousPage();
        } else if (e.key === 'ArrowRight') {
          goToNextPage();
        }
      }
    };

    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPreviousPage, goToNextPage, isMobile, isIOS]);

  // Handle touch events for iOS swipe
  useEffect(() => {
    if (!isMobile || !isIOS) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };
    
    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeThreshold = 50;
      
      if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left - next page
        if (currentPage < totalPages - 1) {
          setCurrentPage(currentPage + 1);
        }
      } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right - previous page
        if (currentPage > 0) {
          setCurrentPage(currentPage - 1);
        }
      }
    };
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [currentPage, totalPages, isMobile, isIOS]);

  // Preload adjacent images for desktop
  useEffect(() => {
    if (!isMobile && catalogImages[currentPage * 2 + 2]) {
      const img = new Image();
      img.src = catalogImages[currentPage * 2 + 2];
    }
    if (!isMobile && catalogImages[currentPage * 2 + 3]) {
      const img = new Image();
      img.src = catalogImages[currentPage * 2 + 3];
    }
  }, [currentPage, isMobile, catalogImages]);

  // Function to manually load more pages (for "Load More" button)
  const loadMorePages = () => {
    if (!isLoadingMore && visibleCount < catalogImages.length) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleCount(prev => Math.min(prev + 20, catalogImages.length));
        setIsLoadingMore(false);
      }, 300);
    }
  };

  // Render mobile view
  const renderMobileView = () => {
    const visibleImages = catalogImages.slice(0, visibleCount);
    const hasMore = visibleCount < catalogImages.length;
    
    return (
      <div className="mobile-scroll-view" ref={scrollContainerRef}>
        {visibleImages.map((image, index) => (
          <div key={index} className="mobile-page-item">
            {isIOS ? (
              <img 
                data-src={image}
                alt={`Catalog page ${index + 1}`}
                className="mobile-page-image lazy"
                loading="lazy"
              />
            ) : (
              <img 
                src={image}
                alt={`Catalog page ${index + 1}`}
                className="mobile-page-image"
                loading="lazy"
              />
            )}
            <div className="mobile-page-number">Page {index + 1}</div>
          </div>
        ))}
        
        {hasMore && (
          <div className="loading-more-container">
            {isLoadingMore ? (
              <div className="loading-indicator">
                <div className="loader"></div>
                <p>Loading more pages...</p>
              </div>
            ) : (
              <button className="load-more-button" onClick={loadMorePages}>
                Load More Pages ({catalogImages.length - visibleCount} remaining)
              </button>
            )}
          </div>
        )}
        
        {!hasMore && visibleCount > 0 && (
          <div className="end-of-catalog">
            <p>✓ End of Catalog</p>
            <p className="total-pages-count">Total {catalogImages.length} pages</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1>TRIONE MORTISE CATALOGUE 2025</h1>
        <p className="catalog-subtitle">
          {isMobile 
            ? `Showing ${visibleCount} of ${catalogImages.length} Pages` 
            : `Spread ${currentPage + 1} of ${totalPages}`}
        </p>
      </div>

      <div className="book-container">
        <div className={`book-spread ${isMobile ? 'mobile-view' : ''} ${isFlipping ? `flipping-${flipDirection}` : ''}`}>
          {isMobile ? (
            renderMobileView()
          ) : (
            <>
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

        {!isMobile && (
          <>
            <div className="navigation-controls">
              <button 
                className="nav-button prev-button"
                onClick={goToPreviousPage}
                disabled={currentPage === 0 || isFlipping}
                aria-label="Previous page"
              >
                <span className="nav-icon">◀</span>
                <span className="nav-text">Previous</span>
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
                aria-label="Next page"
              >
                <span className="nav-text">Next</span>
                <span className="nav-icon">▶</span>
              </button>
            </div>

            <div className="keyboard-hint">
              ← Use keyboard arrows to flip pages →
            </div>
          </>
        )}

        <div className="download-section">
          <button 
            className="download-button"
            onClick={handleDownload}
            aria-label="Download PDF catalog"
          >
            <span className="download-icon">📥</span>
            <span>Download Full Catalog (PDF)</span>
            <span className="download-icon">📄</span>
          </button>
          <p className="download-info">Complete TRIONE Mortise Catalogue 2025 • 169 pages</p>
        </div>
      </div>
    </div>
  );
};

export default Catalog;