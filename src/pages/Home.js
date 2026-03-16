import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import GameCard from '../components/GameCard';
import gamesData from '../data/games.json';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const allTags = useMemo(() => {
    const tags = new Set();
    gamesData.forEach(game => {
      if(game.tags) game.tags.forEach(tag => tags.add(tag));
    });
    return ['All', ...Array.from(tags).sort()];
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === 'All' || 
        (game.tags && game.tags.includes(selectedTag));
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  return (
    <>
      <Helmet>
        <title>Vixel Games</title>
        <meta name="description" content="A collection of fun and silly games made with the LÖVE (Love2D) framework. Play them all directly in your browser!" />
        <meta name="keywords" content="love2d, indie games, browser games, game collection, löve framework" />
        <meta property="og:title" content="Vixel Games" />
        <meta property="og:description" content="Play fun and silly Love2D games right in your browser!" />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="hero">
        <div className="hero-bg">
          <div className="hero-particle hero-particle--1">🌟</div>
          <div className="hero-particle hero-particle--2">💫</div>
          <div className="hero-particle hero-particle--3">⭐</div>
          <div className="hero-particle hero-particle--4">✨</div>
          <div className="hero-particle hero-particle--5">🎮</div>
          <div className="hero-particle hero-particle--6">🕹️</div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-line hero-title-accent">Vixel Games</span>
          </h1>
          <p className="hero-subtitle">
            Silly games made with love using the LÖVE framework
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">{gamesData.length}</span>
              <span className="hero-stat-label">Games</span>
            </div>
            <div className="hero-stat-divider">💖</div>
            <div className="hero-stat">
              <span className="hero-stat-number">{allTags.length - 1}</span>
              <span className="hero-stat-label">Genres</span>
            </div>
            <div className="hero-stat-divider">💖</div>
            <div className="hero-stat">
              <span className="hero-stat-number">∞</span>
              <span className="hero-stat-label">Fun</span>
            </div>
          </div>
        </div>
      </section>

      <section className="games-section">
        <div className="games-filters">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="search-clear" 
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            )}
          </div>
          <div className="tag-filters">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`tag-filter ${selectedTag === tag ? 'tag-filter--active' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {filteredGames.length > 0 ? (
          <div className="games-grid">
            {filteredGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <span className="no-results-icon">😿</span>
            <p>No games found matching your search...</p>
            <button 
              className="no-results-reset"
              onClick={() => { setSearchTerm(''); setSelectedTag('All'); }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default Home;