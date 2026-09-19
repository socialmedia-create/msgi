import React, { useEffect, useRef } from 'react'
import { 
  MapPin, 
  ExternalLink, 
  Train,
  Building,
  Compass
} from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './Venue.css'

export default function Venue() {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  const REAL_MAP_URL = "https://maps.app.goo.gl/tTDs6GUBkiPaabb9A"

  useEffect(() => {
    if (!mapRef.current) return
    if (mapInstanceRef.current) {
      mapInstanceRef.current.invalidateSize()
      return
    }

    // Center coordinates for MSEC Campus (13.0558027, 80.2265107)
    const msecCoords = [13.0558027, 80.2265107]
    const isMobile = window.innerWidth < 768

    // Create Leaflet map instance
    const map = L.map(mapRef.current, {
      center: msecCoords,
      zoom: 17,
      zoomControl: true,
      scrollWheelZoom: false,
      dragging: !isMobile,
      touchZoom: true,
      doubleClickZoom: true,
      tap: true
    })

    mapInstanceRef.current = map

    // OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map)

    // Two-finger touch gesture handling for mobile UI
    if (isMobile) {
      map.on('touchstart', (e) => {
        if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length >= 2) {
          map.dragging.enable()
        } else {
          map.dragging.disable()
        }
      })
    }

    // Custom College Campus Main Pin
    const createCollegeIcon = () => L.divIcon({
      className: 'custom-college-leaflet-pin',
      html: `
        <div class="college-main-pin">
          <svg class="college-pin-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5d77f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="21" x2="21" y2="21"></line>
            <line x1="6" y1="21" x2="6" y2="10"></line>
            <line x1="10" y1="21" x2="10" y2="10"></line>
            <line x1="14" y1="21" x2="14" y2="10"></line>
            <line x1="18" y1="21" x2="18" y2="10"></line>
            <path d="M2 10h20"></path>
            <path d="M12 2L2 7h20L12 2z"></path>
          </svg>
          <span class="college-pin-text">MSEC Whole Campus</span>
          <div class="college-pin-ring"></div>
        </div>
      `,
      iconSize: [220, 44],
      iconAnchor: [110, 22],
      popupAnchor: [0, -25]
    })

    // Add College Main Marker
    const mainMarker = L.marker(msecCoords, { icon: createCollegeIcon(), zIndexOffset: 1000 }).addTo(map)
    mainMarker.bindPopup(`
      <div style="font-family: inherit; padding: 4px;">
        <strong style="color: #d4af64; font-size: 14px;">Meenakshi Sundararajan Engineering College</strong>
        <p style="margin: 4px 0 0; font-size: 12px; color: #333;">363, Arcot Rd, Kodambakkam, Chennai</p>
      </div>
    `)

    // Force map recalculation on mount
    requestAnimationFrame(() => {
      if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize()
    })

    const timer1 = setTimeout(() => {
      if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize()
    }, 200)

    const timer2 = setTimeout(() => {
      if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize()
    }, 700)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <section id="venue" className="venue-section pt-32 pb-24 w-full overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-gold tracking-[0.3em] text-xs font-mono uppercase mb-2">
            LOCATION & VENUE
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight mb-4">
            MSEC <span className="text-gold">WHOLE CAMPUS</span>
          </h2>
          <p className="text-dim text-xs md:text-sm leading-relaxed mb-6 font-sans max-w-2xl mx-auto">
            Welcome to Meenakshi Sundararajan Engineering College (Autonomous), Kodambakkam, Chennai. All Euphoria 2026 events will be conducted across the unified college campus.
          </p>

          {/* Campus Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <div className="flex items-center gap-2 bg-white/5 border border-gold/30 px-4 py-2 rounded-full text-white">
              <MapPin size={14} className="text-gold" />
              <span>363, Arcot Rd, Kodambakkam, Chennai 600024</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-gold/30 px-4 py-2 rounded-full text-white">
              <Train size={14} className="text-gold" />
              <span>Kodambakkam Metro Station (~1.2 km)</span>
            </div>
          </div>
        </div>

        {/* Full Campus Interactive Map Card */}
        <div className="location-master-card rounded-3xl border border-[var(--color-border)] p-6 md:p-8 bg-[#080706]/90 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 text-gold text-xs font-mono uppercase tracking-widest mb-1">
                <Building size={14} />
                <span>CENTRAL CAMPUS MAP</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                Meenakshi Sundararajan Engineering College
              </h3>
              <p className="text-dim text-xs mt-1">
                Autonomous Institution • 363, Arcot Road, Kodambakkam, Chennai - 600024
              </p>
            </div>

            {/* Google Maps Directions Action Button */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={REAL_MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto py-3.5 px-7 bg-gradient-to-r from-[#f5d77f] via-[#d4af64] to-[#b8860b] text-black font-display font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-gold/20 hover:scale-105 transition-all cursor-pointer"
              >
                <span>Get Directions</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Leaflet Map Frame */}
          <div className="leaflet-master-wrapper relative rounded-2xl overflow-hidden border border-gold/40 shadow-2xl bg-[#e5e3df] h-[440px] md:h-[540px]">
            <div ref={mapRef} className="w-full h-full relative z-10" />

            {/* Top Compass Overlay Badge */}
            <div className="absolute top-3 left-3 right-3 z-20 pointer-events-none flex justify-between items-center">
              <div className="flex items-center gap-2 bg-black/90 backdrop-blur-md border border-gold/40 px-3.5 py-1.5 rounded-full shadow-lg pointer-events-auto">
                <Compass size={14} className="text-gold animate-spin-slow" />
                <span className="text-[10px] font-mono tracking-widest text-gold uppercase font-bold">
                  MSEC WHOLE CAMPUS · KODAMBAKKAM
                </span>
              </div>
              <span className="text-[9px] font-mono text-gold/90 bg-black/90 px-2.5 py-1 rounded-full border border-gold/30 hidden sm:inline-block pointer-events-auto shadow-md">
                ✌️ 2-Finger Pan on Mobile
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
