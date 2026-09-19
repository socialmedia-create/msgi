import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { InstagramIcon, YoutubeIcon, LinkedinIcon } from './SocialIcons'
import './Footer.css'

export default function Footer() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="global-footer">
      <div className="footer-glow"></div>
      
      <div className="container">
        {/* Top Header Branding Section */}
        <div className="footer-top text-center mb-12">
          <div className="footer-logo-wrap">
            <span className="logo-sparkle">✧</span>
            <h2 className="footer-logo-title">EUPHORIA 2026</h2>
          </div>
          <p className="footer-college-name">MEENAKSHI SUNDARARAJAN ENGINEERING COLLEGE</p>
          <div className="footer-tagline">
            <span>CREATE</span>
            <span className="dot">•</span>
            <span>CONNECT</span>
            <span className="dot">•</span>
            <span>CELEBRATE</span>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* Links Grid */}
        <div className="footer-grid py-12">
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li><button onClick={() => scrollToSection('hero')}>Home</button></li>
              <li><button onClick={() => scrollToSection('about')}>About</button></li>
              <li><button onClick={() => scrollToSection('events')}>Events</button></li>
              <li><button onClick={() => scrollToSection('schedule')}>Schedule</button></li>
              <li><button onClick={() => scrollToSection('gallery')}>Gallery</button></li>
              <li><button onClick={() => scrollToSection('venue')}>Venue</button></li>
              <li><Link to="/register">Registration</Link></li>
              <li><Link to="/dev">Dev Team</Link></li>
              <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Event Categories</h4>
            <ul className="footer-links">
              <li><button onClick={() => scrollToSection('events')}>Music</button></li>
              <li><button onClick={() => scrollToSection('events')}>Dance</button></li>
              <li><button onClick={() => scrollToSection('events')}>Literary</button></li>
              <li><button onClick={() => scrollToSection('events')}>Fine Arts</button></li>
              <li><button onClick={() => scrollToSection('events')}>Dramatics</button></li>
              <li><button onClick={() => scrollToSection('events')}>Photography</button></li>
              <li><button onClick={() => scrollToSection('events')}>Fun & Games</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Follow Us</h4>
            <div className="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon-btn">
                <InstagramIcon size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="social-icon-btn">
                <YoutubeIcon size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-icon-btn">
                <LinkedinIcon size={20} />
              </a>
            </div>
            <p className="text-dim text-xs mt-6 leading-relaxed">
              Stay connected for live updates, artist announcements, and event highlights across all social channels.
            </p>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* Bottom copyright and scroll top */}
        <div className="footer-bottom flex flex-col md:flex-row items-center justify-between py-6 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="copyright-text">
              © 2026 Euphoria ’26 • Culture / Creativity / Together
            </p>
          </div>

          <Link to="/dev" className="text-xs tracking-widest text-gold-dim hover:text-gold transition-colors font-medium">
            ✧ DIGITAL EXPERIENCE TEAM
          </Link>

          <button onClick={() => scrollToSection('hero')} className="scroll-top-btn" aria-label="Back to top">
            <span>BACK TO TOP</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
