import React, { useState, useEffect } from 'react';
import { createPortal } from "react-dom";

function ImageGallery({ images, gameName }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  //dont scroll when looking at images
  useEffect(() => {
    if(selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedIndex]);

  if(!images || images.length === 0) return null;

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const goNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };
  const goPrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="gallery">
      <h2 className="section-title">
        <span className="section-title-icon">📸</span>
        Screenshots
      </h2>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <button
            key={i}
            className="gallery-item"
            onClick={() => openLightbox(i)}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/${img}`}
              alt={`${gameName} screenshot ${i + 1}`}
              className="gallery-image"
              loading="lazy"
            />
            <div className="gallery-item-overlay">
              <span>🔍</span>
            </div>
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        createPortal(
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>✕</button>
          {images.length > 1 && (
            <>
              <button className="lightbox-nav lightbox-prev" onClick={goPrev}>❮</button>
              <button className="lightbox-nav lightbox-next" onClick={goNext}>❯</button>
            </>
          )}
          <img
            src={`${process.env.PUBLIC_URL}/${images[selectedIndex]}`}
            alt={`${gameName} screenshot ${selectedIndex + 1}`}
            className="lightbox-image"
          />
          <div className="lightbox-counter">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>,
        document.body
        )
      )}
    </div>
  );
}

export default ImageGallery;