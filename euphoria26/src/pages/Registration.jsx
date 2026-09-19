import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  Search, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  Users, 
  SlidersHorizontal, 
  Code, 
  Gamepad2, 
  Cpu, 
  Wrench, 
  BookOpen, 
  Sparkles,
  Info,
  ArrowRight,
  Activity,
  Music
} from 'lucide-react'
import { EVENTS, DEFAULT_GOOGLE_FORM_URL } from '../data/events'
import './Registration.css'

export default function Registration() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialFilter = queryParams.get('category') || 'all'

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(initialFilter)

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
    const matchesSearch = 
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.venue.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCat = selectedCategory === 'all' || ev.category === selectedCategory
    return matchesSearch && matchesCat
  })

  const handleRegisterClick = (e, formUrl) => {
    e.stopPropagation()
    const targetUrl = formUrl || DEFAULT_GOOGLE_FORM_URL
    window.open(targetUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="registration-static-page pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        
        {/* Page Hero Header */}
        <div className="reg-hero-header text-center max-w-3xl mx-auto mb-10">
          <span className="text-gold tracking-[0.3em] text-xs font-mono uppercase inline-block mb-3 bg-gold/10 px-4 py-1.5 rounded-full border border-gold/20">
            EUPHORIA 2026 REGISTRATION
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight uppercase">
            CHOOSE YOUR <span className="text-gold">ARENA</span>
          </h1>
          <p className="text-dim text-xs md:text-sm mt-3 leading-relaxed font-sans">
            Browse all flagship events below. Tap on any event poster or click the register button to open the official Google Form application directly.
          </p>

          {/* Quick Notice Banner */}
          <div className="mt-5 p-3.5 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center gap-2 text-xs text-gold/90 font-mono">
            <Info size={16} className="text-gold shrink-0" />
            <span>Clicking <strong>Register</strong> opens the Google Form registration link.</span>
          </div>
        </div>

        {/* Toolbar: Search & Category Filter */}
        <div className="reg-toolbar-panel mb-10">
          <div className="reg-toolbar-inner">
            
            {/* Search Box */}
            <div className="reg-search-wrap">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search events, department, venue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="reg-search-input"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="reg-cat-scroll">
              {categories.map((cat) => {
                const IconComponent = cat.icon
                const isActive = selectedCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`reg-cat-btn ${isActive ? 'active' : ''}`}
                  >
                    <IconComponent size={14} />
                    <span>{cat.label}</span>
                  </button>
                )
              })}
            </div>

          </div>
        </div>

        {/* Events Poster Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="reg-poster-card group relative bg-[#09090e] rounded-2xl border border-white/10 overflow-hidden flex flex-col transition-all duration-300 hover:border-gold/60 hover:shadow-2xl hover:shadow-gold/15"
              onClick={() => handleRegisterClick(null, ev.googleFormUrl)}
            >
              {/* Poster Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/60 cursor-pointer">
                <img
                  src={ev.image}
                  alt={ev.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Poster Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090e] via-transparent to-black/40 pointer-events-none" />

                {/* Top Badge: Department */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
                  <span className="text-[10px] font-mono uppercase px-3 py-1 bg-black/85 backdrop-blur-md text-gold border border-gold/30 rounded-full font-bold shadow-md">
                    {ev.categoryLabel}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 bg-black/85 backdrop-blur-md text-white/90 border border-white/20 rounded-full">
                    {ev.participation_type}
                  </span>
                </div>

                {/* Hover Quick Register Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center z-10 backdrop-blur-sm">
                  <div className="w-14 h-14 rounded-full bg-gold text-black flex items-center justify-center mb-3 shadow-lg shadow-gold/30 scale-90 group-hover:scale-100 transition-transform">
                    <ExternalLink size={24} />
                  </div>
                  <span className="font-display font-bold text-white text-lg tracking-wide uppercase">
                    OPEN GOOGLE FORM
                  </span>
                  <p className="text-dim text-xs mt-1 font-mono">
                    Tap anywhere to register for {ev.title}
                  </p>
                </div>
              </div>

              {/* Event Card Content Info */}
              <div className="p-6 flex flex-col flex-grow justify-between relative z-10">
                <div>
                  <div className="text-gold/80 text-xs font-mono uppercase tracking-widest mb-1">
                    {ev.department}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white group-hover:text-gold transition-colors tracking-tight">
                    {ev.title}
                  </h3>
                  <p className="text-dim text-xs font-sans mt-2 line-clamp-2 leading-relaxed">
                    {ev.subtitle} — {ev.description}
                  </p>
                </div>

                {/* Event Metadata Specs */}
                <div className="mt-5 pt-4 border-t border-white/10 space-y-2 text-xs font-mono text-white/80">
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-gold shrink-0" />
                    <span>{ev.date} • {ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-gold shrink-0" />
                    <span className="truncate">{ev.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={13} className="text-gold shrink-0" />
                    <span>{ev.participation_type === 'team' ? `Team: ${ev.min_members}-${ev.max_members} Members` : 'Solo Participation'}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => handleRegisterClick(e, ev.googleFormUrl)}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-[#f5d77f] via-[#d4af64] to-[#b8860b] text-black font-display font-bold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 shadow-md shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Register</span>
                    <ExternalLink size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/events/${ev.id}`)
                    }}
                    className="py-3 px-4 bg-white/5 hover:bg-white/10 text-white font-mono text-xs rounded-xl border border-white/15 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="View full event details & rules"
                  >
                    <span>Details</span>
                    <ArrowRight size={13} className="text-gold" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty Search Result State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-20 bg-[#09090d] rounded-2xl border border-white/10 p-8">
            <p className="text-dim text-lg mb-4">No events found matching "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="px-6 py-2.5 bg-gold/10 border border-gold/30 text-gold rounded-full text-xs font-mono uppercase tracking-widest hover:bg-gold/20 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
