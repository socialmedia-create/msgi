import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import './Categories.css'

const CATEGORIES = [
  {
    id: 'technical',
    title: 'TECHNICAL & CODING',
    desc: 'Decode. Debug. Escape.',
    img: '/images/EUPHORIA EVENTS/escape.exe.jpeg'
  },
  {
    id: 'gaming',
    title: 'GAMING & DEV',
    desc: 'Where Hacking Meets Gaming',
    img: '/images/EUPHORIA EVENTS/gameathon.jpeg'
  },
  {
    id: 'robotics',
    title: 'ROBOTICS & BOTS',
    desc: 'Clash of Machines • Sumo Bot',
    img: '/images/EUPHORIA EVENTS/iron arena.jpeg'
  },
  {
    id: 'mechanical',
    title: 'MECHANICAL & DESIGN',
    desc: 'Bid • Build • Innovate',
    img: '/images/EUPHORIA EVENTS/mechanism auction.jpeg'
  },
  {
    id: 'literary',
    title: 'DRAMATICS & LITERARY',
    desc: 'Survive • Argue • Convince',
    img: '/images/EUPHORIA EVENTS/shipwreck.jpeg'
  },
  {
    id: 'innovation',
    title: 'SMART CITIES & IOT',
    desc: 'Sustainable Green Technology',
    img: '/images/EUPHORIA EVENTS/smart cities.jpeg'
  }
]

export default function Categories() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const cards = gridRef.current?.children
    if (!cards) return
    
    gsap.fromTo(cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    )
  }, [])

  const scrollToEvents = () => {
    const el = document.getElementById('events')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="categories" className="categories-section" ref={sectionRef}>
      <div className="container">
        <div className="categories-header">
          <div>
            <h4 className="section-subtitle">EVENT CATEGORIES</h4>
            <h2 className="section-title">EXPLORE YOUR ELEMENT</h2>
          </div>
          <button onClick={scrollToEvents} className="view-all-link border-none bg-transparent cursor-pointer">
            VIEW ALL EVENTS <ArrowRight size={16} />
          </button>
        </div>

        <div className="categories-grid" ref={gridRef}>
          {CATEGORIES.map((cat) => (
            <div 
              onClick={scrollToEvents} 
              className="category-card cursor-pointer" 
              key={cat.id}
            >
              <div 
                className="category-bg"
                style={{ 
                  backgroundImage: `url("${cat.img}")`,
                  filter: 'sepia(0.15) brightness(0.7)'
                }}
              ></div>
              <div className="category-content">
                <h3 className="category-title">{cat.title}</h3>
                <p className="category-desc">{cat.desc}</p>
                <div className="category-arrow">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
