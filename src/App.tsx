import React, { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export default function App() {
  const bgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, cx: 0, cy: 0 });
  const lerpedRef = useRef({ x: 0, y: 0, cx: 0, cy: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.14,
      autoRaf: true,
    });

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeDistance = window.innerHeight * 3;
      const scrollProgress = Math.min(scrollY / fadeDistance, 1);
      const bgOpacity = 1 - scrollProgress * 0.08;
      const gridOpacity = 1 - scrollProgress * 0.2;
      const bgShift = -Math.min(scrollY * 0.045, window.innerHeight * 0.16);
      const gridShift = -scrollY * 0.12;

      if (bgRef.current) {
        bgRef.current.style.opacity = String(bgOpacity);
        bgRef.current.style.setProperty('--bg-shift', `${bgShift}px`);
      }
      if (gridRef.current) {
        gridRef.current.style.opacity = String(gridOpacity);
        gridRef.current.style.setProperty('--grid-shift', `${gridShift}px`);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    lerpedRef.current.cx = window.innerWidth / 2;
    lerpedRef.current.cy = window.innerHeight / 2;
    mouseRef.current.cx = window.innerWidth / 2;
    mouseRef.current.cy = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.cx = e.clientX;
      mouseRef.current.cy = e.clientY;
    };

    const orbConfigs = [
      { depth: 0.03, speedX: 0.0003, speedY: 0.00025, ampX: 14, ampY: 12, phaseX: 0, phaseY: 0 },
      { depth: 0.045, speedX: 0.00022, speedY: 0.0003, ampX: 12, ampY: 16, phaseX: 1.5, phaseY: 0.8 },
      { depth: 0.025, speedX: 0.00028, speedY: 0.00018, ampX: 10, ampY: 14, phaseX: 3.0, phaseY: 2.1 },
      { depth: 0.02, speedX: 0.00035, speedY: 0.00025, ampX: 16, ampY: 10, phaseX: 4.5, phaseY: 3.5 },
      { depth: 0.05, speedX: 0.0002, speedY: 0.00032, ampX: 12, ampY: 12, phaseX: 5.8, phaseY: 1.2 },
    ];

    const startTime = performance.now();

    const animate = () => {
      const elapsed = performance.now() - startTime;

      lerpedRef.current.x += (mouseRef.current.x - lerpedRef.current.x) * 0.035;
      lerpedRef.current.y += (mouseRef.current.y - lerpedRef.current.y) * 0.035;
      lerpedRef.current.cx += (mouseRef.current.cx - lerpedRef.current.cx) * 0.06;
      lerpedRef.current.cy += (mouseRef.current.cy - lerpedRef.current.cy) * 0.06;

      orbRefs.current.forEach((orb, i) => {
        if (!orb) return;
        const cfg = orbConfigs[i];

        const driftX = Math.sin(elapsed * cfg.speedX + cfg.phaseX) * cfg.ampX
                     + Math.sin(elapsed * cfg.speedX * 0.6 + cfg.phaseX + 1.3) * cfg.ampX * 0.4;
        const driftY = Math.cos(elapsed * cfg.speedY + cfg.phaseY) * cfg.ampY
                     + Math.cos(elapsed * cfg.speedY * 0.5 + cfg.phaseY + 2.1) * cfg.ampY * 0.35;

        const mouseX = lerpedRef.current.x * cfg.depth * window.innerWidth;
        const mouseY = lerpedRef.current.y * cfg.depth * window.innerHeight;

        const scale = 1 + Math.sin(elapsed * cfg.speedX * 1.3 + cfg.phaseY) * 0.05;

        orb.style.transform = `translate(${driftX + mouseX}px, ${driftY + mouseY}px) scale(${scale})`;
      });

      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform =
          `translate(${lerpedRef.current.cx - 400}px, ${lerpedRef.current.cy - 400}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const setOrbRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      orbRefs.current[index] = el;
    },
    [],
  );

  return (
    <>
      <div className="background-effects" ref={bgRef}>
        <div className="orb orb-1" ref={setOrbRef(0)} />
        <div className="orb orb-2" ref={setOrbRef(1)} />
        <div className="orb orb-3" ref={setOrbRef(2)} />
        <div className="orb orb-4" ref={setOrbRef(3)} />
        <div className="orb orb-5" ref={setOrbRef(4)} />
        <div className="cursor-glow" ref={cursorGlowRef} />
      </div>
      <div className="grid-bg" ref={gridRef}></div>

      <header>
        <nav></nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-box">
            <span className="brand-name">Philly Cyber Gaurd</span>
            <h1>Helping Seniors Stay Safe Online</h1>
            <h2>
              Providing resources and talks to senior living facilities
              in the Philadelphia Metro.
            </h2>
          </div>
          <a href="mailto:hemareddy705@gmail.com" className="cta-pill">
            Get Started <span aria-hidden="true">&rarr;</span>
          </a>
        </section>

        <section className="about">
          <div className="about-grid">
            <div className="about-card reveal">
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

            <aside className="about-highlight reveal">
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
          <h2 className="steps-heading reveal">How we help</h2>
          <p className="steps-subheading reveal">
            A step-by-step approach to keeping seniors safe in the digital world.
          </p>

          <div className="steps-list">
            <div className="step-item reveal">
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

            <div className="step-item reveal">
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

            <div className="step-item reveal">
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

            <div className="step-item reveal">
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

            <div className="step-item reveal">
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

      <footer className="site-footer">
        <a href="mailto:hemareddy705@gmail.com" className="cta-pill">
          Get Started <span aria-hidden="true">&rarr;</span>
        </a>
      </footer>
    </>
  );
}
