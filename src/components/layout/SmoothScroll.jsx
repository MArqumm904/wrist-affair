"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

/**
 * SmoothScroll — wraps the app with Lenis smooth scrolling
 *
 * Install:  npm install lenis
 *
 * Usage in layout.jsx:
 *   import SmoothScroll from "@/components/layout/SmoothScroll"
 *   <SmoothScroll>{children}</SmoothScroll>
 *
 * Config tuned for a luxury / premium feel:
 *  • lerp 0.08  — slightly slow, silky glide (lower = more butter)
 *  • smoothWheel true
 *  • duration 1.4 — long, eased deceleration
 *  • easing: custom cubic that starts fast, ends with a soft settle
 */

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Don't run on touch-only devices (they have native momentum scroll)
    if (window.matchMedia("(hover: none)").matches) return

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
      infinite: false,
      autoRaf: false, // we drive RAF manually for sync with framer-motion
    })

    lenisRef.current = lenis

    // Sync with Framer Motion's internal RAF
    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Expose lenis on window so other components can call lenis.scrollTo()
    window.__lenis = lenis

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return <>{children}</>
}