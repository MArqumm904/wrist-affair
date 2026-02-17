"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { MessageCircle, ArrowUpRight } from "lucide-react"

// ─── NAV DATA ────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact",  href: "/contact" },
]

const watchBrands = [
  "Rolex",
  "Patek Philippe",
  "Audemars Piguet",
  "Omega",
  "Breitling",
  "IWC Schaffhausen",
  "Vacheron Constantin",
  "H. Moser & Cie",
  "Cartier",
  "A. Lange & Söhne",
  "Jaeger-LeCoultre",
  "Grand Seiko",
]

// ─── FOOTER ──────────────────────────────────────────────────────────────────
// Sticky positioning makes it sit at the bottom — ContactSection scrolls away
// above it, creating the "contact lifts off, footer emerges" effect.
export default function Footer() {
  const footerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  })

  // Very subtle scale-up as footer comes into view — enhances the slide-up feel
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0.6, 1])
  const y       = useTransform(scrollYProgress, [0, 0.2],  [30, 0])

  return (
    // sticky bottom — sits behind ContactSection (z-index 1 < contact z-index 2)
    <footer
      ref={footerRef}
      className="sticky bottom-0 bg-[#1A1A1A] text-[#F3F1EA] overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Top accent line */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#F3F1EA]/20 to-transparent" />

      <motion.div
        className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity, y }}
      >
        {/* ── Main footer grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[2fr_1fr_1fr_1fr_1.5fr] gap-10 lg:gap-12 pt-14 pb-10">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            {/* Logo — swap with your actual logo component or Image */}
            <Link href="/" className="inline-block mb-5 group">
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-[0.18em] uppercase text-[#F3F1EA] group-hover:text-[#F3F1EA]/70 transition-colors duration-200">
                  Wrist Affair
                </span>
                <span className="text-[8px] tracking-[0.35em] uppercase text-[#F3F1EA]/30 mt-0.5">
                  Dubai
                </span>
              </div>
              {/*
                Or use your actual logo image:
                <Image src={logoDark} alt="Wrist Affair" width={140} height={40} className="h-8 w-auto object-contain opacity-90 group-hover:opacity-60 transition-opacity" />
              */}
            </Link>

            <p className="text-[12px] leading-relaxed text-[#F3F1EA]/40 max-w-[220px] mb-6">
              The laboratory of horological art — a community of watch lovers established in Dubai, operating worldwide.
            </p>

            {/* WhatsApp pill */}
            <a
              href="https://wa.me/971507950622"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#F3F1EA]/15 text-[9px] tracking-[0.22em] uppercase font-semibold text-[#F3F1EA]/50 hover:bg-[#F3F1EA]/8 hover:text-[#F3F1EA] hover:border-[#F3F1EA]/30 transition-all duration-300"
            >
              <MessageCircle size={12} />
              WhatsApp Us
            </a>
          </div>

          {/* Pages column */}
          <div>
            <h3 className="text-[9px] tracking-[0.3em] uppercase font-semibold text-[#F3F1EA]/30 mb-5">
              Pages
            </h3>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1 text-[12px] tracking-[0.06em] text-[#F3F1EA]/55 hover:text-[#F3F1EA] transition-colors duration-200"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-[#F3F1EA]/60 transition-all duration-300 overflow-hidden" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Watches — brands col 1 */}
          <div>
            <h3 className="text-[9px] tracking-[0.3em] uppercase font-semibold text-[#F3F1EA]/30 mb-5">
              Watches
            </h3>
            <ul className="space-y-2.5">
              {watchBrands.slice(0, 6).map((brand) => (
                <li key={brand}>
                  <Link
                    href="#"
                    className="text-[11px] tracking-[0.04em] text-[#F3F1EA]/40 hover:text-[#F3F1EA]/80 transition-colors duration-200"
                  >
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Watches — brands col 2 */}
          <div>
            <h3 className="text-[9px] tracking-[0.3em] uppercase font-semibold text-[#F3F1EA]/30 mb-5 invisible">
              &nbsp;
            </h3>
            <ul className="space-y-2.5">
              {watchBrands.slice(6).map((brand) => (
                <li key={brand}>
                  <Link
                    href="#"
                    className="text-[11px] tracking-[0.04em] text-[#F3F1EA]/40 hover:text-[#F3F1EA]/80 transition-colors duration-200"
                  >
                    {brand}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 text-[9px] tracking-[0.22em] uppercase font-semibold text-[#F3F1EA]/25 hover:text-[#F3F1EA]/60 transition-colors duration-200 mt-1"
                >
                  All Brands
                  <ArrowUpRight size={10} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-[9px] tracking-[0.3em] uppercase font-semibold text-[#F3F1EA]/30 mb-5">
              Visit Us
            </h3>
            <address className="not-italic space-y-3">
              <p className="text-[12px] leading-relaxed text-[#F3F1EA]/45">
                Bur Dubai, UAE
                <br />
                Sector 3 · 7th St
                <br />
                Al Hudaiba 2/5
              </p>

              <div className="space-y-1 pt-1">
                <p className="text-[11px] text-[#F3F1EA]/35">Mon – Fri · 11 AM – 9 PM</p>
                <p className="text-[11px] text-[#F3F1EA]/35">Saturday · 3 PM – 7 PM</p>
                <p className="text-[11px] text-[#F3F1EA]/20">Sunday · Closed</p>
              </div>

              <a
                href="tel:+971507950622"
                className="block text-[12px] font-semibold text-[#F3F1EA]/60 hover:text-[#F3F1EA] transition-colors duration-200 pt-1 tracking-wide"
              >
                +971 50 795 0622
              </a>
            </address>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-[#F3F1EA]/8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[9px] tracking-[0.18em] uppercase text-[#F3F1EA]/20">
            © {new Date().getFullYear()} Wrist Affair. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Terms & Conditions", "Privacy Policy"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[9px] tracking-[0.18em] uppercase text-[#F3F1EA]/20 hover:text-[#F3F1EA]/50 transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  )
}