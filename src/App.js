import React from "react";
import "./App.css";

function App() {
  return (
    <div className="game-page">
      <header className="header">
        <h1 className="title">🌸 Vixel Games 🌸</h1>
        <p className="subtitle">A single game (for now) made with Love2d!</p>
      </header>
      <h2 className="subtitle">Idle Satellites</h2>

      <div className="game-container">
        <iframe
          src={`${process.env.PUBLIC_URL}/idleSatellite/index.html`}
          width="1280"
          height="720"
          title="Test"
        ></iframe>
        <div className="game-frame"></div>
      </div>

      <section className="description">
        <h2>How to Play</h2>
        <p>
          Click the globe and buy satellites!
        </p>
      </section>

      <footer className="footer">
        Made with 💖 by Vixel Games
      </footer>
    </div>
  );
}

export default App;