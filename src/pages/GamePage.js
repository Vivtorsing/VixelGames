import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ImageGallery from '../components/ImageGallery';
import gamesData from '../data/games.json';

function GamePage() {
  const { gameId } = useParams();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const game = useMemo(() => gamesData.find(g => g.id === gameId), [gameId]);

  //dont load iframe game if react snap
  const isPrerender = navigator.userAgent === "ReactSnap";
  /*useEffect(() => {
    const isReactSnap = typeof navigator !== 'undefined' && /ReactSnap/.test(navigator.userAgent);
    console.log(isReactSnap);
    if(isReactSnap) return;
  })*/

  if(!game) {
    return <Navigate to="/" replace />;
  }

  //json structure
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.name,
    "description": game.description,
    "gamePlatform": "Web Browser",
    "applicationCategory": "Game",
    "operatingSystem": "Any",
    "datePublished": game.releaseDate,
    "version": game.version,
    "genre": game.tags?.join(', ')
  };

  const accentColor = game.color || '#6c5ce7';

  return (
    <>
      <Helmet>
        <title>{game.seo?.title || game.name}</title>
        <meta name="description" content={game.seo?.description || game.description} />
        {game.seo?.keywords && (
          <meta name="keywords" content={game.seo.keywords.join(', ')} />
        )}
        <meta property="og:title" content={game.seo?.title || game.name} />
        <meta property="og:description" content={game.seo?.description || game.description} />
        <meta property="og:type" content="website" />
        {game.images && game.images.length > 0 && (
          <meta property="og:image" content={`${process.env.PUBLIC_URL}/${game.images[0]}`} />
        )}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="game-page" style={{ '--accent-color': accentColor }}>
        <div className="game-page-header">
          <Link to="/" className="back-button">
            <span>←</span> Back to Games
          </Link>
          <div className="game-page-title-area">
            <h1 className="game-page-title">{game.name}</h1>
            <div className="game-page-tags">
              {game.tags?.map((tag, i) => (
                <span key={i} className="game-page-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="game-iframe-section"
        style={{ 
              minWidth: `${game.width}px`,
              aspectRatio: `${game.width} / ${game.height}`
            }}>
          <div 
            className="game-iframe-container"
            style={{ 
              minWidth: `${game.width}px`,
              aspectRatio: `${game.width} / ${game.height}`
            }}
          >
            {!iframeLoaded && (
              <div className="game-loader">
                <div className="game-loader-spinner"></div>
                <p>Loading {game.name}...</p>
                <p className="game-loader-sub">✨ Preparing the magic ✨</p>
              </div>
            )}

            {isPrerender ? (
              <div className="game-loader">
                <div className="game-loader-spinner"></div>
                <p>Loading {game.name}...</p>
                <p className="game-loader-sub">✨ Preparing the magic ✨</p>
              </div>
            ): (
              <iframe
                src={`${process.env.PUBLIC_URL}/games/${game.folder}/index.html`}
                width={game.width}
                height={game.height}
                //title={game.name}
                className={`game-iframe ${iframeLoaded ? 'game-iframe--loaded' : ''}`}
                onLoad={() => setIframeLoaded(true)}
                //allow="autoplay; gamepad"
                //sandbox="allow-scripts allow-same-origin allow-popups"
              />

            )}
            {/*<iframe
              src={`${process.env.PUBLIC_URL}/games/${game.folder}/index.html`}
              width={game.width}
              height={game.height}
              //title={game.name}
              className={`game-iframe ${iframeLoaded ? 'game-iframe--loaded' : ''}`}
              onLoad={() => setIframeLoaded(true)}
              //allow="autoplay; gamepad"
              //sandbox="allow-scripts allow-same-origin allow-popups"
            />*/}
          </div>
        </div>

        <div className="game-info-grid">
          <div className="game-info-card game-info-description">
            <h2 className="section-title">
              <span className="section-title-icon">📖</span>
              About
            </h2>
            <p>{game.description}</p>
          </div>

          <div className="game-info-card game-info-howtoplay">
            <h2 className="section-title">
              <span className="section-title-icon">🕹️</span>
              How to Play
            </h2>
            <p>{game.howToPlay}</p>
            {game.controls && game.controls.length > 0 && (
              <div className="controls-table">
                <h3 className="controls-title">Controls</h3>
                {game.controls.map((ctrl, i) => (
                  <div key={i} className="control-row">
                    <kbd className="control-key">{ctrl.key}</kbd>
                    <span className="control-action">{ctrl.action}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="game-info-card game-info-details">
            <h2 className="section-title">
              <span className="section-title-icon">ℹ️</span>
              Details
            </h2>
            <div className="details-list">
              <div className="detail-item">
                <span className="detail-label">Version</span>
                <span className="detail-value">{game.version}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Released</span>
                <span className="detail-value">
                  {new Date(game.releaseDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Resolution</span>
                <span className="detail-value">{game.width} × {game.height}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Engine</span>
                <span className="detail-value">LÖVE (Love2D)</span>
              </div>
            </div>
          </div>
        </div>

        <ImageGallery images={game.images} gameName={game.name} />
      </div>
    </>
  );
}

export default GamePage;