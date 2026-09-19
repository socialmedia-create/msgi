import React, { useEffect } from 'react'
import './DevTeam.css'

export default function DevTeam() {
  useEffect(() => {
    document.title = "Development Team | EUPHORIA ’26"
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="dev-page-wrapper">
      {/* Ambient Visual Atmosphere */}
      <div className="dev-bg-atmosphere" />
      <div className="dev-bg-grain" />

      <div className="dev-container">
        {/* ===================================================
            HERO SECTION — CENTERED EDITORIAL LUXURY
            =================================================== */}
        <section className="dev-hero-section">
          <div className="dev-hero-centered">
            <div className="dev-hero-emblem">✧</div>

            <div className="dev-hero-eyebrow-wrap">
              <span className="dev-eyebrow-line left" />
              <span className="dev-hero-eyebrow">DEVELOPMENT TEAM</span>
              <span className="dev-eyebrow-line right" />
            </div>

            <h1 className="dev-hero-title">
              THE MINDS BEHIND<br className="hidden sm:inline" /> EUPHORIA
            </h1>

            <p className="dev-hero-desc">
              Three developers. One vision. Crafting the digital experience behind EUPHORIA ’26.
            </p>

            <div className="dev-script-accent">
              Code × Creativity × Culture
            </div>

            <div className="dev-hero-divider-wrap">
              <span className="dev-divider-line" />
              <span className="dev-divider-dot">✧</span>
              <span className="dev-divider-line" />
            </div>

            <div className="dev-hero-manifesto-row">
              <span>IDEAS</span>
              <span className="manifesto-dot">•</span>
              <span>DESIGN</span>
              <span className="manifesto-dot">•</span>
              <span>DEVELOP</span>
              <span className="manifesto-dot">•</span>
              <span>PEOPLE</span>
              <span className="manifesto-dot">•</span>
              <span>TOGETHER</span>
            </div>
          </div>
        </section>

        {/* ===================================================
            TEAM SECTION — EDITORIAL PROFILES
            Strict Order:
            01 — MOHAMED FAZIL (Lead / Senior)
            02 — GOKUL SANJAI
            03 — HARISH RAAGAV
            =================================================== */}
        <section className="dev-team-section">
          
          {/* -------------------------------------------------
              01 — MOHAMED FAZIL
              ------------------------------------------------- */}
          <article className="dev-member-card lead-card" id="fazil">
            <div className="dev-side-editorial-tag">
              A CLEARER TOMORROW THROUGH BETTER IDEAS.
            </div>

            <div className="dev-card-inner">
              {/* Portrait */}
              <div className="dev-portrait-wrapper">
                <img 
                  src="/images/team/mohamed-fazil.webp" 
                  alt="Mohamed Fazil — Senior / Lead Full-Stack Developer" 
                  className="dev-portrait-img dev-portrait-fazil"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = "/images/team/Mohamed Fazil.jpeg"
                  }}
                />
                <div className="dev-portrait-overlay dev-overlay-right-fade" />
              </div>

              {/* Editorial Details */}
              <div className="dev-card-content">
                <div className="dev-number-wrap">
                  <span className="dev-number">01</span>
                  <span className="dev-number-line" />
                </div>

                <h2 className="dev-member-name">MOHAMED FAZIL</h2>
                <div className="dev-member-role">SENIOR / LEAD FULL-STACK DEVELOPER</div>

                <p className="dev-member-desc">
                  Architecting the experience from idea to execution. From frontend and backend 
                  systems to registration, administration, performance and deployment — 
                  bringing the entire digital experience together.
                </p>

                <blockquote className="dev-member-quote">
                  “Turning vision into reality.”
                </blockquote>

                <span className="dev-card-corner-index">// 01</span>
              </div>
            </div>
          </article>

          {/* -------------------------------------------------
              02 — GOKUL SANJAI (Alternating Layout)
              ------------------------------------------------- */}
          <article className="dev-member-card" id="gokul">
            <div className="dev-card-inner reverse-layout">
              {/* Editorial Details on Left */}
              <div className="dev-card-content">
                <div className="dev-number-wrap">
                  <span className="dev-number">02</span>
                  <span className="dev-number-line" />
                </div>

                <h2 className="dev-member-name">GOKUL SANJAI</h2>
                <div className="dev-member-role">CREATIVE & FRONTEND DEVELOPER</div>

                <p className="dev-member-desc">
                  Turning ideas into expressive interfaces. Focused on creative UI implementation, 
                  visual details and bringing concepts to life with engaging user experiences.
                </p>

                <blockquote className="dev-member-quote">
                  “Designs that inspire.”
                </blockquote>

                <span className="dev-card-corner-index">// 02</span>
              </div>

              {/* Portrait on Right */}
              <div className="dev-portrait-wrapper">
                <img 
                  src="/images/team/gokul-sanjai.webp" 
                  alt="Gokul Sanjai — Creative & Frontend Developer" 
                  className="dev-portrait-img dev-portrait-gokul"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = "/images/team/gokul sanjai.jpeg"
                  }}
                />
                <div className="dev-portrait-overlay dev-overlay-left-fade" />
                <div className="dev-handwritten-note">Details Create Experiences</div>
              </div>
            </div>
          </article>

          {/* -------------------------------------------------
              03 — HARISH RAAGAV
              ------------------------------------------------- */}
          <article className="dev-member-card" id="harish">
            <div className="dev-side-editorial-tag">
              INTERFACES IDEAS INTERACTIONS EVERYWHERE
            </div>

            <div className="dev-card-inner">
              {/* Portrait */}
              <div className="dev-portrait-wrapper">
                <img 
                  src="/images/team/harish-raagav.webp" 
                  alt="Harish Raagav — Frontend Developer" 
                  className="dev-portrait-img dev-portrait-harish"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = "/images/team/harish raagav.jpeg"
                  }}
                />
                <div className="dev-portrait-overlay dev-overlay-right-fade" />
              </div>

              {/* Editorial Details */}
              <div className="dev-card-content">
                <div className="dev-number-wrap">
                  <span className="dev-number">03</span>
                  <span className="dev-number-line" />
                </div>

                <h2 className="dev-member-name">HARISH RAAGAV</h2>
                <div className="dev-member-role">FRONTEND DEVELOPER</div>

                <p className="dev-member-desc">
                  Bringing interfaces to life with precision. Focused on responsive layouts, 
                  interactions and creating a seamless experience across devices.
                </p>

                <blockquote className="dev-member-quote">
                  “Interfaces for a better tomorrow.”
                </blockquote>

                <span className="dev-card-corner-index">// 03</span>
              </div>
            </div>
          </article>

        </section>

        {/* ===================================================
            MID-PAGE CINEMATIC STATEMENT
            =================================================== */}
        <section className="dev-statement-section">
          <div className="dev-statement-backdrop">
            <img 
              src="/images/team/statement-bg.webp" 
              alt="Built For A Brighter Tomorrow" 
              className="dev-statement-bg-img"
              loading="lazy"
              decoding="async"
            />
            <div className="dev-statement-gradient" />
          </div>

          <div className="dev-statement-content">
            <div className="dev-statement-col-left">
              <span>A WEBSITE</span>
              <span>A TEAM</span>
              <span>A STORY</span>
            </div>

            <div className="dev-statement-center">
              <h3 className="dev-statement-heading">
                “Same Passion.<br />
                A Bigger Tomorrow.”
              </h3>
            </div>

            <div className="dev-statement-col-right">
              <span>IDEA</span>
              <span>CODE</span>
              <span>CULTURE</span>
              <span>TOGETHER</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
