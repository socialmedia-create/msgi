import { useEffect, useMemo, useRef } from 'react';
import './InfiniteSpiral.css';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const modulo = (value, divisor) => ((value % divisor) + divisor) % divisor;
const smoothstep = (min, max, value) => {
  const x = clamp((value - min) / (max - min || 1), 0, 1);
  return x * x * (3 - 2 * x);
};

const InfiniteSpiral = ({
  items = [],
  speed = 0.55,
  direction = 'up',
  animationMode = 'all',
  radius = 170,
  cardWidth = 100,
  cardHeight = 100,
  verticalSpacing = 60,
  perspective = 1000,
  cardsPerTurn = 7,
  rotation = 0,
  cardTilt = 0,
  cardRadius = 10,
  centerScale = 1.2,
  edgeFade = 0.3,
  edgeBlur = 6,
  pauseOnHover = true,
  imageFit = 'cover',
  grayscale = 0,
  className = '',
  onItemClick = null
}) => {
  const rootRef = useRef(null);
  const cardRefs = useRef([]);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const autoSpeedRef = useRef(0);
  const hoveredRef = useRef(false);
  const visibleRef = useRef(true);
  const draggingRef = useRef(false);
  const lastPointerYRef = useRef(0);
  const pointerDownInfoRef = useRef(null);
  const dragMovedRef = useRef(false);

  const normalizedItems = useMemo(
    () =>
      items.map((item, index) =>
        typeof item === 'string'
          ? { src: item, alt: `Spiral image ${index + 1}` }
          : { alt: item.title || `Spiral image ${index + 1}`, ...item }
      ),
    [items]
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root || normalizedItems.length === 0) return;

    cardRefs.current = cardRefs.current.slice(0, normalizedItems.length);

    let frameId;
    let previousTime = performance.now();
    let bounds = root.getBoundingClientRect();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scrollEnabled = animationMode === 'scroll' || animationMode === 'all';
    const scrollSpeedMultiplier = Math.max(speed, 0) / 0.55;
    let lastScrollY = window.scrollY;

    const resizeObserver = new ResizeObserver(() => {
      if (root) {
        bounds = root.getBoundingClientRect();
      }
    });
    resizeObserver.observe(root);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visibleRef.current;
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && (!wasVisible || !frameId)) {
          previousTime = performance.now();
          frameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.02 }
    );
    intersectionObserver.observe(root);

    const handleScroll = () => {
      const nextScrollY = window.scrollY;
      const scrollDelta = nextScrollY - lastScrollY;
      lastScrollY = nextScrollY;
      if (!scrollEnabled || !visibleRef.current || scrollDelta === 0) return;
      targetProgressRef.current += clamp(
        (scrollDelta * scrollSpeedMultiplier) / Math.max(verticalSpacing * 2, 1),
        -1.5,
        1.5
      );
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const render = time => {
      if (!visibleRef.current) {
        frameId = null;
        return;
      }

      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      const autoEnabled = animationMode === 'auto' || animationMode === 'all';
      const motionPaused = draggingRef.current || (pauseOnHover && hoveredRef.current);
      const directionMultiplier = direction === 'down' ? -1 : 1;
      const desiredAutoSpeed =
        autoEnabled && visibleRef.current && !reducedMotion.matches && !motionPaused
          ? speed * directionMultiplier
          : 0;
      const speedBlend = 1 - Math.exp(-delta * 7);
      autoSpeedRef.current += (desiredAutoSpeed - autoSpeedRef.current) * speedBlend;
      targetProgressRef.current += autoSpeedRef.current * delta;

      const followBlend = 1 - Math.exp(-delta * (draggingRef.current ? 22 : 11));
      progressRef.current += (targetProgressRef.current - progressRef.current) * followBlend;

      const count = normalizedItems.length;
      const half = count / 2;
      const width = Math.max(bounds.width, 1);
      const height = Math.max(bounds.height, 1);
      const fit = Math.min(1, width / (cardWidth * 2.8), height / (cardHeight * 2.35));
      const responsiveRadius = Math.min(radius, Math.max(72, width * 0.36)) * fit;
      const fadeStart = clamp(1 - edgeFade, 0, 0.98);
      const turnSize = Math.max(cardsPerTurn, 1);

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        let offset = index - progressRef.current;
        offset = modulo(offset + half, count) - half;

        const edge = Math.min(Math.abs(offset) / Math.max(half, 1), 1);
        const opacity = 1 - smoothstep(fadeStart, 1, edge);
        const focus = 1 - Math.min(Math.abs(offset) / Math.max(turnSize * 0.65, 1), 1);
        const scale = (1 + (centerScale - 1) * focus) * fit;
        const angle = offset * (360 / turnSize) + rotation;
        const angleRadians = (angle * Math.PI) / 180;
        const x = Math.sin(angleRadians) * responsiveRadius;
        const z = Math.cos(angleRadians) * responsiveRadius;
        const depthScale = clamp(perspective / Math.max(perspective - z, 1), 0.72, 1.45);
        const visualScale = scale * depthScale;
        const depth = (z / Math.max(responsiveRadius, 1) + 1) / 2;
        const blur = edgeBlur * smoothstep(0.35, 1, edge);

        card.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${(offset * verticalSpacing * fit).toFixed(2)}px, 0) rotateZ(${cardTilt}deg) scale(${visualScale.toFixed(3)})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none';
        card.style.zIndex = String(Math.round(depth * 100000) + index);
        card.style.pointerEvents = opacity > 0.25 ? 'auto' : 'none';
      });

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [
    normalizedItems,
    speed,
    direction,
    animationMode,
    radius,
    perspective,
    cardWidth,
    cardHeight,
    verticalSpacing,
    cardsPerTurn,
    rotation,
    cardTilt,
    centerScale,
    edgeFade,
    edgeBlur,
    pauseOnHover
  ]);

  const rootStyle = {
    perspective: `${perspective}px`,
    '--infinite-spiral-card-width': `${cardWidth}px`,
    '--infinite-spiral-card-height': `${cardHeight}px`,
    '--infinite-spiral-card-radius': `${cardRadius}px`,
    cursor: animationMode === 'drag' || animationMode === 'all' ? 'grab' : 'default',
    touchAction: animationMode === 'drag' || animationMode === 'all' ? 'pan-x' : 'auto',
    userSelect: 'none'
  };

  const dragEnabled = animationMode === 'drag' || animationMode === 'all';

  const handlePointerDown = event => {
    if (!dragEnabled || event.button !== 0) return;
    pointerDownInfoRef.current = {
      x: event.clientX,
      y: event.clientY,
      target: event.target,
      time: Date.now()
    };
    draggingRef.current = true;
    dragMovedRef.current = false;
    lastPointerYRef.current = event.clientY;
    targetProgressRef.current = progressRef.current;
  };

  const handlePointerMove = event => {
    if (!draggingRef.current) return;
    const pointerDelta = event.clientY - lastPointerYRef.current;
    lastPointerYRef.current = event.clientY;

    if (pointerDownInfoRef.current) {
      const dist = Math.hypot(
        event.clientX - pointerDownInfoRef.current.x,
        event.clientY - pointerDownInfoRef.current.y
      );
      if (dist > 5) {
        dragMovedRef.current = true;
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
          try {
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.style.cursor = 'grabbing';
          } catch (e) {}
        }
      }
    }

    if (dragMovedRef.current) {
      targetProgressRef.current -= pointerDelta / Math.max(verticalSpacing, 1);
    }
  };

  const handlePointerUp = event => {
    if (!draggingRef.current) return;
    const wasMoved = dragMovedRef.current;
    draggingRef.current = false;
    dragMovedRef.current = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch (e) {}
    }
    event.currentTarget.style.cursor = dragEnabled ? 'grab' : 'default';

    // Click trigger on card item if user didn't drag
    if (!wasMoved && onItemClick && pointerDownInfoRef.current) {
      const cardEl = pointerDownInfoRef.current.target?.closest('.infinite-spiral__item');
      if (cardEl) {
        const indexAttr = cardEl.getAttribute('data-index');
        const index = indexAttr !== null ? parseInt(indexAttr, 10) : -1;
        if (index >= 0 && normalizedItems[index]) {
          onItemClick(normalizedItems[index], index, event);
        }
      }
    }
    pointerDownInfoRef.current = null;
  };

  return (
    <div
      ref={rootRef}
      className={`infinite-spiral ${className}`.trim()}
      style={rootStyle}
      onMouseEnter={() => {
        hoveredRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="infinite-spiral__stage" role="list" aria-label="Infinite spiral gallery">
        {normalizedItems.map((item, index) => {
          return (
            <div
              key={item.id ?? `${item.src}-${index}`}
              data-index={index}
              ref={node => {
                cardRefs.current[index] = node;
              }}
              className="infinite-spiral__item cursor-pointer"
              style={{ width: cardWidth, height: cardHeight, borderRadius: cardRadius }}
              role="listitem"
              aria-label={item.label ?? item.alt}
              onClick={(e) => {
                e.stopPropagation();
                if (onItemClick && !dragMovedRef.current) {
                  onItemClick(item, index, e);
                }
              }}
            >
              <img
                className="infinite-spiral__image"
                src={item.src}
                alt={item.alt}
                loading={index < 8 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  maxWidth: 'none',
                  maxHeight: 'none',
                  objectFit: imageFit,
                  filter: grayscale > 0 ? `grayscale(${Math.min(1, Math.max(0, grayscale))})` : 'none'
                }}
              />
              {(item.title || item.categoryLabel) && (
                <div className="infinite-spiral__overlay pointer-events-none">
                  {item.categoryLabel && <span className="infinite-spiral__category">{item.categoryLabel}</span>}
                  {item.title && <span className="infinite-spiral__title">{item.title}</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfiniteSpiral;
