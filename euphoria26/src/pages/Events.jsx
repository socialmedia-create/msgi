import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { EVENTS } from '../data/events'
import { 
  ChevronLeft, 
  ChevronRight, 
  Code,
  Gamepad2,
  Cpu,
  Wrench,
  BookOpen,
  Sparkles,
  Music,
  Activity,
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react'
import './Events.css'

export default function Events() {
  const navigate = useNavigate()
  const scrollContainerRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  // Drag-to-scroll tracking
  const [isMouseDown, setIsMouseDown] = useState(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const isDraggingRef = useRef(false)

  const categories = [
    { id: 'all', label: 'All Events', icon: SlidersHorizontal },
    { id: 'technical', label: 'Technical & AI', icon: Code },
    { id: 'dance', label: 'Dance', icon: Activity },
    { id: 'music', label: 'Music & Vocals', icon: Music },
    { id: 'gaming', label: 'Gaming & Dev', icon: Gamepad2 },
    { id: 'robotics', label: 'Robotics', icon: Cpu },
    { id: 'mechanical', label: 'Mechanical', icon: Wrench },
    { id: 'literary', label: 'Dramatics', icon: BookOpen },
    { id: 'innovation', label: 'Smart Cities', icon: Sparkles }
  ]

  const filteredEvents = EVENTS.filter(ev => {
    return activeCategory === 'all' || ev.category === activeCategory
  })

  // Smooth scroll to card index
  const scrollToCard = useCallback((targetIndex) => {
    const container = scrollContainerRef.current
    if (!container) return
    const clampedIndex = Math.max(0, Math.min(targetIndex, filteredEvents.length - 1))
    const cardElements = container.querySelectorAll('.event-card-horizontal')
    
    if (cardElements[clampedIndex]) {
      const card = cardElements[clampedIndex]
      const containerWidth = container.clientWidth
      const cardLeft = card.offsetLeft
      const cardWidth = card.clientWidth
      const targetScrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2)

      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth'
      })
    }
    setActiveCardIndex(clampedIndex)
  }, [filteredEvents.length])

  // Arrow controls
  const scroll = (direction) => {
    if (direction === 'left') {
      const prevIndex = activeCardIndex > 0 ? activeCardIndex - 1 : filteredEvents.length - 1
      scrollToCard(prevIndex)
    } else {
      const nextIndex = activeCardIndex < filteredEvents.length - 1 ? activeCardIndex + 1 : 0
      scrollToCard(nextIndex)
    }
  }

  // Mouse wheel listener
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        container.scrollLeft += e.deltaY * 0.85
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [])

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return
    setIsMouseDown(true)
    isDraggingRef.current = false
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft
  }

  const handleMouseLeave = () => {
    setIsMouseDown(false)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  const handleMouseMove = (e) => {
    if (!isMouseDown || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startXRef.current) * 1.4
    if (Math.abs(walk) > 5) {
      isDraggingRef.current = true
    }
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk
  }

  // Active card detection on scroll
  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container || isMouseDown) return

    const containerCenter = container.scrollLeft + (container.clientWidth / 2)
    const cardElements = container.querySelectorAll('.event-card-horizontal')
    
    let closestIndex = 0
    let minDistance = Infinity

    cardElements.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + (card.clientWidth / 2)
      const dist = Math.abs(containerCenter - cardCenter)
      if (dist < minDistance) {
        minDistance = dist
        closestIndex = idx
      }
    })

    setActiveCardIndex(closestIndex)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [filteredEvents, isMouseDown])

  return (
    <section id="events" className="events-section pt-32 md:pt-36 pb-20 min-h-screen relative overflow-hidden bg-[#040406]">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gold/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-[1450px] relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div>
            <div className="text-gold tracking-[0.3em] text-xs font-mono uppercase mb-2">
              EXPLORE EVENTS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight flex items-center gap-3">
              A STAGE FOR EVERY PASSION <span className="text-gold font-sans font-light hidden sm:inline-block">— —</span>
            </h2>
            <p className="text-dim text-xs md:text-sm tracking-[0.15em] font-mono mt-3 uppercase">
              MUSIC. DANCE. ARTS. IDEAS. GAMES. AND EVERYTHING IN BETWEEN.
            </p>
          </div>

          {/* Tagline & Schedule Button */}
          <div className="flex items-center gap-6 self-start lg:self-end">
            <span className="cursive-tagline text-gold text-xl md:text-2xl font-serif italic hidden md:inline-block opacity-90">
              Same Stage, New Stories
            </span>
            
            <button 
              onClick={() => navigate('/schedule')}
              className="view-all-events-btn flex items-center gap-2"
            >
              <span>Full Schedule</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="category-pills-wrap mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-3 min-w-max">
            {categories.map((cat) => {
              const IconComp = cat.icon
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    setActiveCardIndex(0)
                    if (scrollContainerRef.current) {
                      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
                    }
                  }}
                  className={`cat-pill-btn ${isActive ? 'active' : ''}`}
                >
                  <IconComp size={14} />
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Horizontal Event Experience Carousel */}
        <div className="carousel-outer-wrapper relative group/carousel">
          
          {/* Scroll Left Button */}
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              scroll('left')
            }}
            className="carousel-floating-arrow left-arrow"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Cards Track */}
          <div 
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`events-poster-track ${isMouseDown ? 'is-dragging' : ''}`}
          >
            {filteredEvents.map((ev, index) => {
              const isHighlight = index === activeCardIndex
              return (
                <div
                  key={ev.id}
                  onClick={(e) => {
                    if (isDraggingRef.current) {
                      e.preventDefault()
                      return
                    }
                    scrollToCard(index)
                    navigate(`/events/${ev.id}`)
                  }}
                  className={`event-card-horizontal ${isHighlight ? 'active-card' : ''}`}
                >
                  {/* Card Background Image */}
                  <img 
                    src={ev.image} 
                    alt={ev.title} 
                    loading="lazy" 
                    draggable={false}
                    className="event-card-img" 
                  />
                  
                  {/* Vignette Overlay */}
                  <div className="event-card-vignette"></div>

                  {/* Top Badge Row */}
                  <div className="event-card-top flex items-center justify-between relative z-10">
                    <span className="event-cat-badge">{ev.categoryLabel || ev.category}</span>
                    <span className="event-type-pill">{ev.participation_type}</span>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="event-card-body relative z-10 flex flex-col justify-end">
                    <h3 className="event-card-title">
                      {ev.title}
                    </h3>
                    
                    <p className="event-card-desc">
                      {ev.description}
                    </p>

                    <div className="event-card-footer flex items-center justify-between pt-3 border-t border-white/15">
                      <span className="event-card-date">
                        {ev.date} • {ev.venue}
                      </span>
                      
                      <div className="event-card-action">
                        <ArrowRight size={14} className="text-gold" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Scroll Right Button */}
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              scroll('right')
            }}
            className="carousel-floating-arrow right-arrow"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Footer Progress Counter & Hints */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10 text-xs font-mono text-dim">
          <div className="flex items-center gap-3">
            <div className="w-28 h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#f5d77f] to-[#d4af64] transition-all duration-300"
                style={{ width: `${((activeCardIndex + 1) / Math.max(1, filteredEvents.length)) * 100}%` }}
              ></div>
            </div>
            <span className="text-gold font-bold tracking-widest">
              {String(activeCardIndex + 1).padStart(2, '0')} / {String(filteredEvents.length).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-2 text-dim tracking-widest text-[11px] uppercase">
            <ChevronLeft size={12} className="text-gold" />
            <span>SWIPE OR DRAG TO EXPLORE</span>
            <ChevronRight size={12} className="text-gold" />
          </div>
        </div>

      </div>
    </section>
  )
}
