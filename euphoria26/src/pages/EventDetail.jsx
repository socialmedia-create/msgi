import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ArrowLeft, 
  CheckCircle, 
  Phone, 
  ShieldAlert, 
  Layers, 
  Cpu, 
  Target, 
  Sparkles, 
  ExternalLink,
  Award,
  Compass,
  Tag
} from 'lucide-react'
import { EVENTS } from '../data/events'
import './EventDetail.css'

export default function EventDetail() {
  const { eventId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    }
  }, [eventId])

  const event = EVENTS.find(e => e.id === eventId) || EVENTS[0]
  const relatedEvents = EVENTS.filter(e => e.id !== event.id).slice(0, 3)

  return (
    <div className="event-detail-page pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-[1320px]">
        
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="back-link inline-flex items-center gap-2 cursor-pointer bg-transparent border-none text-dim hover:text-gold transition-colors font-mono text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Events
          </button>

          <span className="text-[11px] font-mono text-gold/70 tracking-widest uppercase hidden sm:inline-block">
            EUPHORIA 2026 · {event.categoryLabel || event.category}
          </span>
        </div>

        {/* ========================================================
            HERO SHOWCASE: FULL UNCROPPED POSTER + ESSENTIAL DETAILS 
           ======================================================== */}
        <div className="event-hero-showcase rounded-3xl p-6 md:p-10 mb-12 border border-white/10 bg-[#0a0a10]/90 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Background Glow */}
          <div className="absolute top-0 right-1/4 w-[450px] h-[300px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="event-hero-flex-layout relative z-10">
            
            {/* Left Column: Full Event Poster Image */}
            <div className="event-hero-poster-col">
              <div className="event-full-poster-wrapper group">
                <div className="event-full-poster-frame relative rounded-2xl overflow-hidden border border-gold/40 shadow-2xl shadow-black/80 bg-[#040406]">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="event-full-poster-img" 
                  />
                  <div className="poster-frame-badge">
                    <Tag size={12} className="text-gold" />
                    <span>Official Event Poster</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Subtitle, Key Meta Chips, Quick Register CTA */}
            <div className="event-hero-info-col space-y-6">
              
              {/* Category & Eligibility Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="category-pill uppercase">{event.categoryLabel || event.category}</span>
                {event.open_to && (
                  <span className="px-3.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-white/10 text-white/90 border border-white/15">
                    {event.open_to}
                  </span>
                )}
                <span className="px-3.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-gold/10 text-gold border border-gold/30">
                  Registration Free
                </span>
              </div>

              {/* Event Title & Subtitle */}
              <div>
                <h1 className="event-hero-title font-display font-extrabold text-white tracking-tight leading-tight">
                  {event.title}
                </h1>
                <p className="event-hero-subtitle text-gold font-sans font-medium text-lg md:text-xl mt-2 tracking-wide">
                  {event.subtitle}
                </p>
              </div>

              {/* Department Organizer Banner */}
              {event.department && (
                <div className="text-xs font-mono tracking-widest text-dim uppercase py-2 px-4 rounded-xl bg-white/[0.03] border border-white/10 w-fit">
                  Organized by: <span className="text-white/90 font-medium">{event.department}</span>
                </div>
              )}

              {/* 4-Chip Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="meta-chip p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-1.5 text-gold text-xs font-mono mb-1">
                    <Calendar size={14} />
                    <span>DATE</span>
                  </div>
                  <span className="font-semibold text-white text-xs md:text-sm block">{event.date}</span>
                </div>

                <div className="meta-chip p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-1.5 text-gold text-xs font-mono mb-1">
                    <Clock size={14} />
                    <span>TIME</span>
                  </div>
                  <span className="font-semibold text-white text-xs md:text-sm block truncate">{event.time}</span>
                </div>

                <div className="meta-chip p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-1.5 text-gold text-xs font-mono mb-1">
                    <MapPin size={14} />
                    <span>VENUE</span>
                  </div>
                  <span className="font-semibold text-white text-xs md:text-sm block truncate">{event.venue}</span>
                </div>

                <div className="meta-chip p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-1.5 text-gold text-xs font-mono mb-1">
                    <Users size={14} />
                    <span>FORMAT</span>
                  </div>
                  <span className="font-semibold text-white text-xs md:text-sm block truncate">
                    {event.team_size || (event.participation_type === 'team' ? `${event.min_members}-${event.max_members} Mem` : 'Solo')}
                  </span>
                </div>
              </div>

              {/* Primary Register CTA on Hero */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
                <button 
                  type="button"
                  onClick={() => window.open(event.googleFormUrl || 'https://forms.google.com', '_blank', 'noopener,noreferrer')}
                  className="py-4 px-8 primary-gold-btn flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-gold/20 hover:scale-[1.02] transition-transform text-sm font-bold"
                >
                  <span>Register via Google Form</span>
                  <ExternalLink size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="py-4 px-6 bg-white/5 hover:bg-white/10 text-dim hover:text-white border border-white/15 rounded-xl text-xs font-mono tracking-wider transition-colors cursor-pointer text-center"
                >
                  Browse All Events
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Limited Seats Alert Banner if present */}
        {event.limit_notice && (
          <div className="mb-8 p-4 rounded-xl bg-red-950/40 border border-red-500/40 flex items-center gap-3 text-red-200">
            <ShieldAlert size={20} className="text-red-400 shrink-0" />
            <span className="text-xs md:text-sm font-mono tracking-wide font-medium">
              {event.limit_notice}
            </span>
          </div>
        )}

        {/* ========================================================
            DETAILED EVENT BREAKDOWN: DESCRIPTION, FLOW, RULES, RECS
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          
          {/* Left 2 Columns: In-Depth Description, Phases, Specs, Rules */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            <div className="detail-card p-6 md:p-8">
              <h3 className="card-heading flex items-center gap-2">
                <Sparkles size={18} />
                <span>About the Event</span>
              </h3>
              <p className="text-dim leading-relaxed text-sm md:text-base mt-4 mb-4">
                {event.description}
              </p>
              {event.full_description && (
                <p className="text-white/85 leading-relaxed text-sm md:text-base mb-6">
                  {event.full_description}
                </p>
              )}

              {/* Tagline Box */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-center">
                <span className="font-display italic text-gold text-sm md:text-base">
                  "{event.subtitle}"
                </span>
                {event.department && (
                  <p className="text-[11px] text-dim tracking-widest font-mono uppercase mt-2">
                    Presented by {event.department}
                  </p>
                )}
              </div>
            </div>

            {/* Event Flow / Phases if available */}
            {event.flow && event.flow.length > 0 && (
              <div className="detail-card p-6 md:p-8">
                <h3 className="card-heading flex items-center gap-2 mb-6">
                  <Layers size={18} />
                  <span>How the Event Works</span>
                </h3>
                <div className="space-y-4">
                  {event.flow.map((item, idx) => (
                    <div key={idx} className="flow-step-card p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
                      <span className="step-badge">{item.step || String(idx + 1).padStart(2, '0')}</span>
                      <div>
                        <h4 className="font-display text-gold text-sm md:text-base font-bold tracking-wide">
                          {item.title}
                        </h4>
                        <p className="text-dim text-xs md:text-sm mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rounds Breakdown if available */}
            {event.rounds && event.rounds.length > 0 && (
              <div className="detail-card p-6 md:p-8">
                <h3 className="card-heading flex items-center gap-2 mb-6">
                  <Target size={18} />
                  <span>Competition Rounds</span>
                </h3>
                <div className="space-y-4">
                  {event.rounds.map((rnd, idx) => (
                    <div key={idx} className="flow-step-card p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h4 className="font-display text-gold text-sm md:text-base font-bold">
                          {rnd.round} — {rnd.title}
                        </h4>
                        {rnd.duration && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-gold/15 text-gold border border-gold/30">
                            ⏱ {rnd.duration}
                          </span>
                        )}
                      </div>
                      <p className="text-dim text-xs md:text-sm leading-relaxed">
                        {rnd.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bot Specifications (for Iron Arena) */}
            {event.bot_specifications && event.bot_specifications.length > 0 && (
              <div className="detail-card p-6 md:p-8">
                <h3 className="card-heading flex items-center gap-2 mb-6">
                  <Cpu size={18} />
                  <span>Sumo Bot Specifications</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {event.bot_specifications.map((spec, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                      <span className="text-[11px] text-dim font-mono uppercase block mb-1">{spec.label}</span>
                      <span className="text-gold font-display font-bold text-base">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Focus Areas (for Smart Cities Challenge) */}
            {event.focus_areas && event.focus_areas.length > 0 && (
              <div className="detail-card p-6 md:p-8">
                <h3 className="card-heading flex items-center gap-2 mb-6">
                  <Compass size={18} />
                  <span>Key Focus Areas</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.focus_areas.map((area, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <h4 className="text-gold font-display text-sm font-bold mb-1">{area.title}</h4>
                      <p className="text-dim text-xs leading-relaxed">{area.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recognitions (for Game-a-Thon) */}
            {event.recognitions && event.recognitions.length > 0 && (
              <div className="detail-card p-6 md:p-8">
                <h3 className="card-heading flex items-center gap-2 mb-6">
                  <Award size={18} />
                  <span>Awards & Recognitions</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.recognitions.map((rec, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-gold/10 border border-gold/20 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gold"></div>
                      <span className="text-xs font-mono tracking-wide text-white/90 font-medium">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Event Overview Specs */}
            <div className="detail-card p-6 md:p-8">
              <h3 className="card-heading mb-6">Event Summary</h3>
              <div className="specs-grid">
                <div className="spec-box">
                  <span className="spec-label">Participation Type</span>
                  <span className="spec-value uppercase">{event.participation_type}</span>
                </div>
                <div className="spec-box">
                  <span className="spec-label">Team Size</span>
                  <span className="spec-value">
                    {event.team_size || (event.participation_type === 'team' ? `${event.min_members} - ${event.max_members} members` : '1 Solo Member')}
                  </span>
                </div>
                <div className="spec-box">
                  <span className="spec-label">Registration Fee</span>
                  <span className="spec-value text-gold">{event.fee || 'Free'}</span>
                </div>
                <div className="spec-box">
                  <span className="spec-label">Last Date to Register</span>
                  <span className="spec-value">{event.last_date}</span>
                </div>
              </div>
            </div>

            {/* Rules Section */}
            <div className="detail-card p-6 md:p-8">
              <h3 className="card-heading mb-6">Rules & Guidelines</h3>
              <ul className="rules-list space-y-4">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="rule-num">{idx + 1}.</span>
                    <span className="text-dim text-sm leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Sticky Registration & Coordinators */}
          <div className="space-y-6">
            
            {/* Direct Google Form Registration Card */}
            <div className="detail-card p-6 md:p-8 text-center relative overflow-hidden">
              <div className="prizes-glow"></div>
              <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold/40 text-gold flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={24} />
              </div>
              
              <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/30 rounded-full font-bold inline-block mb-3">
                REGISTRATION OPEN
              </span>
              
              <h3 className="card-heading mb-2 text-xl font-display">Ready to Compete?</h3>
              <p className="text-dim text-xs leading-relaxed mb-6 font-sans">
                Submit your official registration through the official Google Form application.
              </p>

              {/* Perks / Inclusions */}
              <div className="space-y-2.5 text-left mb-6 text-xs font-mono text-white/80 border-t border-b border-white/10 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-gold">✦</span>
                  <span>Official Certificates for all participants</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-gold">✦</span>
                  <span>Trophies & Merit Awards for winners</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-gold">✦</span>
                  <span>{event.team_size ? `Format: ${event.team_size}` : (event.participation_type === 'team' ? `Team: ${event.min_members}-${event.max_members} members` : 'Individual solo entry')}</span>
                </div>
              </div>

              {/* Register Button - Desktop Sidebar (Mobile uses top CTA) */}
              <button 
                type="button"
                onClick={() => window.open(event.googleFormUrl || 'https://forms.google.com', '_blank', 'noopener,noreferrer')}
                className="hidden lg:flex w-full py-4 primary-gold-btn items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold/20 hover:scale-[1.02] transition-transform"
              >
                <span>Register via Google Form</span>
                <ExternalLink size={16} />
              </button>

              <button
                type="button"
                onClick={() => navigate('/register')}
                className="w-full mt-3 py-2.5 bg-white/5 hover:bg-white/10 text-dim hover:text-white border border-white/10 rounded-xl text-xs font-mono tracking-wider transition-colors cursor-pointer"
              >
                View All Events & Posters
              </button>
            </div>

            {/* Event Coordinators Box */}
            {event.coordinators && event.coordinators.length > 0 && (
              <div className="detail-card p-6 md:p-8">
                <h3 className="card-heading text-base md:text-lg flex items-center gap-2 mb-4">
                  <Phone size={16} />
                  <span>Event Coordinators</span>
                </h3>
                <div className="space-y-3">
                  {event.coordinators.map((coord, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-dim uppercase tracking-wider block">
                          {coord.role}
                        </span>
                        <h5 className="font-medium text-white text-sm truncate mt-0.5">
                          {coord.name}
                        </h5>
                      </div>
                      {coord.phone && (
                        <a 
                          href={`tel:${coord.phone}`}
                          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/15 text-gold hover:bg-gold hover:text-black transition-colors text-xs font-mono font-bold"
                        >
                          <Phone size={12} />
                          <span>{coord.displayPhone || coord.phone}</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Related Events Section */}
        <div className="mt-20">
          <h3 className="section-title text-center mb-8 font-display text-2xl text-white tracking-wider">
            MORE EVENTS AT EUPHORIA
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedEvents.map((rel) => (
              <div 
                key={rel.id} 
                className="related-card group cursor-pointer"
                onClick={() => navigate(`/events/${rel.id}`)}
              >
                <div className="related-img-wrap">
                  <img src={rel.image} alt={rel.title} />
                  <div className="related-overlay"></div>
                </div>
                <div className="p-6">
                  <span className="text-gold text-xs tracking-widest uppercase font-mono">{rel.categoryLabel}</span>
                  <h4 className="font-display text-xl text-white mt-1 group-hover:text-gold transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-dim text-xs mt-2 line-clamp-2">{rel.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
