import React from 'react';

export default function App() {
  return (
    <>
      <div className="background-effects">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
      </div>
      <div className="grid-bg"></div>

      <header>
        <nav>
          <a href="/" className="logo">Philly Cyber Gaurd</a>
          <div className="nav-links">
            <a href="#programs">Programs</a>
            <a href="#facilities">Facilities</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-box">
            <h1>Helping Seniors Stay Safe Online</h1>
            <h2>
              Providing resources and talks to senior living facilities
              in the Philadelphia Metro.
            </h2>
          </div>
        </section>
      </main>
    </>
  );
}
