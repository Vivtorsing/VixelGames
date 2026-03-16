import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function GameCard({ game, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if(cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  //first image is thumbnail
  const hasImages = game.images && game.images.length > 0;
  const thumbnailSrc = hasImages 
    ? `${process.env.PUBLIC_URL}/${game.images[0]}` 
    : null;

  const accentColor = game.color || '#6c5ce7';

  return (
    <Link
      to={`/game/${game.id}`}
      className={`game-card ${isVisible ? 'game-card--visible' : ''}`}
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--accent-color': accentColor }}
    >
      <div className="game-card-image-wrapper">
        {hasImages ? (
          <img
            src={thumbnailSrc}
            alt={`${game.name} screenshot`}
            className="game-card-image"
            loading="lazy"
          />
        ) : (
          <div className="game-card-placeholder">
            <span className="game-card-placeholder-icon">🎮</span>
            <span className="game-card-placeholder-text">{game.name}</span>
          </div>
        )}
        <div className="game-card-overlay">
          <span className="game-card-play-btn">
            ▶ Play Now
          </span>
        </div>
        <div className="game-card-glow" />
      </div>
      
      <div className="game-card-content">
        <h3 className="game-card-title">
          {game.name}
          {isHovered && <span className="game-card-title-sparkle">✨</span>}
        </h3>
        
        <p className="game-card-desc">
          {game.description.length > 120 
            ? `${game.description.substring(0, 120)}...` 
            : game.description
          }
        </p>
        
        <div className="game-card-tags">
          {game.tags && game.tags.map((tag, i) => (
            <span 
              key={i} 
              className="game-card-tag"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="game-card-meta">
          <span className="game-card-version">v{game.version}</span>
          <span className="game-card-size">
            {game.width}×{game.height}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default GameCard;