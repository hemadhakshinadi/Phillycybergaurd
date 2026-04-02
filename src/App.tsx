import React, { useEffect, useRef } from 'react';

export default function App() {
  const bgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeDistance = window.innerHeight * 0.75;
      const opacity = Math.max(0, 1 - scrollY / fadeDistance);

      if (bgRef.current) bgRef.current.style.opacity = String(opacity);
      if (gridRef.current) gridRef.current.style.opacity = String(opacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="background-effects" ref={bgRef}>
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
      </div>
      <div className="grid-bg" ref={gridRef}></div>

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

        <section className="steps">
          <h2 className="steps-heading">How we help</h2>
          <p className="steps-subheading">
            A step-by-step approach to keeping seniors safe in the digital world.
          </p>

          <div className="steps-list">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Scam Awareness Training</h3>
                <p className="step-description">
                  Teach seniors how to recognize:
                </p>
                <ul className="step-bullets">
                  <li>Phishing emails</li>
                  <li>Fake tech support scams</li>
                  <li>Fake government calls</li>
                  <li>Online shopping scams</li>
                </ul>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Device Security Setup</h3>
                <p className="step-description">
                  Help seniors:
                </p>
                <ul className="step-bullets">
                  <li>Secure smartphones</li>
                  <li>Install antivirus software</li>
                  <li>Set strong passwords</li>
                  <li>Enable two-factor authentication</li>
                </ul>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Digital Literacy</h3>
                <p className="step-description">
                  Teach seniors:
                </p>
                <ul className="step-bullets">
                  <li>How to use email safely</li>
                  <li>How to browse the internet safely</li>
                  <li>How to use smartphones and apps</li>
                  <li>How to avoid suspicious links</li>
                </ul>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Programs</h3>
                <ul className="step-bullets">
                  <li>Free cybersecurity workshops</li>
                  <li>Senior technology safety seminars</li>
                  <li>Community awareness events</li>
                </ul>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Support System</h3>
                <ul className="step-bullets">
                  <li>Email help for seniors</li>
                  <li>Phone support for scam questions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
