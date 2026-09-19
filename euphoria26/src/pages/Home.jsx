import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import About from '../components/About'
import Events from './Events'
import Schedule from './Schedule'
import Gallery from './Gallery'
import Venue from './Venue'
import Contact from './Contact'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    // If navigation passed state to scroll to a specific section ID
    if (location.state && location.state.scrollTo) {
      const el = document.getElementById(location.state.scrollTo)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 150)
      }
    }
  }, [location])

  return (
    <main className="single-page-wrapper">
      <Hero />
      <About />
      <Events />
      <Schedule />
      <Gallery />
      <Venue />
      <Contact />
    </main>
  )
}
