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

        <section className="about">
          <div className="about-grid">
            <div className="about-card">
              <p className="section-label">Who we are</p>
              <p>
                Our founder, Hema, completed a Master&apos;s degree in 2024,
                equipped with a deep understanding of the threats posed
                online. She&apos;s held several roles in tech and cybersecurity
                and hopes to bring that understanding to communities most
                harmed.
              </p>
              <p>
                The reality is, solely in 2025, over $442 billion was lost
                globally to online scams and fraud. This primarily targets
                older adults.
              </p>
              <p>
                We seek to give guidance by providing talks and information,
                in partnership with a wide number of senior living
                facilities.
              </p>
            </div>

            <aside className="about-highlight">
              <span className="about-stat">$442B</span>
              <p>
                Lost globally to online scams and fraud in 2025 alone —
                primarily targeting older adults.
              </p>
              <div className="about-divider"></div>
              <span className="about-footnote">
                Education is the best defence.
              </span>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
