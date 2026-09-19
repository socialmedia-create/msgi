import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FrequencyCanvas from './FrequencyCanvas'
import './Hero.css'

export default function Hero() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  const heroSectionRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const heroEl = heroSectionRef.current
    if (!heroEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(e => console.log('Autoplay prevented', e))
          } else {
            videoRef.current.pause()
          }
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [isMobile])

  return (
    <section id="hero" ref={heroSectionRef} className="hero-section">
      {/* Conditionally render only the video for the current device size */}
      <video
        key={isMobile ? 'mobile' : 'desktop'}
        ref={videoRef}
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src={isMobile ? '/mobile-hero.mp4' : '/desktop-hero.mp4'} type="video/mp4" />
      </video>

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="hero-canvas-container">
          <FrequencyCanvas />
        </div>
        
        <div className="hero-title-container">
          <h2 className="hero-subtitle">MEENAKSHI SUNDARARAJAN ENGINEERING COLLEGE</h2>
          <h1 className="hero-title">EUPHORIA</h1>
          <h3 className="hero-year">2026</h3>
          <p className="hero-tagline">A COLLEGE CULTURAL FEST</p>
          <div className="hero-themes mb-8">
            ARTS ✦ PEOPLE ✦ IDEAS ✦ CULTURE<br />
            BEYOND BOUNDARIES
          </div>
          
          <button 
            type="button"
            onClick={() => navigate('/register')}
            className="hero-register-btn"
          >
            REGISTER NOW
          </button>
        </div>
      </div>

      <div className="scroll-indicator" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>SCROLL TO EXPLORE</span>
      </div>
    </section>
  )
}
