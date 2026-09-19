import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, Move3d, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import InfiniteSpiral from '../components/InfiniteSpiral';
import './Gallery.css';

export const EUPHORIA_PICS = [
  { 
    id: 1, 
    src: '/images/EUPHORIA PICS/1.jpeg', 
    category: 'culture', 
    categoryLabel: 'Moments', 
    title: 'Euphoria Celebration 1' 
  },
  { 
    id: 2, 
    src: '/images/EUPHORIA PICS/2.jpeg', 
    category: 'energy', 
    categoryLabel: 'Energy', 
    title: 'Euphoria Celebration 2' 
  },
  { 
    id: 3, 
    src: '/images/EUPHORIA PICS/3.jpeg', 
    category: 'culture', 
    categoryLabel: 'Moments', 
    title: 'Euphoria Celebration 3' 
  },
  { 
    id: 4, 
    src: '/images/EUPHORIA PICS/4.jpeg', 
    category: 'stage', 
    categoryLabel: 'Stage', 
    title: 'Euphoria Celebration 4' 
  },
  { 
    id: 5, 
    src: '/images/EUPHORIA PICS/5.jpeg', 
    category: 'energy', 
    categoryLabel: 'Energy', 
    title: 'Euphoria Celebration 5' 
  },
  { 
    id: 6, 
    src: '/images/EUPHORIA PICS/6.jpeg', 
    category: 'culture', 
    categoryLabel: 'Moments', 
    title: 'Euphoria Celebration 6' 
  },
  { 
    id: 7, 
    src: '/images/EUPHORIA PICS/7.jpeg', 
    category: 'stage', 
    categoryLabel: 'Stage', 
    title: 'Euphoria Celebration 7' 
  },
  { 
    id: 8, 
    src: '/images/EUPHORIA PICS/8.jpeg', 
    category: 'energy', 
    categoryLabel: 'Energy', 
    title: 'Euphoria Celebration 8' 
  },
  { 
    id: 9, 
    src: '/images/EUPHORIA PICS/9.jpeg', 
    category: 'stage', 
    categoryLabel: 'Stage', 
    title: 'Euphoria Celebration 9' 
  }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Repeat array so the 3D spiral has rich continuous multi-turn depth
  const spiralItems = [...EUPHORIA_PICS, ...EUPHORIA_PICS, ...EUPHORIA_PICS];

  const handleCardClick = (item, index) => {
    const originalItem = EUPHORIA_PICS[index % EUPHORIA_PICS.length] || item;
    setSelectedImage(originalItem);
    setSelectedIndex(index % EUPHORIA_PICS.length);
  };

  const handlePrev = () => {
    const newIdx = (selectedIndex - 1 + EUPHORIA_PICS.length) % EUPHORIA_PICS.length;
    setSelectedIndex(newIdx);
    setSelectedImage(EUPHORIA_PICS[newIdx]);
  };

  const handleNext = () => {
    const newIdx = (selectedIndex + 1) % EUPHORIA_PICS.length;
    setSelectedIndex(newIdx);
    setSelectedImage(EUPHORIA_PICS[newIdx]);
  };

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedIndex]);

  return (
    <section id="gallery" className="gallery-section pt-36 md:pt-40 pb-20 relative overflow-hidden bg-[#040406]">

      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gold/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-[1400px] relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2 text-gold text-xs font-mono tracking-[0.25em] uppercase mb-2">
            <Sparkles size={14} className="animate-pulse" />
            <span>FESTIVAL MEMORIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            MEMORIES IN <span className="text-gold">MOTION</span>
          </h2>
          <p className="text-dim text-xs md:text-sm mt-3 uppercase tracking-wider font-mono">
            9 EXCLUSIVE FESTIVAL PHOTOS RUNNING ON CONTINUOUS 3D LOOP • TAP TO EXPAND
          </p>
        </div>

        {/* Interactive Gesture Hint */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-gold/80 mb-3 uppercase tracking-widest text-center">
          <Move3d size={14} className="text-gold animate-bounce" />
          <span>DRAG SPIRAL TO ROTATE • TAP PHOTO TO ENLARGE</span>
        </div>

        {/* Seamless 3D Infinite Spiral Gallery Container */}
        <div className="relative w-full h-[650px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl">
          <InfiniteSpiral
            items={spiralItems}
            animationMode="all"
            speed={0.55}
            radius={180}
            cardWidth={120}
            cardHeight={120}
            verticalSpacing={62}
            perspective={1000}
            cardsPerTurn={8}
            cardRadius={14}
            centerScale={1.25}
            edgeBlur={5}
            pauseOnHover={true}
            onItemClick={handleCardClick}
          />
        </div>

      </div>

      {/* ── LIGHTBOX PORTAL ── */}
      {selectedImage && createPortal(
        <div
          className="glb-backdrop"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="glb-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              className="glb-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Image display area */}
            <div className="glb-img-area">
              <img
                src={selectedImage.src}
                alt={selectedImage.title || 'Euphoria Photo'}
                className="glb-img"
              />
              <button className="glb-arrow glb-arrow-left" onClick={handlePrev} aria-label="Previous image">
                <ChevronLeft size={28} />
              </button>
              <button className="glb-arrow glb-arrow-right" onClick={handleNext} aria-label="Next image">
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Bottom Info bar */}
            <div className="glb-info">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="glb-tag">
                    <Sparkles size={11} />
                    <span>EUPHORIA 2026</span>
                  </div>
                  <h3 className="glb-title">Photo {selectedIndex + 1} of {EUPHORIA_PICS.length}</h3>
                </div>
                <div className="glb-counter-badge">
                  {selectedIndex + 1} / {EUPHORIA_PICS.length}
                </div>
              </div>

              <div className="glb-footer">
                <p className="glb-desc">Captured live at Meenakshi Sundararajan Engineering College Euphoria Fest.</p>
                <div className="glb-hint">Use ← → arrow keys to navigate • Esc to close</div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
