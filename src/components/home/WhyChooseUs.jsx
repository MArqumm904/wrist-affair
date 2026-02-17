"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValueEvent } from "framer-motion"
import { ShieldCheck, Handshake, BadgeCheck, BarChart3 } from "lucide-react"

// ─── DATA ─────────────────────────────────────────────────────────────────────
const reasons = [
  {
    num: "01",
    icon: Handshake,
    title: "Buy & Sell With Experts",
    desc: "Our team of certified professionals has experience of watch commerce and production all over the world — including the heart of horology, Switzerland.",
  },
  {
    num: "02",
    icon: ShieldCheck,
    title: "Benefit From Our Partnerships",
    desc: "Leading international watch manufacturers and auction houses happily sharing expertise to the benefit of every member of our community.",
  },
  {
    num: "03",
    icon: BadgeCheck,
    title: "Authenticity Guarantee",
    desc: "Every new and consigned watch is guaranteed 100% authentic. Proved otherwise — full refund within 14 days, no questions asked.",
  },
  {
    num: "04",
    icon: BarChart3,
    title: "Fair Pricing, Always",
    desc: "Our estimations and pricing are grounded in live market data and decades of historical evidence, analysed daily by our expert team.",
  },
]

// ─── CLOCK FACE ───────────────────────────────────────────────────────────────
// THE FIX: SVG ka native rotate(angle, cx, cy) use karo — isse pivot EXACTLY
// center pe hoga. CSS transform-origin SVG elements pe unreliable hota hai.
// We read the spring value via useMotionValueEvent → setState → plain SVG attribute.
function ClockFace({ scrollProgress }) {
  const CX = 160
  const CY = 160
  const R  = 140

  // Scroll → raw angle
  const hourRaw   = useTransform(scrollProgress, [0, 1], [0, 360])
  const minuteRaw = useTransform(scrollProgress, [0, 1], [0, 720])
  const secondRaw = useTransform(scrollProgress, [0, 1], [0, 1440])

  // Spring smoothing
  const hourSpring   = useSpring(hourRaw,   { damping: 30, stiffness: 120 })
  const minuteSpring = useSpring(minuteRaw, { damping: 25, stiffness: 100 })
  const secondSpring = useSpring(secondRaw, { damping: 20, stiffness: 90  })

  // State so React re-renders SVG with new transform string every frame
  const [hDeg, setHDeg] = useState(0)
  const [mDeg, setMDeg] = useState(0)
  const [sDeg, setSDeg] = useState(0)

  useMotionValueEvent(hourSpring,   "change", setHDeg)
  useMotionValueEvent(minuteSpring, "change", setMDeg)
  useMotionValueEvent(secondSpring, "change", setSDeg)

  // SVG rotate(angle, pivot-x, pivot-y) — perfect centre rotation, zero CSS involved
  const hT = `rotate(${hDeg}, ${CX}, ${CY})`
  const mT = `rotate(${mDeg}, ${CX}, ${CY})`
  const sT = `rotate(${sDeg}, ${CX}, ${CY})`

  // Tick marks
  const markers = Array.from({ length: 60 }, (_, i) => {
    const rad    = ((i * 360) / 60 * Math.PI) / 180
    const isHour = i % 5 === 0
    const inner  = isHour ? R - 18 : R - 10
    return {
      x1: CX + inner * Math.sin(rad),
      y1: CY - inner * Math.cos(rad),
      x2: CX + R     * Math.sin(rad),
      y2: CY - R     * Math.cos(rad),
      isHour, i,
    }
  })

  const romans = [
    { label: "XII", pos: 0   },
    { label: "III", pos: 90  },
    { label: "VI",  pos: 180 },
    { label: "IX",  pos: 270 },
  ]

  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" style={{ display: "block" }}>
      {/* Bezel rings */}
      <circle cx={CX} cy={CY} r={R+8}  fill="none" stroke="#1F1F1F" strokeWidth="1"   opacity="0.12" />
      <circle cx={CX} cy={CY} r={R+14} fill="none" stroke="#1F1F1F" strokeWidth="0.5" opacity="0.06" />

      {/* Dial */}
      <circle cx={CX} cy={CY} r={R} fill="#F3F1EA" />

      {/* Ticks */}
      {markers.map((m) => (
        <line key={m.i}
          x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2}
          stroke="#1F1F1F"
          strokeWidth={m.isHour ? 1.5 : 0.6}
          strokeLinecap="round"
          opacity={m.isHour ? 0.5 : 0.2}
        />
      ))}

      {/* Roman numerals */}
      {romans.map(({ label, pos }) => {
        const rad = (pos * Math.PI) / 180
        const nr  = R - 32
        return (
          <text key={label}
            x={CX + nr * Math.sin(rad)} y={CY - nr * Math.cos(rad)}
            textAnchor="middle" dominantBaseline="central"
            fontSize="11" fontFamily="serif" fill="#1F1F1F" opacity="0.35" letterSpacing="0.5"
          >{label}</text>
        )
      })}

      {/* Inner ring */}
      <circle cx={CX} cy={CY} r={R-26} fill="none" stroke="#1F1F1F" strokeWidth="0.5" opacity="0.08" />

      {/* ── HOUR HAND — line drawn vertically through centre ── */}
      <g transform={hT}>
        <line x1={CX} y1={CY+18} x2={CX} y2={CY-78}
          stroke="#1F1F1F" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
      </g>

      {/* ── MINUTE HAND ── */}
      <g transform={mT}>
        <line x1={CX} y1={CY+22} x2={CX} y2={CY-108}
          stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
      </g>

      {/* ── SECOND HAND ── */}
      <g transform={sT}>
        <line x1={CX} y1={CY+28} x2={CX} y2={CY-118}
          stroke="#1F1F1F" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
        {/* Red tip */}
        <line x1={CX} y1={CY-90} x2={CX} y2={CY-118}
          stroke="#C0392B" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
      </g>

      {/* Centre jewel — always on top */}
      <circle cx={CX} cy={CY} r={5}   fill="#1F1F1F" opacity="0.9" />
      <circle cx={CX} cy={CY} r={2.5} fill="#F3F1EA" opacity="0.7" />

      {/* Brand text */}
      <text x={CX} y={CY+40} textAnchor="middle" fontSize="7"  fontFamily="serif"
        fill="#1F1F1F" opacity="0.3" letterSpacing="2">WRIST AFFAIR</text>
      <text x={CX} y={CY+52} textAnchor="middle" fontSize="5"  fontFamily="sans-serif"
        fill="#1F1F1F" opacity="0.2" letterSpacing="1.5">DUBAI</text>
    </svg>
  )
}

