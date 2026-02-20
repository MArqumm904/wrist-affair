"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Tag, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import prod1 from "@/assets/products/prod-1.png"
import prod2 from "@/assets/products/prod-2.png"
import prod3 from "@/assets/products/prod-3.png"
import prod4 from "@/assets/products/prod-4.png"
import prod5 from "@/assets/products/prod-5.png"
import prod6 from "@/assets/products/prod-6.png"
import prod7 from "@/assets/products/prod-7.png"
import prod8 from "@/assets/products/prod-8.png"
import prod9 from "@/assets/products/prod-9.png"
import Image from "next/image"
import Link from "next/link"

// ─── PRODUCTS DATA ────────────────────────────────────────────────────────────
const products = [
  {
    id: "wa-001",
    brand: "ROLEX",
    title: "GMT-Master II Batgirl Jubilee Bracelet",
    desc: "A true collector's favourite. The iconic Batman bezel reborn on the classic Jubilee bracelet — ceramic, robust, and unmistakably Rolex.",
    price: "69 000 AED",
    type: "mint",
    ref: "REF 126710BLNR",
    image: prod1,
    accent: "#0a1628",
  },
  {
    id: "wa-002",
    brand: "BREITLING",
    title: "Superocean Heritage B20 Automatic 42mm Blue",
    desc: "The ocean's spirit distilled into steel. A vintage soul with modern movement, this Blue dial turns every glance into a deep-sea escape.",
    price: "17 500 AED",
    type: "brand_new",
    ref: "REF AB2010161C1S1",
    image: prod2,
    accent: "#1a3a5c",
  },
  {
    id: "wa-003",
    brand: "OMEGA",
    title: "Speedmaster Professional Moonwatch Hesalite 42mm",
    desc: "The watch that went to the Moon. An icon of human achievement worn on the wrist — hesalite crystal, manual-wind calibre, and timeless legacy.",
    price: "20 000 AED",
    type: "perfect",
    ref: "REF 310.30.42.50.01.001",
    image: prod3,
    accent: "#1c1c1c",
  },
  {
    id: "wa-004",
    brand: "PATEK PHILIPPE",
    title: "Nautilus Annual Calendar 40.5mm Steel",
    desc: "The pinnacle of horological refinement. Patek's signature porthole shape houses a Grand Complication — annual calendar, moon phase, and soul.",
    price: "120 000 AED",
    type: "brand_new",
    ref: "REF 5726A-001",
    image: prod4,
    accent: "#2c3e50",
  },
  {
    id: "wa-005",
    brand: "AUDEMARS PIGUET",
    title: "Royal Oak Selfwinding 41mm Stainless Steel",
    desc: "The revolutionary octagonal bezel that changed fine watchmaking forever. Integrated bracelet, tapisserie dial — an eternally modern masterpiece.",
    price: "95 000 AED",
    type: "mint",
    ref: "REF 15510ST.OO.1320ST.06",
    image: prod5,
    accent: "#1e3a2f",
  },
  {
    id: "wa-006",
    brand: "H. MOSER & CIE",
    title: "Pioneer Centre Seconds Sunny-Side Up 40mm",
    desc: "Swiss craftsmanship at its most joyful. The Funky Blue fumé dial evolves with the light — no date, no clutter, pure watchmaking pleasure.",
    price: "60 000 AED",
    type: "brand_new",
    ref: "REF 3201-1200",
    image: prod6,
    accent: "#1a2a4a",
  },
  {
    id: "wa-007",
    brand: "CARTIER",
    title: "Santos de Cartier Large Steel ADLC 39.8mm",
    desc: "Born from the first pilot's watch ever made. Santos blends art deco geometry with wearable elegance — screws, bracelet, boldness and all.",
    price: "32 000 AED",
    type: "used",
    ref: "REF WSSA0029",
    image: prod7,
    accent: "#2c1810",
  },
  {
    id: "wa-008",
    brand: "IWC SCHAFFHAUSEN",
    title: "Portugieser Chronograph Classic 42mm",
    desc: "A pocket-watch soul in a wristwatch body. The Portugieser's large dial and railway-track minute scale give it an air of authoritative precision.",
    price: "44 000 AED",
    type: "mint",
    ref: "REF IW390405",
    image: prod8,
    accent: "#1a1a2e",
  },
  {
    id: "wa-009",
    brand: "VACHERON CONSTANTIN",
    title: "Overseas Dual Time 41mm Stainless Steel",
    desc: "The world traveller's companion. Seamlessly switch between home and destination time with one of haute horlogerie's most elegant sports watches.",
    price: "88 000 AED",
    type: "brand_new",
    ref: "REF 7900V/110A-B333",
    image: prod9,
    accent: "#2a1f3d",
  },
]

