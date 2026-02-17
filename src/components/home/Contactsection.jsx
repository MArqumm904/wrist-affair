"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Link from "next/link"
import { MapPin, Clock, Phone, MessageCircle, Send } from "lucide-react"
import Image from "next/image"
import office1 from "@/assets/office-1.png"
import office2 from "@/assets/office-2.png"

// ─── SCROLL-DRIVEN RULER ──────────────────────────────────────────────────────
function TickerRuler({ scrollProgress }) {
  // Lines slide left as user scrolls — creates mechanical measurement feel
 const x = useTransform(scrollProgress, [0, 1], ["0%", "-40%"])

  const ticks = Array.from({ length: 100 }, (_, i) => ({
    i,
    isMajor: i % 10 === 0,
    isMid: i % 5 === 0 && i % 10 !== 0,
  }))

  return (
    <div className="relative w-full overflow-hidden h-10 border-b border-[#1F1F1F]/10 bg-[#F3F1EA]">
      <motion.div className="flex items-end h-full" style={{ x }}>
        {[...ticks, ...ticks].map((tick, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 flex flex-col items-center justify-end pb-0"
            style={{ width: "18px", height: "100%" }}
          >
            <div
              className="bg-[#1F1F1F] rounded-none"
              style={{
                width: tick.isMajor ? "1.5px" : "0.8px",
                height: tick.isMajor ? "30px" : tick.isMid ? "20px" : "10px",
                opacity: tick.isMajor ? 0.5 : tick.isMid ? 0.22 : 0.1,
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────
export default function ContactSection() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const inView = useInView(contentRef, { once: true, margin: "-80px" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  return (
    <section
      ref={sectionRef}
      // sticky positioning so footer can slide under it
      className="relative bg-[#F3F1EA] overflow-hidden"
      style={{ position: "relative", zIndex: 2 }}
    >
      {/* Scroll-driven ticker ruler */}
      <TickerRuler scrollProgress={scrollYProgress} />

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.018,
          backgroundImage:
            "repeating-linear-gradient(0deg,#1F1F1F,#1F1F1F 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#1F1F1F,#1F1F1F 1px,transparent 1px,transparent 60px)",
        }}
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">

        {/* Section label */}
        <motion.div
          ref={contentRef}
          className="flex items-center gap-3 mb-12 md:mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-[1.5px] bg-[#1F1F1F]/40" />
          <span className="text-[9px] tracking-[0.35em] uppercase font-semibold text-[#1F1F1F]/45">
            Contact Us
          </span>
        </motion.div>

        {/* Heading */}
        <div className="overflow-hidden mb-16 md:mb-20">
          <motion.h2
            className="text-[clamp(2.8rem,8vw,7rem)] font-bold leading-none tracking-tight text-[#1F1F1F]"
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            Visit
            <br />
            <span className="text-[#1F1F1F]/20">Our Atelier</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="flex flex-col lg:flex-row gap-0 items-start">

          {/* LEFT — Staggered images */}
          <div className="relative w-full lg:flex-1 min-w-0">
            {/* Primary image */}
            <motion.div
              className="relative w-full sm:max-w-[580px] overflow-hidden"
              style={{ aspectRatio: "4/3" }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              
                <Image src={office1} alt="Wrist Affair atelier interior" fill className="object-cover" />
             
              <div className="w-full h-full bg-gradient-to-br from-[#D8D4CA] via-[#C8C3B6] to-[#B8B2A4] flex items-center justify-center">
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#1F1F1F]/30">
                  Store Photo 1 — replace with &lt;Image /&gt;
                </p>
              </div>
              {/* Subtle dark overlay */}
              <div className="absolute inset-0 bg-[#1F1F1F]/6 pointer-events-none" />
            </motion.div>

            {/* Secondary image — offset right + overlapping */}
            <motion.div
              className="relative w-[75%] sm:w-[440px] overflow-hidden ml-auto lg:ml-16 -mt-10 sm:-mt-16"
              style={{ aspectRatio: "16/10" }}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              
                ── Replace this placeholder div with your actual Image ──
                <Image src={office2} alt="Wrist Affair showroom" fill className="object-cover" />
             
              <div className="w-full h-full bg-gradient-to-tl from-[#C5C0B1] via-[#D0CAB9] to-[#DEDAD0] flex items-center justify-center">
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#1F1F1F]/30">
                  Store Photo 2 — replace with &lt;Image /&gt;
                </p>
              </div>
              <div className="absolute inset-0 bg-[#1F1F1F]/5 pointer-events-none" />

              {/* Floating location chip */}
              <div className="absolute bottom-3 left-3 z-10 bg-[#F3F1EA]/90 backdrop-blur-sm border border-[#E5E2D9] px-3 py-1.5 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1F1F1F] animate-pulse" />
                <span className="text-[8px] tracking-[0.25em] uppercase font-semibold text-[#1F1F1F]/60">
                  Bur Dubai, UAE
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Info panel */}
          <motion.div
            className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0 lg:pl-16 xl:pl-20 pt-14 lg:pt-0"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >

            {/* Address */}
            <div className="border-t border-[#1F1F1F]/12 pt-7 mb-8">
              <div className="flex items-start gap-3">
                <MapPin size={13} className="text-[#1F1F1F]/35 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[9px] tracking-[0.28em] uppercase font-semibold text-[#1F1F1F]/35 mb-2.5">
                    Address
                  </p>
                  <p className="text-[13px] font-medium text-[#1F1F1F] leading-relaxed">
                    Bur Dubai — United Arab Emirates
                    <br />
                    Sector 3 · 7th St · Al Hudaiba 2/5
                  </p>
                </div>
              </div>
              <div className="mt-5 pl-6">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 border border-[#1F1F1F]/20 px-5 py-2.5 text-[9px] tracking-[0.25em] uppercase font-semibold text-[#1F1F1F]/55 hover:bg-[#1F1F1F] hover:text-[#F3F1EA] hover:border-[#1F1F1F] transition-all duration-300"
                >
                  <MapPin size={10} />
                  View Map
                </Link>
              </div>
            </div>

            {/* Hours */}
            <div className="border-t border-[#1F1F1F]/12 pt-7 mb-8">
              <div className="flex items-start gap-3">
                <Clock size={13} className="text-[#1F1F1F]/35 mt-0.5 flex-shrink-0" />
                <div className="w-full">
                  <p className="text-[9px] tracking-[0.28em] uppercase font-semibold text-[#1F1F1F]/35 mb-3">
                    Hours
                  </p>
                  <div className="space-y-2">
                    {[
                      { day: "Mon – Fri", time: "11 AM – 9 PM", open: true },
                      { day: "Saturday",  time: "3 PM – 7 PM",  open: true },
                      { day: "Sunday",    time: "Closed",        open: false },
                    ].map(({ day, time, open }) => (
                      <div key={day} className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.15em] text-[#1F1F1F]/45">{day}</span>
                        <span className={`text-[11px] font-semibold tracking-wide ${open ? "text-[#1F1F1F]" : "text-[#1F1F1F]/30"}`}>
                          {time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="border-t border-[#1F1F1F]/12 pt-7 mb-8">
              <div className="flex items-start gap-3">
                <Phone size={13} className="text-[#1F1F1F]/35 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[9px] tracking-[0.28em] uppercase font-semibold text-[#1F1F1F]/35 mb-2.5">
                    Phone
                  </p>
                  <a
                    href="tel:+971507950622"
                    className="text-[13px] font-semibold text-[#1F1F1F] tracking-wide hover:text-[#1F1F1F]/55 transition-colors duration-200"
                  >
                    +971 50 795 0622
                  </a>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="border-t border-[#1F1F1F]/12 pt-7 flex flex-col gap-3">
              <a
                href="https://wa.me/971507950622"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full h-12 border-2 border-[#1F1F1F] bg-[#1F1F1F] text-[#F3F1EA] text-[10px] tracking-[0.22em] uppercase font-semibold hover:bg-transparent hover:text-[#1F1F1F] transition-all duration-300"
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
              <a
                href="https://t.me/wristaffair"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full h-12 border border-[#1F1F1F]/20 text-[#1F1F1F]/55 text-[10px] tracking-[0.22em] uppercase font-semibold hover:border-[#1F1F1F] hover:text-[#1F1F1F] transition-all duration-300"
              >
                <Send size={13} />
                Telegram
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}