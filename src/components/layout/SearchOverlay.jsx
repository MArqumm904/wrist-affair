"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Sample quick-links / trending ────────────────────────────────────────────
const TRENDING = [
  "Rolex Submariner",
  "Patek Philippe Nautilus",
  "Audemars Piguet Royal Oak",
  "Grand Seiko Snowflake",
  "IWC Pilot",
];

const BRANDS = [
  "Rolex",
  "Patek Philippe",
  "Audemars Piguet",
  "H. Moser & Cie",
  "IWC Schaffhausen",
  "Jaeger-LeCoultre",
  "Vacheron Constantin",
  "A. Lange & Söhne",
  "Breitling",
  "Omega",
  "Tudor",
  "Grand Seiko",
];

// ─── Animation variants ────────────────────────────────────────────────────────
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

const contentVariants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.08 },
  },
  exit: {
    opacity: 0, y: -16,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

// ─── SearchOverlay Component ──────────────────────────────────────────────────
export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Simulated search filter
  const handleChange = useCallback((e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 1) {
      const filtered = BRANDS.filter((b) =>
        b.toLowerCase().includes(val.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log("Search:", query);
      onClose();
    }
  };

  const handleQuickLink = (term) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="search-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[200] bg-[#F3F1EA]"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          {/* ── Subtle grain texture overlay ── */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "128px 128px",
            }}
          />

          {/* ── Close button (top-right) ── */}
          <motion.button
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0, transition: { delay: 0.15, duration: 0.3 } }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute top-6 right-6 sm:top-8 sm:right-10 z-10 p-2 text-[#1A1A2E]/40 hover:text-[#1A1A2E] transition-colors duration-200 cursor-pointer"
            aria-label="Close search"
          >
            <X size={22} strokeWidth={1.5} />
          </motion.button>

          {/* ── Main content ── */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="h-full flex flex-col px-6 sm:px-12 lg:px-20 pt-16 sm:pt-20 pb-10 max-w-[900px] mx-auto"
          >
            {/* Heading */}
            <p className="text-[10px] tracking-[0.32em] uppercase font-medium text-[#1A1A2E]/35 mb-5 sm:mb-7">
              Search
            </p>

            {/* ── Search Input ── */}
            <form onSubmit={handleSubmit} className="relative group mb-10 sm:mb-14">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Enter brand, reference, model, etc..."
                className="w-full bg-transparent border-0 border-b border-[#1A1A2E]/20 pb-4 pr-10
                           text-[#1A1A2E] text-lg sm:text-2xl font-light tracking-wide
                           placeholder:text-[#1A1A2E]/30 placeholder:font-light
                           focus:outline-none focus:border-[#1A1A2E]/50
                           transition-colors duration-300"
                autoComplete="off"
                spellCheck="false"
              />
              {/* Animated underline */}
              <span
                className="absolute bottom-0 left-0 h-[1px] bg-[#1A1A2E] transition-all duration-500"
                style={{ width: query ? "100%" : "0%" }}
              />
              <button
                type="submit"
                className="absolute right-0 bottom-4 text-[#1A1A2E]/40 hover:text-[#1A1A2E] transition-colors duration-200 cursor-pointer"
                aria-label="Submit search"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
            </form>

            {/* ── Live Results ── */}
            <AnimatePresence mode="wait">
              {results.length > 0 && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="mb-10"
                >
                  <p className="text-[9px] tracking-[0.28em] uppercase font-semibold text-[#1A1A2E]/35 mb-4">
                    Results
                  </p>
                  <ul className="space-y-1">
                    {results.map((r) => (
                      <li key={r}>
                        <button
                          onClick={() => { setQuery(r); onClose(); }}
                          className="w-full text-left py-2.5 px-0 text-[#1A1A2E]/80 hover:text-[#1A1A2E]
                                     text-sm tracking-wide border-b border-[#1A1A2E]/08
                                     hover:pl-3 transition-all duration-200 cursor-pointer"
                        >
                          {r}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Trending / Quick Links (shown when no query) ── */}
            <AnimatePresence mode="wait">
              {!query && (
                <motion.div
                  key="suggestions"
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  className="flex-1"
                >
                  {/* Trending searches */}
                  <div className="mb-10 sm:mb-12">
                    <motion.p
                      variants={itemVariants}
                      className="text-[9px] tracking-[0.28em] uppercase font-semibold text-[#1A1A2E]/35 mb-5"
                    >
                      Trending
                    </motion.p>
                    <ul className="space-y-1">
                      {TRENDING.map((term) => (
                        <motion.li key={term} variants={itemVariants}>
                          <button
                            onClick={() => handleQuickLink(term)}
                            className="group flex items-center gap-3 py-2.5 w-full text-left
                                       text-[#1A1A2E]/60 hover:text-[#1A1A2E]
                                       text-sm sm:text-base font-light tracking-wide
                                       border-b border-[#1A1A2E]/08
                                       transition-colors duration-200 cursor-pointer"
                          >
                            <Search
                              size={13}
                              strokeWidth={1.5}
                              className="opacity-30 group-hover:opacity-60 shrink-0 transition-opacity"
                            />
                            {term}
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Popular brands */}
                  <div>
                    <motion.p
                      variants={itemVariants}
                      className="text-[9px] tracking-[0.28em] uppercase font-semibold text-[#1A1A2E]/35 mb-5"
                    >
                      Browse by Brand
                    </motion.p>
                    <motion.div
                      variants={listVariants}
                      className="flex flex-wrap gap-2"
                    >
                      {BRANDS.map((brand) => (
                        <motion.button
                          key={brand}
                          variants={itemVariants}
                          onClick={() => handleQuickLink(brand)}
                          className="px-4 py-2 border border-[#1A1A2E]/15 text-[10px] tracking-[0.16em]
                                     uppercase text-[#1A1A2E]/55 hover:text-[#1A1A2E]
                                     hover:border-[#1A1A2E]/40 hover:bg-[#1A1A2E]/[0.03]
                                     transition-all duration-200 rounded-sm cursor-pointer"
                        >
                          {brand}
                        </motion.button>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Decorative watermark (bottom-right, like screenshot) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.6 } }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 right-8 sm:bottom-10 sm:right-12 pointer-events-none select-none"
          >
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.12]">
              {/* Sunburst lines */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * 2 * Math.PI;
                const x1 = 36 + 22 * Math.cos(angle);
                const y1 = 36 + 22 * Math.sin(angle);
                const x2 = 36 + 32 * Math.cos(angle);
                const y2 = 36 + 32 * Math.sin(angle);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1A1A2E" strokeWidth="1.2" strokeLinecap="round" />;
              })}
              <text x="36" y="40" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill="#1A1A2E" letterSpacing="2">WA</text>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}