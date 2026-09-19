import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { InstagramIcon, YoutubeIcon, LinkedinIcon } from './SocialIcons'
import './Navigation.css'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const links = [
    { name: 'HOME', targetId: 'hero', path: '/' },
    { name: 'EVENTS', targetId: 'events', path: '/events' },
    { name: 'GALLERY', targetId: 'gallery', path: '/gallery' },
    { name: 'ABOUT', targetId: 'about', path: '/#about' },
    { name: 'DEV', path: '/dev' },
    { name: 'CONTACT', targetId: 'contact', path: '/contact' },
  ]

  const handleNavClick = (e, link) => {
    e.preventDefault()
    setIsOpen(false)
    
    if (link.path === '/dev') {
      navigate('/dev')
      return
    }

    if (link.name === 'HOME') {
      if (location.pathname !== '/') {
        navigate('/')
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }
    
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: link.targetId } })
    } else {
      const el = document.getElementById(link.targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <header className={`nav-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <span className="logo-mark">✧</span>
            EUPHORIA ’26
          </Link>
          
          <nav className="nav-desktop">
            {links.map((link) => {
              const isDevActive = link.name === 'DEV' && location.pathname === '/dev'
              return (
                <a 
                  key={link.name} 
                  href={link.path || `#${link.targetId}`} 
                  onClick={(e) => handleNavClick(e, link)}
                  className={`nav-link ${isDevActive ? 'active' : ''}`}
                >
                  {link.name}
                </a>
              )
            })}
            <span className="nav-editorial-tagline hidden xl:inline">Same Stage. New Stories.</span>
            <Link 
              to="/register" 
              className="nav-btn"
            >
              REGISTER NOW
            </Link>
          </nav>

          <button 
            className="nav-mobile-toggle" 
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} color="var(--color-text)" />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div className={`nav-overlay ${isOpen ? 'open' : ''}`}>
        <div className="nav-overlay-header">
          <Link to="/" className="nav-logo" onClick={() => setIsOpen(false)}>
            <span className="logo-mark">✧</span>
            EUPHORIA ’26
          </Link>
          <button 
            className="nav-mobile-close" 
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} color="var(--color-text)" />
          </button>
        </div>
        
        <div className="nav-overlay-content">
          <nav className="nav-mobile-links">
            {links.map((link, i) => {
              const isDevActive = link.name === 'DEV' && location.pathname === '/dev'
              return (
                <a 
                  key={link.name} 
                  href={link.path || `#${link.targetId}`}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`nav-mobile-link ${isDevActive ? 'nav-mobile-link-active' : ''}`}
                  style={{ animationDelay: `${0.1 + i * 0.05}s` }}
                >
                  {link.name}
                </a>
              )
            })}
            <Link 
              to="/register" 
              className="nav-mobile-link nav-mobile-link-highlight"
              style={{ animationDelay: `${0.1 + links.length * 0.05}s` }}
              onClick={() => setIsOpen(false)}
            >
              REGISTER NOW
            </Link>
          </nav>
          
          <div className="nav-overlay-footer">
            <p className="text-dim">FOLLOW THE VIBE</p>
            <div className="nav-socials">
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><InstagramIcon size={18} /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer"><YoutubeIcon size={18} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"><LinkedinIcon size={18} /></a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