const MotionImage = motion(Image)

// ─── BADGE CONFIG ─────────────────────────────────────────────────────────────
const badgeConfig = {
  brand_new: {
    label: "Brand New",
    className: "bg-[#1F1F1F] text-[#F3F1EA] border-[#1F1F1F]",
    icon: Sparkles,
  },
  mint: {
    label: "Mint",
    className: "bg-transparent text-[#1F1F1F] border-[#1F1F1F]/40",
    icon: Award,
  },
  perfect: {
    label: "Perfect",
    className: "bg-transparent text-[#1F1F1F] border-[#1F1F1F]/40",
    icon: Award,
  },
  used: {
    label: "Used",
    className: "bg-[#E5E2D9] text-[#3A3A3A] border-[#E5E2D9]",
    icon: Tag,
  },
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
const ProductCard = ({ product, index }) => {
  const [hovered, setHovered] = useState(false)
  const badge = badgeConfig[product.type] || badgeConfig.used
  const BadgeIcon = badge.icon

  return (
    <Link href={`/products/${product.id}`}>
    <motion.article
      className="group relative flex flex-col bg-white border border-[#E5E2D9] overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      // mobile: stagger by 2-col position; desktop: by 3-col
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image area ── */}
      <div className="relative overflow-hidden bg-[#F3F1EA] aspect-square">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Decorative rings behind watch */}
          <motion.div
            className="absolute w-48 h-48 rounded-full border border-[#1F1F1F]/8"
            animate={hovered ? { scale: 1.15, opacity: 0.6 } : { scale: 1, opacity: 0.3 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute w-32 h-32 rounded-full border border-[#1F1F1F]/12"
            animate={hovered ? { scale: 1.1, opacity: 0.8 } : { scale: 1, opacity: 0.4 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          />

          {/* Watch image */}
          <MotionImage
            src={product.image}
            alt={`${product.brand} – ${product.title}`}
            fill
            className="relative z-10 object-contain drop-shadow-xl select-none p-6"
            animate={hovered ? { scale: 1.06, y: -4 } : { scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            draggable={false}
            onError={(e) => {
              e.currentTarget.style.display = "none"
            }}
          />

          {/* Fallback monogram */}
          <div className="absolute z-0 text-6xl font-bold text-[#1F1F1F]/6 tracking-widest select-none pointer-events-none">
            {product.brand.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </div>
        </div>

        {/* Badge — top left, scaled down on mobile */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-20">
          <span
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 text-[7px] sm:text-[9px] tracking-[0.12em] sm:tracking-[0.18em] uppercase font-semibold border rounded-none ${badge.className}`}
          >
            <BadgeIcon size={8} />
            {badge.label}
          </span>
        </div>

        {/* REF — hidden on mobile (no space in 2-col), visible from sm up */}
        <div className="absolute top-3 right-3 z-20 hidden sm:block">
          <span className="text-[8px] tracking-[0.18em] uppercase font-medium text-[#1F1F1F]/35">
            {product.ref}
          </span>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-[#1F1F1F] flex items-center justify-center z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 0.06 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* ── Content area — tighter padding on mobile ── */}
      <div className="flex flex-col flex-1 p-3 sm:p-4 lg:p-6 space-y-2 sm:space-y-3 border-t border-[#E5E2D9]">
        {/* Brand — truncated so it never wraps/overflows */}
        <p className="text-[8px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.25em] uppercase font-semibold text-[#1F1F1F]/50 truncate">
          {product.brand}
        </p>

        {/* Title */}
        <h3 className="text-[11px] sm:text-sm lg:text-[15px] font-bold leading-snug tracking-tight text-[#1F1F1F] line-clamp-2">
          {product.title}
        </h3>

        {/* Description — hidden on mobile (cards too small in 2-col) */}
        <p className="hidden sm:block text-xs text-[#1F1F1F]/55 leading-relaxed line-clamp-2 flex-1">
          {product.desc}
        </p>

        {/* Divider */}
        <div className="w-6 sm:w-8 h-[1.5px] bg-[#1F1F1F]/15" />

        {/* Price + CTA row */}
        <div className="flex items-center justify-between pt-0.5 sm:pt-1">
          {/* Price — truncate prevents overflow on narrow mobile cards */}
          <p className="text-sm sm:text-base lg:text-lg font-bold tracking-tight text-[#1F1F1F] truncate">
            {product.price}
          </p>

          <motion.button
            className="flex-shrink-0 inline-flex items-center gap-1 text-[8px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-semibold text-[#1F1F1F] border-b border-[#1F1F1F]/30 pb-0.5 hover:border-[#1F1F1F] transition-colors duration-200 ml-2"
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            View
            <ArrowRight size={9} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </motion.article>
    </Link>
  )
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
const NewArrivalsSection = () => {
  const [page, setPage] = useState(0)
  const ITEMS_PER_PAGE = 9
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)
  const sectionRef = useRef(null)
  const headingInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const visibleProducts = products.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  )

  return (
    <section ref={sectionRef} className="relative bg-[#F3F1EA] py-20 md:py-28 overflow-hidden">

      {/* ── Background decorative elements ── */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#1F1F1F]/[0.025] rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#1F1F1F]/[0.025] rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="space-y-4">
            {/* Section label */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1F1F1F]/10 bg-white/50"
              initial={{ opacity: 0, y: 16 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Sparkles size={13} className="text-[#1F1F1F]/60" />
              <span className="text-[9px] tracking-[0.22em] uppercase font-semibold text-[#1F1F1F]/60">
                Latest Additions
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-none tracking-tight text-[#1F1F1F]"
              initial={{ opacity: 0, y: 20 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              New<br />
              <span className="relative inline-block">
                Arrivals
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-[#1F1F1F]"
                  initial={{ width: 0 }}
                  animate={headingInView ? { width: "100%" } : {}}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </span>
            </motion.h2>
          </div>

          {/* Count + nav */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm text-[#1F1F1F]/40 font-medium">
              <span className="text-[#1F1F1F] font-bold text-lg">{products.length}</span> pieces
            </p>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  aria-label="Previous page"
                  className="w-10 h-10 rounded-full border-2 border-[#1F1F1F]/20 flex items-center justify-center hover:border-[#1F1F1F] hover:bg-[#1F1F1F]/5 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronLeft size={18} className="text-[#1F1F1F]" />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  aria-label="Next page"
                  className="w-10 h-10 rounded-full border-2 border-[#1F1F1F]/20 flex items-center justify-center hover:border-[#1F1F1F] hover:bg-[#1F1F1F]/5 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronRight size={18} className="text-[#1F1F1F]" />
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* ── Products Grid — 2 cols on mobile, 3 cols on desktop ── */}
        <motion.div
          key={page}
          className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-[#E5E2D9]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {visibleProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {/* ── Footer row ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 lg:mt-16 pt-8 border-t border-[#E5E2D9]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Pagination dots */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className={`transition-all duration-300 rounded-full bg-[#1F1F1F] ${
                    i === page
                      ? "w-8 h-[5px] opacity-100"
                      : "w-[5px] h-[5px] opacity-20 hover:opacity-50"
                  }`}
                />
              ))}
            </div>
          )}

          {/* View All CTA */}
          <Button
            className="group px-8 h-12 lg:h-14 text-[10px] tracking-[0.2em] uppercase font-semibold rounded-none border-2 bg-[#1F1F1F] text-white border-[#1F1F1F] hover:bg-transparent hover:text-[#1F1F1F] transition-all duration-300 cursor-pointer ml-auto"
          >
            View Full Catalogue
            <ArrowRight
              size={15}
              className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
            />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default NewArrivalsSection