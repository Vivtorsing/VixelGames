import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Nav from "./components/Nav";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import "./App.css";

function App() {
  return (
    <HelmetProvider>
      <Router basename="/VixelGames">
        <Nav />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:gameId" element={<GamePage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;