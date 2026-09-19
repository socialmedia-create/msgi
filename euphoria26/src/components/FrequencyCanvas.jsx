import { useEffect, useRef } from 'react'

export default function FrequencyCanvas() {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let time = 0
    let scrollY = window.scrollY
    let isVisible = true

    // Pause canvas when out of viewport for low CPU/GPU usage
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(draw)
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    const handleScroll = () => {
      scrollY = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    window.addEventListener('resize', resize)
    resize()

    const draw = () => {
      if (!isVisible) {
        animationFrameId = null
        return
      }

      time += 0.005
      const width = canvas.width / (Math.min(window.devicePixelRatio || 1, 2))
      const height = canvas.height / (Math.min(window.devicePixelRatio || 1, 2))
      
      ctx.clearRect(0, 0, width, height)
      
      const scrollInfluence = Math.min(scrollY / 500, 1)
      const baseAmplitude = height * 0.12
      const amplitude = baseAmplitude + (scrollInfluence * baseAmplitude)
      
      // 4 flowing curves
      const lines = 4
      const isMobile = window.innerWidth <= 768
      const step = isMobile ? 4 : 2 // Step optimization for performance
      
      for (let i = 0; i < lines; i++) {
        ctx.beginPath()
        
        const opacities = [0.12, 0.22, 0.35, 0.18]
        const lineWidths = [1, 1.5, 1.2, 0.5]
        
        ctx.strokeStyle = `rgba(212, 175, 100, ${opacities[i]})`
        ctx.lineWidth = lineWidths[i]
        
        if (i === 2 && !isMobile) {
          ctx.shadowBlur = 10
          ctx.shadowColor = 'rgba(212, 175, 100, 0.4)'
        } else {
          ctx.shadowBlur = 0
        }

        const frequency = 0.002 + (i * 0.0005)
        const phase = time * (1 + i * 0.5)
        const verticalOffset = height / 2
        
        for (let x = 0; x < width; x += step) {
          const y = verticalOffset + 
                    Math.sin(x * frequency + phase) * amplitude * Math.sin(x * 0.001) +
                    Math.sin(x * (frequency * 2) - phase * 1.5) * (amplitude * 0.3)
          
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    />
  )
}
