"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion"
import { ArrowUp } from "lucide-react"

/**
 * ScrollToTop — luxury bottom-to-top button
 *
 * • Appears after 400px scroll with a smooth reveal
 * • Circular progress ring that fills as user scrolls down
 * • On click: smooth scroll to top (uses Lenis if available, else native)
 * • Hover: ring pulses, arrow lifts
 * • Matches #1F1F1F / #F3F1EA theme exactly
 */

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? scrollTop / docHeight : 0

      setProgress(pct)
      setVisible(scrollTop > 400)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleClick = () => {
    // Use Lenis if available, otherwise native smooth scroll
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.8 })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // SVG circle progress
  const size = 52
  const strokeWidth = 1.5
  const radius = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleClick}
          aria-label="Scroll back to top"
          className="fixed bottom-8 right-6 sm:bottom-10 sm:right-8 z-[9990] group focus:outline-none"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
        >
          {/* Outer glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-[#1F1F1F]/8"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{ scale: 1.35, opacity: 1 }}
            transition={{ duration: 0.35 }}
          />

          {/* SVG: progress ring + button body */}
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="relative z-10"
            style={{ transform: "rotate(-90deg)" }}
          >
            {/* Track ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="#1F1F1F"
              stroke="#1F1F1F"
              strokeWidth={strokeWidth}
              strokeOpacity="0.08"
            />

            {/* Progress ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#1F1F1F"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeOpacity="0.55"
              style={{ transition: "stroke-dashoffset 0.1s linear" }}
            />
          </svg>

          {/* Centre circle with arrow */}
          <div
            className="absolute inset-[5px] rounded-full bg-[#1F1F1F] flex items-center justify-center z-20 group-hover:bg-[#2a2a2a] transition-colors duration-300"
          >
            <motion.div
              className="flex items-center justify-center"
              initial={{ y: 0 }}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ArrowUp size={16} className="text-[#F3F1EA]" strokeWidth={2} />
            </motion.div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}