// ─── FEATURE CARD ─────────────────────────────────────────────────────────────
function FeatureCard({ item, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const Icon   = item.icon

  return (
    <motion.div ref={ref} className="relative group"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div className="absolute top-0 left-0 h-[1px] bg-[#1F1F1F]/20"
        initial={{ width: 0 }}
        animate={inView ? { width: "100%" } : {}}
        transition={{ duration: 0.8, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      />
      <div className="pt-7 pb-8 pr-6 sm:pr-8">
        <div className="flex items-center justify-between mb-5">
          <span className="text-[10px] tracking-[0.3em] font-semibold text-[#1F1F1F]/25 uppercase">
            {item.num}
          </span>
          <div className="w-9 h-9 rounded-full border border-[#1F1F1F]/12 flex items-center justify-center group-hover:border-[#1F1F1F]/35 group-hover:bg-white/60 transition-all duration-300 flex-shrink-0">
            <Icon size={15} className="text-[#1F1F1F]/50 group-hover:text-[#1F1F1F]/80 transition-colors duration300" />
          </div>
        </div>
        <h3 className="text-sm sm:text-[15px] font-bold tracking-tight text-[#1F1F1F] leading-snug mb-3 uppercase break-words">
          {item.title}
        </h3>
        <p className="text-xs sm:text-[13px] text-[#1F1F1F]/55 leading-relaxed break-words">
          {item.desc}
        </p>
      </div>
    </motion.div>
  )
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
export default function WhyChooseUs() {
  const sectionRef    = useRef(null)
  const headingRef    = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  return (
    <section ref={sectionRef}
      className="relative bg-[#F3F1EA] py-16 sm:py-24 md:py-36 overflow-hidden"
    >
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage:
          "repeating-linear-gradient(0deg,#1F1F1F,#1F1F1F 1px,transparent 1px,transparent 60px), repeating-linear-gradient(90deg,#1F1F1F,#1F1F1F 1px,transparent 1px,transparent 60px)",
      }} />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">

          {/* ── LEFT ── */}
          <div className="min-w-0">
            <motion.div ref={headingRef}
              className="inline-flex items-center gap-3 mb-6 sm:mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={headingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="w-8 h-[1.5px] bg-[#1F1F1F]/40 flex-shrink-0" />
              <span className="text-[9px] tracking-[0.3em] uppercase font-semibold text-[#1F1F1F]/50 whitespace-nowrap">
                Our Promise
              </span>
            </motion.div>

            <div className="overflow-hidden mb-10 sm:mb-14">
              <motion.h2
                className="text-[clamp(3rem,10vw,8rem)] font-bold leading-none tracking-tight text-[#1F1F1F]"
                initial={{ y: "100%" }}
                animate={headingInView ? { y: 0 } : {}}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                Why
                <br />
                <span className="relative inline-block">
                  Choose
                  <motion.span
                    className="absolute -top-1 -right-3 sm:-top-2 sm:-right-4 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#1F1F1F]"
                    initial={{ scale: 0 }}
                    animate={headingInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  />
                </span>
                <br />
                <span className="text-[#1F1F1F]/20">Us</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-10 gap-y-0">
              {reasons.map((item, i) => (
                <FeatureCard key={item.num} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* ── RIGHT — clock ── */}
          <div className="relative flex items-center justify-center order-first lg:order-last py-8 sm:py-0">
            {/* Atmospheric rings */}
            <motion.div
              className="absolute w-[min(420px,85vw)] h-[min(420px,85vw)] sm:w-[420px] sm:h-[420px] lg:w-[480px] lg:h-[480px] rounded-full border border-[#1F1F1F]/6"
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            >
              {[0, 90, 180, 270].map((deg) => (
                <div key={deg} className="absolute w-[1px] h-4 bg-[#1F1F1F]/20 left-1/2 top-0"
                  style={{ transform: `translateX(-50%) rotate(${deg}deg)`, transformOrigin: "50% 50%" }} />
              ))}
            </motion.div>

            <motion.div
              className="absolute w-[min(360px,73vw)] h-[min(360px,73vw)] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px] rounded-full border border-[#1F1F1F]/4"
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />

            {/* Clock */}
            <div className="relative w-[min(260px,55vw)] h-[min(260px,55vw)] sm:w-[280px] sm:h-[280px] lg:w-[340px] lg:h-[340px]">
              <div className="absolute inset-4 rounded-full bg-white/60 blur-2xl" />
              <div className="absolute inset-0 rounded-full shadow-[0_20px_80px_rgba(31,31,31,0.12)]" />
              <ClockFace scrollProgress={scrollYProgress} />
            </div>

            {/* Scroll label */}
            <motion.div
              className="absolute bottom-0 right-[50%] translate-x-[50%] sm:right-0 sm:translate-x-0 lg:bottom-6 flex items-center gap-2 px-4 py-2 bg-white/70 border border-[#E5E2D9] backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#1F1F1F] animate-pulse flex-shrink-0" />
              <span className="text-[8px] tracking-[0.22em] uppercase font-semibold text-[#1F1F1F]/60 whitespace-nowrap">
                Scroll to Turn
              </span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}