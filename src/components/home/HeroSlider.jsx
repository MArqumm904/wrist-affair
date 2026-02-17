"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

import watchMoser from "@/assets/watch-moser.png"
import watchPatek from "@/assets/watch-patek.png"
import watchRolex from "@/assets/watch-rolex.png"
import watchAP from "@/assets/watch-ap.png"

const slides = [
  {
    brand: "H. MOSER & CIE",
    model: "Pioneer Centre Seconds Sunny-Side Up 40mm",
    ref: "REF 3201-1200",
    price: "60 000 AED",
    image: watchMoser,
  },
  {
    brand: "PATEK PHILIPPE",
    model: "Nautilus Annual Calendar 40.5mm",
    ref: "REF 5726A-001",
    price: "120 000 AED",
    image: watchPatek,
  },
  {
    brand: "ROLEX",
    model: "Submariner Date 41mm",
    ref: "REF 126610LN",
    price: "85 000 AED",
    image: watchRolex,
  },
  {
    brand: "AUDEMARS PIGUET",
    model: "Royal Oak Selfwinding 41mm",
    ref: "REF 15510ST",
    price: "95 000 AED",
    image: watchAP,
  },
]

export default function HeroSlider({ selectedBrand }) {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  
  // Drag/swipe state
  const [dragStart, setDragStart] = useState(null)
  const [dragOffset, setDragOffset] = useState(0)
  const sliderRef = useRef(null)

  // Sync slider with selected brand from CategoryBar
  useEffect(() => {
    if (selectedBrand) {
      const index = slides.findIndex(slide => slide.brand === selectedBrand)
      if (index !== -1 && index !== current) {
        goTo(index)
      }
    }
  }, [selectedBrand, current])

  const goTo = useCallback(
    (idx) => {
      if (animating) return
      setAnimating(true)
      setDragOffset(0)
      setCurrent(idx)
      setTimeout(() => {
        setAnimating(false)
      }, 700)
    },
    [animating]
  )

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, goTo])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo])

  // Auto-play with pause on hover
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [current, isPaused, next])

  // Drag handlers
  const handleDragStart = (clientX) => {
    setDragStart(clientX)
    setIsPaused(true)
  }

  const handleDragMove = (clientX) => {
    if (dragStart === null) return
    const diff = clientX - dragStart
    setDragOffset(diff)
  }

  const handleDragEnd = () => {
    if (dragStart === null) return
    
    const threshold = 75
    if (dragOffset > threshold) {
      prev()
    } else if (dragOffset < -threshold) {
      next()
    } else {
      setDragOffset(0)
    }
    
    setDragStart(null)
    setDragOffset(0)
    setIsPaused(false)
  }

  // Mouse events
  const onMouseDown = (e) => {
    e.preventDefault()
    handleDragStart(e.clientX)
  }

  const onMouseMove = (e) => {
    if (dragStart !== null) {
      handleDragMove(e.clientX)
    }
  }

  const onMouseUp = () => {
    handleDragEnd()
  }

  const onMouseLeave = () => {
    if (dragStart !== null) {
      handleDragEnd()
    }
  }

  // Touch events
  const onTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX)
  }

  const onTouchMove = (e) => {
    handleDragMove(e.touches[0].clientX)
  }

  const onTouchEnd = () => {
    handleDragEnd()
  }

  const slide = slides[current]

  return (
    <section
      ref={sliderRef}
      className="relative min-h-[calc(100vh-12rem)] sm:min-h-[calc(100vh-10rem)] lg:min-h-[calc(100vh-10rem)] overflow-hidden transition-colors duration-700 select-none bg-[#F3F1EA]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false)
        onMouseLeave()
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div
          className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center min-h-[calc(100vh-12rem)] sm:min-h-[calc(100vh-10rem)] lg:min-h-[calc(100vh-10rem)] py-8 sm:py-12 lg:py-20"
          style={{
            transform: `translateX(${dragOffset}px)`,
            transition: dragStart !== null ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          {/* TEXT CONTENT */}
          <div
            className={`space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1 transition-all duration-700 ${
              animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            {/* Brand */}
            <div className="space-y-1">
              <p className="text-[9px] sm:text-[10px] lg:text-[11px] tracking-[0.25em] uppercase font-semibold opacity-60">
                {slide.brand}
              </p>
            </div>

            {/* Model */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight text-[#1F1F1F]">
              {slide.model}
            </h1>

            {/* Ref */}
            <p className="text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium opacity-50">
              {slide.ref}
            </p>

            {/* Divider */}
            <div className="w-12 h-[2px] bg-[#1F1F1F] opacity-20" />

            {/* Price */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm tracking-[0.15em] uppercase font-medium opacity-50">
                Starting from
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#1F1F1F]">
                {slide.price}
              </p>
            </div>

            {/* CTA */}
          <Button className="hidden sm:inline-flex mt-4 sm:mt-6 px-8 sm:px-12 h-11 sm:h-12 lg:h-14 text-[10px] tracking-[0.2em] uppercase font-semibold rounded-none border-2 bg-[#1F1F1F] text-white border-[#1F1F1F] hover:bg-transparent hover:text-[#1F1F1F] transition-all duration-300 cursor-pointer">
  Explore
</Button>

          </div>

          {/* WATCH IMAGE */}
          <div
            className={`relative flex items-center justify-center order-1 lg:order-2 transition-all duration-700 ${
              animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-lg aspect-square">
              {/* Subtle circle glow behind watch */}
              <div className="absolute inset-0 bg-[#1F1F1F]/5 rounded-full blur-3xl opacity-30" />

              <Image
                src={slide.image}
                alt={`${slide.brand} ${slide.model}`}
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl pointer-events-none"
                fill
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 384px, 512px"
                style={{ objectFit: "contain" }}
                priority={current === 0}
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* NAV ARROWS - Hidden on mobile, visible on desktop */}
      <Button
        onClick={prev}
        variant="ghost"
        size="icon"
        aria-label="Previous slide"
        className="hidden lg:flex absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-[#1F1F1F]/20 hover:border-[#1F1F1F] hover:bg-[#1F1F1F]/5 transition-all duration-200 hover:scale-110 z-20"
      >
        <ChevronLeft size={24} className="text-[#1F1F1F]" />
      </Button>

      <Button
        onClick={next}
        variant="ghost"
        size="icon"
        aria-label="Next slide"
        className="hidden lg:flex absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-[#1F1F1F]/20 hover:border-[#1F1F1F] hover:bg-[#1F1F1F]/5 transition-all duration-200 hover:scale-110 z-20"
      >
        <ChevronRight size={24} className="text-[#1F1F1F]" />
      </Button>

      {/* DOT INDICATORS */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full bg-[#1F1F1F] ${
              i === current ? "w-8 h-[5px] opacity-100" : "w-[5px] h-[5px] opacity-25 hover:opacity-60"
            }`}
          />
        ))}
      </div>

      {/* Mobile Navigation Arrows */}
      <div className="lg:hidden absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <Button
          onClick={prev}
          variant="ghost"
          size="icon"
          aria-label="Previous slide"
          className="w-10 h-10 rounded-full border-2 border-[#1F1F1F]/20 hover:border-[#1F1F1F] hover:bg-[#1F1F1F]/5 transition-all duration-200"
        >
          <ChevronLeft size={20} className="text-[#1F1F1F]" />
        </Button>

        <Button
          onClick={next}
          variant="ghost"
          size="icon"
          aria-label="Next slide"
          className="w-10 h-10 rounded-full border-2 border-[#1F1F1F]/20 hover:border-[#1F1F1F] hover:bg-[#1F1F1F]/5 transition-all duration-200"
        >
          <ChevronRight size={20} className="text-[#1F1F1F]" />
        </Button>
      </div>
    </section>
  )
}