"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

/**
 * CustomCursor — Wrist Affair luxury cursor
 *
 * Features:
 *  • Small sharp dot that follows mouse exactly (no lag)
 *  • Larger soft ring that trails with spring physics
 *  • Ring morphs + label appears on hoverable elements
 *    [data-cursor="view"]    → "VIEW"
 *    [data-cursor="drag"]    → "DRAG"
 *    [data-cursor="explore"] → "EXPLORE"
 *    (any other value)       → that value uppercased
 *  • Hides native cursor site-wide via CSS
 *  • Fully disabled on touch devices (no phantom cursor)
 */

const SPRING_CONFIG = { damping: 28, stiffness: 220, mass: 0.5 }

export default function CustomCursor() {
  const cursorDotRef = useRef(null)

  // Raw mouse position (dot follows this exactly via ref — no re-render)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring-smoothed position for the ring
  const ringX = useSpring(mouseX, SPRING_CONFIG)
  const ringY = useSpring(mouseY, SPRING_CONFIG)

  const [cursorState, setCursorState] = useState({
    hovered: false,
    label: "",
    isLink: false,
    isText: false,
  })
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Detect touch device — disable cursor entirely
    if (window.matchMedia("(hover: none)").matches) {
      setIsTouchDevice(true)
      return
    }

    // Hide native cursor
    document.documentElement.style.cursor = "none"

    const onMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Sync dot position via ref (avoids React re-render)
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`
      }

      if (!isVisible) setIsVisible(true)
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    const onMouseOver = (e) => {
      const target = e.target.closest("[data-cursor]")
      const isLink =
        e.target.closest("a, button, [role='button'], label") !== null
      const isText =
        e.target.closest("p, h1, h2, h3, h4, span, li") !== null &&
        !isLink

      if (target) {
        const label = target.dataset.cursor
        setCursorState({ hovered: true, label: label.toUpperCase(), isLink: false, isText: false })
      } else if (isLink) {
        setCursorState({ hovered: true, label: "", isLink: true, isText: false })
      } else if (isText) {
        setCursorState({ hovered: false, label: "", isLink: false, isText: true })
      } else {
        setCursorState({ hovered: false, label: "", isLink: false, isText: false })
      }
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)
    document.addEventListener("mouseover", onMouseOver)

    return () => {
      document.documentElement.style.cursor = ""
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseover", onMouseOver)
    }
  }, [])

  if (isTouchDevice) return null

  const ringSize = cursorState.hovered ? 72 : cursorState.isLink ? 44 : cursorState.isText ? 2 : 36

  return (
    <>
      {/* ── Dot — no spring, pixel-perfect tracking via ref ── */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{ mixBlendMode: "exclusion" }}
      >
        <div
          className="w-[6px] h-[6px] rounded-full bg-[#1F1F1F]"
          style={{
            opacity: isVisible ? (cursorState.isText ? 0 : 1) : 0,
            transition: "opacity 0.2s ease",
          }}
        />
      </div>

      {/* ── Ring — spring-smoothed, morphs on hover ── */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="relative flex items-center justify-center rounded-full border border-[#1F1F1F]"
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: isVisible ? 1 : 0,
            backgroundColor:
              cursorState.hovered
                ? "rgba(31,31,31,0.08)"
                : "transparent",
            borderColor:
              cursorState.isLink
                ? "rgba(31,31,31,0.6)"
                : "rgba(31,31,31,0.35)",
            borderWidth: cursorState.isLink ? "1.5px" : "1px",
          }}
          transition={{
            width: { type: "spring", damping: 24, stiffness: 260, mass: 0.4 },
            height: { type: "spring", damping: 24, stiffness: 260, mass: 0.4 },
            opacity: { duration: 0.2 },
            backgroundColor: { duration: 0.25 },
            borderColor: { duration: 0.2 },
          }}
        >
          {/* Label inside ring */}
          <motion.span
            className="text-[7px] tracking-[0.22em] uppercase font-semibold text-[#1F1F1F] select-none whitespace-nowrap"
            animate={{ opacity: cursorState.hovered && cursorState.label ? 1 : 0 }}
            transition={{ duration: 0.18 }}
          >
            {cursorState.label}
          </motion.span>
        </motion.div>
      </motion.div>
    </>
  )
}