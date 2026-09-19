import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  ChevronRight, 
  MapPin, 
  SlidersHorizontal, 
  Code, 
  Gamepad2, 
  Cpu, 
  Wrench, 
  BookOpen, 
  Sparkles,
  Music,
  Activity,
  Calendar,
  Clock
} from 'lucide-react'
import './Schedule.css'

export default function Schedule() {
  const navigate = useNavigate()
  const [activeCat, setActiveCat] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('timeline') // 'timeline' | 'table'

  const categoryList = [
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

  const singleDayEvents = [
    {
      id: 'inauguration',
      time: '08:30 AM',
      fullTime: '08:30 AM - 09:15 AM',
      title: 'Grand Inauguration Ceremony',
      desc: 'Official opening ceremony, keynote addresses, and briefing for all technical & cultural conclaves.',
      category: 'Ceremony',
      catKey: 'ceremony',
      venue: 'Main Auditorium',
      image: '/images/EUPHORIA EVENTS/stackmarket.jpeg'
    },
    {
      id: 'gameathon',
      time: '08:30 AM',
      fullTime: '08:30 AM - 04:30 PM',
      title: 'GAME-A-THON',
      desc: 'Where Hacking Meets Gaming. 8-Hour rapid game development marathon by IT & DevDynasty Club.',
      category: 'Gaming & Dev',
      catKey: 'gaming',
      venue: 'CC1 Lab, Main Block',
      image: '/images/EUPHORIA EVENTS/gameathon.jpeg'
    },
    {
      id: 'shipwreck',
      time: '08:30 AM',
      fullTime: '08:30 AM - 04:30 PM',
      title: 'SHIPWRECK',
      desc: 'Survive. Argue. Convince. Theatrical character roleplay debate and survival showdown.',
      category: 'Dramatics',
      catKey: 'literary',
      venue: 'ECE Seminar Hall',
      image: '/images/EUPHORIA EVENTS/shipwreck.jpeg'
    },
    {
      id: 'iron-arena',
      time: '09:00 AM',
      fullTime: '09:00 AM - 01:00 PM',
      title: 'IRON ARENA',
      desc: 'Clash of Machines. High-octane Sumo Bot combat battles and precision obstacle driving.',
      category: 'Robotics',
      catKey: 'robotics',
      venue: 'SM Lab, Civil Block',
      image: '/images/EUPHORIA EVENTS/iron arena.jpeg'
    },
    {
      id: 'escape-exe',
      time: '09:00 AM',
      fullTime: '09:00 AM - 01:30 PM',
      title: 'ESCAPE.EXE',
      desc: 'Decode. Debug. Escape. Technical escape room challenge featuring Tech Treasure Hunt and System Breach.',
      category: 'Technical & AI',
      catKey: 'technical',
      venue: 'Main Block 3, 4 Lab CSE',
      image: '/images/EUPHORIA EVENTS/escape.exe.jpeg'
    },
    {
      id: 'mechanism-auction',
      time: '09:00 AM',
      fullTime: '09:00 AM - 03:30 PM',
      title: 'MECHANISM AUCTION',
      desc: 'Bid • Build • Innovate. Live virtual bidding auction followed by rapid mechanical design and pitch.',
      category: 'Mechanical',
      catKey: 'mechanical',
      venue: 'Mechanical Block',
      image: '/images/EUPHORIA EVENTS/mechanism auction.jpeg'
    },
    {
      id: 'stackmarket',
      time: '09:30 AM',
      fullTime: '09:30 AM - 03:30 PM',
      title: 'STACKMARKET',
      desc: 'Design. Bid. Build. Survive. Dynamic tech stack auction and fast-paced software survival hackathon.',
      category: 'Technical & AI',
      catKey: 'technical',
      venue: 'Main Block AI Lab 1&2',
      image: '/images/EUPHORIA EVENTS/stackmarket.jpeg'
    },
    {
      id: 'sound-battle',
      time: '09:00 AM',
      fullTime: '09:00 AM - 04:30 PM',
      title: 'SOUND BATTLE',
      desc: 'Instruments • Express Your Musical Identity. Instrumental music competition by VPA Club.',
      category: 'Music & Vocals',
      catKey: 'music',
      venue: 'MS Auditorium',
      image: '/images/EUPHORIA EVENTS/sound battle.jpeg'
    },
    {
      id: 'rythmix',
      time: '09:00 AM',
      fullTime: '09:00 AM - 04:30 PM',
      title: 'RYTHMIX',
      desc: 'Feel the Beat. Own the Stage. External dance competition across Western, Classical, and Folk categories.',
      category: 'Dance',
      catKey: 'dance',
      venue: 'MS Auditorium',
      image: '/images/EUPHORIA EVENTS/rythmix.jpeg'
    },
    {
      id: 'smart-cities',
      time: '10:00 AM',
      fullTime: '10:00 AM - 12:00 PM',
      title: 'SMART CITIES CHALLENGE',
      desc: 'IoT-based sustainability and urban innovation pitch. Clean tech, renewable energy & green infrastructure.',
      category: 'Smart Cities',
      catKey: 'innovation',
      venue: 'MSEC Civil Block',
      image: '/images/EUPHORIA EVENTS/smart cities.jpeg'
    },
    {
      id: 'voice-arena',
      time: '09:00 AM',
      fullTime: '09:00 AM - 04:30 PM',
      title: 'VOICE ARENA',
      desc: 'Vocal Competition • Showcase Your Voice. Solo & Acoustic/Unplugged vocal performance by VPA Club.',
      category: 'Music & Vocals',
      catKey: 'music',
      venue: 'MS Auditorium',
      image: '/images/EUPHORIA EVENTS/voice arena.jpeg'
    },
    {
      id: 'valedictory',
      time: '05:00 PM',
      fullTime: '05:00 PM - 06:30 PM',
      title: 'Valedictory & Grand Award Ceremony',
      desc: 'Presentation of trophies, merit awards, certificates, and celebration of Euphoria 2026 champions.',
      category: 'Ceremony',
      catKey: 'ceremony',
      venue: 'Main Auditorium',
      image: '/images/EUPHORIA EVENTS/rythmix.jpeg'
    }
  ]

  // Filter list by active category and search text
  const filteredList = singleDayEvents.filter(item => {
    const matchesCat = activeCat === 'all' || item.catKey === activeCat || item.category.toLowerCase().includes(activeCat.toLowerCase())
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.venue.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  const getPillClass = (catKey) => {
    switch (catKey.toLowerCase()) {
      case 'technical': return 'pill-music'
      case 'dance': return 'pill-dance'
      case 'music': return 'pill-music'
      case 'gaming': return 'pill-dance'
      case 'ceremony': return 'pill-ceremony'
      case 'robotics': return 'pill-photography'
      case 'mechanical': return 'pill-dramatics'
      case 'literary': return 'pill-dramatics'
      case 'innovation': return 'pill-music'
      default: return 'pill-default'
    }
  }

  const handleCardClick = (item) => {
    if (item.id === 'inauguration' || item.id === 'valedictory') {
      navigate('/register')
    } else {
      navigate(`/events/${item.id}`)
    }
  }

  return (
    <section id="schedule" className="schedule-section pt-28 pb-20 w-full">
      <div className="container mx-auto px-4 md:px-10 max-w-[1400px] w-full">
        
        {/* Header Section */}
        <div className="schedule-header text-center mb-8">
          <h4 className="section-subtitle text-gold tracking-[0.3em] font-mono text-xs uppercase mb-2">
            PLAN YOUR EUPHORIA
          </h4>
          <h2 className="section-title text-4xl md:text-5xl font-display font-extrabold text-white">
            EVENT <span className="text-gold">SCHEDULE</span>
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold font-mono text-xs uppercase tracking-widest mt-4">
            <Calendar size={14} />
            <span>FRIDAY, SEPTEMBER 25, 2026 · ALL EVENTS SINGLE DAY</span>
          </div>
        </div>

        {/* Single-Column Clean Container Panel */}
        <div className="schedule-container-panel">
          
          {/* Search & View Mode Toolbar */}
          <div className="schedule-toolbar">
            <div className="search-box-wrap">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
              <input
                type="text"
                placeholder="Search events by name or venue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="view-mode-toggle">
              <button
                onClick={() => setViewMode('timeline')}
                className={`toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`}
              >
                Timeline View
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              >
                Table View
              </button>
            </div>
          </div>

          {/* Category Filter Badges */}
          <div className="category-scroll-wrap">
            {categoryList.map(cat => {
              const IconComp = cat.icon
              const isActive = activeCat === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`cat-btn ${isActive ? 'active' : ''}`}
                >
                  <IconComp size={13} />
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>

          {/* Main List Rendering */}
          {filteredList.length === 0 ? (
            <div className="empty-state">
              <div className="empty-text">No events match your search or filter.</div>
              <button onClick={() => { setSearchQuery(''); setActiveCat('all'); }} className="reset-btn">
                Reset Filters
              </button>
            </div>
          ) : viewMode === 'timeline' ? (
            /* Timeline View */
            <div className="timeline-view-wrap">
              {filteredList.map((item) => (
                <div 
                  key={item.id} 
                  className="timeline-item group cursor-pointer"
                  onClick={() => handleCardClick(item)}
                >
                  {/* Left Column: Time */}
                  <div className="timeline-time-col">
                    <div className="timeline-time-text">{item.time}</div>
                    <div className="timeline-fulltime">{item.fullTime}</div>
                  </div>

                  {/* Center Node */}
                  <div className="timeline-node-col">
                    <div className="timeline-dot group-hover:scale-125 transition-transform" />
                  </div>

                  {/* Right Column: Card Content */}
                  <div className="timeline-card-col">
                    <div className="timeline-card">
                      {/* Optional Thumbnail Image */}
                      {item.image && (
                        <div className="timeline-thumb-wrap">
                          <img src={item.image} alt={item.title} className="timeline-thumb-img" />
                          <div className="timeline-thumb-overlay" />
                        </div>
                      )}

                      <div className="timeline-card-body">
                        <div className="timeline-card-header">
                          <span className={`category-pill-badge ${getPillClass(item.catKey)}`}>
                            {item.category}
                          </span>
                          <span className="timeline-venue-badge">
                            <MapPin size={11} className="text-gold" />
                            <span>{item.venue}</span>
                          </span>
                        </div>

                        <h3 className="timeline-item-title group-hover:text-gold transition-colors">
                          {item.title}
                        </h3>
                        <p className="timeline-item-desc">{item.desc}</p>
                      </div>

                      <div className="timeline-arrow-col">
                        <ChevronRight size={18} className="text-white/40 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Table View */
            <div className="table-view-wrap">
              <div className="overflow-x-auto">
                <table className="schedule-table">
                  <thead>
                    <tr>
                      <th>TIME</th>
                      <th>EVENT</th>
                      <th>CATEGORY</th>
                      <th>VENUE</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredList.map((item) => (
                      <tr 
                        key={item.id}
                        onClick={() => handleCardClick(item)}
                        className="table-row hover:bg-white/[0.04] cursor-pointer transition-colors"
                      >
                        <td className="table-time-cell">
                          <span className="font-mono text-gold font-bold text-xs">{item.fullTime}</span>
                        </td>
                        <td>
                          <div className="font-display text-white font-bold text-sm">{item.title}</div>
                          <div className="text-dim text-xs line-clamp-1 mt-0.5">{item.desc}</div>
                        </td>
                        <td>
                          <span className={`category-pill-badge ${getPillClass(item.catKey)}`}>
                            {item.category}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-1.5 text-xs text-white/80 font-mono">
                            <MapPin size={12} className="text-gold" />
                            <span>{item.venue}</span>
                          </div>
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCardClick(item)
                            }}
                            className="px-3 py-1.5 rounded-lg bg-gold/15 text-gold hover:bg-gold hover:text-black font-mono text-[11px] font-bold transition-colors cursor-pointer"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
