import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

export default function About() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)
  
  useEffect(() => {
    const section = sectionRef.current
    const texts = textRef.current ? textRef.current.children : []
    const image = imageRef.current
    
    // Parallax effect on image
    if (image && section) {
      gsap.fromTo(image, 
        { y: -30, scale: 1.05 },
        {
          y: 30,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      )
    }

    // Text Reveal
    if (texts.length > 0 && section) {
      gsap.fromTo(texts,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          }
        }
      )
    }
  }, [])

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="container about-container">
        <div className="about-content" ref={textRef}>
          <h4 className="about-subtitle">ABOUT EUPHORIA</h4>
          <h2 className="about-title">
            MORE THAN A FEST.<br/>
            IT'S A FEELING.
          </h2>
          <p className="about-description">
            Euphoria is the annual cultural fest of Meenakshi Sundararajan Engineering College. It is a celebration of creativity, culture, and the limitless spirit of young minds coming together to break boundaries and create timeless memories.
          </p>
          
          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-number">10+</span>
              <span className="stat-label">EVENTS</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">200+</span>
              <span className="stat-label">PARTICIPANTS</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">∞</span>
              <span className="stat-label">POSSIBILITIES</span>
            </div>
          </div>
        </div>
        
        <div className="about-image-wrapper">
          <div className="about-image-outer-frame">
            <div className="about-image-mask">
              <img 
                ref={imageRef}
                src="https://www.joonsquare.com/usermanage/image/business/meenakshi-sundararajan-engineering-college-chennai-15761/meenakshi-sundararajan-engineering-college-chennai-meenakshi-sundararajan-engineering-college-1.jpg"
                alt="Meenakshi Sundararajan Engineering College Campus - MSEC Kodambakkam"
                className="about-image-img"
                loading="lazy"
              />
              <div className="about-image-overlay"></div>
              <div className="about-image-badge">
                <span className="badge-dot"></span>
                <span className="badge-text">MSEC CAMPUS • KODAMBAKKAM</span>
              </div>
            </div>
            <div className="about-decoration" aria-hidden="true">
              <span className="decor-line"></span>
              <span className="decor-text">ART CONNECTS WHAT TECHNOLOGY CANNOT.</span>
              <span className="decor-line"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
