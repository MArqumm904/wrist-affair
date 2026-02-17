"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, X, ChevronDown, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import logo1 from "@/assets/logo-1.png";
import Image from "next/image";
import logodark from "@/assets/logo-dark.png";

const brands = [
  { name: "Rolex", href: "#" },
  { name: "Patek Philippe", href: "#" },
  { name: "Audemars Piguet", href: "#" },
  { name: "H. Moser & Cie", href: "#" },
  { name: "IWC Schaffhausen", href: "#" },
  { name: "Jaeger-LeCoultre", href: "#" },
  { name: "Vacheron Constantin", href: "#" },
  { name: "A. Lange & Söhne", href: "#" },
  { name: "Breitling", href: "#" },
  { name: "Omega", href: "#" },
  { name: "Tudor", href: "#" },
  { name: "Grand Seiko", href: "#" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const brandsRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close brands dropdown on outside click
  useEffect(() => {
    const onOutside = (e) => {
      if (brandsRef.current && !brandsRef.current.contains(e.target)) {
        setBrandsOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  // Close search on outside click
  useEffect(() => {
    const onOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Add your search logic here
    }
  };

  // ─── Shared style tokens ───────────────────────────────
  const headerCls = scrolled
    ? "bg-[#0F0F0F] border-white/10 shadow-[0_2px_24px_rgba(0,0,0,0.45)]"
    : "bg-[#F3F1EA]/90 backdrop-blur-lg border-[#E2DED5]";

  const iconBtnCls = scrolled
    ? "text-white/55 hover:text-white hover:bg-white/10"
    : "text-[#1A1A2E]/45 hover:text-[#1A1A2E] hover:bg-[#1A1A2E]/[0.06]";

  const desktopLinkCls = `relative text-[11px] font-medium tracking-[0.18em] uppercase
    after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0
    after:transition-all after:duration-300 hover:after:w-full transition-colors duration-200
    ${
      scrolled
        ? "text-white/60 hover:text-white after:bg-white"
        : "text-[#1A1A2E]/55 hover:text-[#1A1A2E] after:bg-[#1A1A2E]"
    }`;

  const logoCls = scrolled ? "text-white" : "text-[#1A1A2E]";
  const taglineCls = scrolled ? "text-white/35" : "text-[#1A1A2E]/35";

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${headerCls}`}
      >
        <nav className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* ── MOBILE: Hamburger (left) ── */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className={`md:hidden p-2 rounded-full transition-all duration-200 ${iconBtnCls} ${
                scrolled ? "text-white" : "text-[#1A1A2E]"
              }`}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>

            {/* ── DESKTOP: Left nav links ── */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              {/* Brands dropdown trigger */}
              <div className="relative" ref={brandsRef}>
                <button
                  onClick={() => setBrandsOpen((v) => !v)}
                  className={`flex items-center gap-1 ${desktopLinkCls}`}
                >
                  Brands
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${brandsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown panel */}
                {brandsOpen && (
                  <div
                    className={`absolute left-0 top-full mt-3 w-64 rounded-lg shadow-2xl border overflow-hidden transition-all duration-200 ${
                      scrolled
                        ? "bg-[#0F0F0F] border-white/10"
                        : "bg-white border-[#E2DED5]"
                    }`}
                  >
                    {/* Arrow notch */}
                    <div
                      className={`absolute -top-2 left-6 w-4 h-4 rotate-45 ${
                        scrolled
                          ? "bg-[#0F0F0F] border-l border-t border-white/10"
                          : "bg-white border-l border-t border-[#E2DED5]"
                      }`}
                    />

                    <div className="relative py-2">
                      <div
                        className={`px-5 py-3 text-[9px] tracking-[0.22em] uppercase font-semibold ${
                          scrolled ? "text-white/40" : "text-[#1A1A2E]/40"
                        }`}
                      >
                        Our Brands
                      </div>

                      {brands.map(({ name, href }) => (
                        <Link
                          key={name}
                          href={href}
                          onClick={() => setBrandsOpen(false)}
                          className={`block px-5 py-2 text-[11px] tracking-[0.06em] transition-all duration-150 ${
                            scrolled
                              ? "text-white/65 hover:text-white hover:bg-white/[0.05] hover:pl-6"
                              : "text-[#1A1A2E]/70 hover:text-[#1A1A2E] hover:bg-[#F5F3EE] hover:pl-6"
                          }`}
                        >
                          {name}
                        </Link>
                      ))}

                      <div
                        className={`mt-2 pt-2 px-5 border-t ${scrolled ? "border-white/10" : "border-[#E2DED5]"}`}
                      >
                        <Link
                          href="#"
                          onClick={() => setBrandsOpen(false)}
                          className={`text-[9px] tracking-[0.22em] uppercase font-semibold transition-colors duration-150 ${
                            scrolled
                              ? "text-white/40 hover:text-white"
                              : "text-[#1A1A2E]/40 hover:text-[#1A1A2E]"
                          }`}
                        >
                          View All Brands →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="#products" className={desktopLinkCls}>
                Products
              </Link>
            </div>

            <Link
              href="/"
              className="flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2"
            >
              <Image
                src={scrolled ? logodark : logo1} // Yahan apni image ka sahi path likhein
                alt="Wrist Affair - Let us adorn your wrist"
                width={200} // Image ki original width (aspect ratio maintain karne ke liye)
                height={100} // Image ki original height
                className="w-26 sm:w-30 md:w-32 lg:w-40 h-auto object-contain transition-opacity duration-200 hover:opacity-80"
                priority // Logo LCP element hai, isliye priority true rakhein
              />
            </Link>
            {/* ── DESKTOP: Right actions ── */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {/* WhatsApp Button */}
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${iconBtnCls}`}
                asChild
              >
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact on WhatsApp"
                >
                  <MessageCircle size={16} />
                </a>
              </Button>

              {/* Search Bar */}
              <div className="relative" ref={searchRef}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${iconBtnCls}`}
                  onClick={() => setSearchOpen(!searchOpen)}
                  aria-label="Toggle search"
                >
                  <Search size={16} />
                </Button>

                {/* Search Dropdown */}
                {searchOpen && (
                  <div
                    className={`absolute right-0 top-full mt-3 w-80 rounded-lg shadow-2xl border overflow-hidden transition-all duration-200 ${
                      scrolled
                        ? "bg-[#0F0F0F] border-white/10"
                        : "bg-white border-[#E2DED5]"
                    }`}
                  >
                    {/* Arrow notch */}
                    <div
                      className={`absolute -top-2 right-4 w-4 h-4 rotate-45 ${
                        scrolled
                          ? "bg-[#0F0F0F] border-l border-t border-white/10"
                          : "bg-white border-l border-t border-[#E2DED5]"
                      }`}
                    />

                    <div className="relative p-4">
                      <form onSubmit={handleSearch} className="relative">
                        <Search
                          size={16}
                          className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                            scrolled ? "text-white/40" : "text-[#1A1A2E]/40"
                          }`}
                        />
                        <Input
                          ref={searchInputRef}
                          type="text"
                          placeholder="Search watches..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className={`pl-10 pr-4 h-11 rounded-lg border transition-all duration-200 ${
                            scrolled
                              ? "bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/30"
                              : "bg-[#F3F1EA] border-[#E2DED5] text-[#1A1A2E] placeholder:text-[#1A1A2E]/40 focus:bg-white focus:border-[#1A1A2E]/30"
                          }`}
                        />
                      </form>

                      {/* Quick Links */}
                      <div className="mt-4 space-y-2">
                        <p
                          className={`text-[9px] tracking-[0.22em] uppercase font-semibold ${
                            scrolled ? "text-white/40" : "text-[#1A1A2E]/40"
                          }`}
                        >
                          Quick Links
                        </p>
                        {["Rolex", "Patek Philippe", "Audemars Piguet"].map(
                          (brand) => (
                            <button
                              key={brand}
                              onClick={() => {
                                setSearchQuery(brand);
                                setSearchOpen(false);
                              }}
                              className={`block w-full text-left px-3 py-2 text-[11px] tracking-[0.06em] rounded transition-all duration-150 ${
                                scrolled
                                  ? "text-white/65 hover:text-white hover:bg-white/[0.05]"
                                  : "text-[#1A1A2E]/70 hover:text-[#1A1A2E] hover:bg-[#F5F3EE]"
                              }`}
                            >
                              {brand}
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button
                size="sm"
                className={`ml-1 px-6 h-9 text-[10px] tracking-[0.2em] uppercase font-semibold rounded-none border transition-all duration-300 ${
                  scrolled
                    ? "bg-transparent text-white border-white hover:bg-white hover:text-[#0F0F0F] cursor-pointer"
                    : "bg-[#1A1A2E] text-white border-[#1A1A2E] hover:bg-transparent hover:text-[#1A1A2E] cursor-pointer"
                }`}
              >
                Explore
              </Button>
            </div>

            {/* ── MOBILE: Search icon (right side) ── */}
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden p-2 rounded-full ${iconBtnCls}`}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={18} />
            </Button>
          </div>

          {/* Mobile Search Bar */}
          {searchOpen && (
            <div className="md:hidden pb-4 pt-2 border-t border-[#E2DED5]">
              <form onSubmit={handleSearch} className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A2E]/40"
                />
                <Input
                  type="text"
                  placeholder="Search watches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 h-11 rounded-lg border bg-white border-[#E2DED5] text-[#1A1A2E] placeholder:text-[#1A1A2E]/40 focus:border-[#1A1A2E]/30"
                />
              </form>
            </div>
          )}
        </nav>
      </header>

      {/* ── MOBILE MENU OVERLAY ── */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 bg-[#0F0F0F] z-[100] md:hidden overflow-y-auto">
          <div className="px-6 py-8 text-white">
            {/* Brands accordion */}
            <div className="border-b border-white/10">
              <button
                onClick={() => setMobileBrandsOpen((v) => !v)}
                className="w-full flex items-center justify-between py-4 text-sm font-medium tracking-[0.15em] uppercase"
              >
                Brands
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${mobileBrandsOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileBrandsOpen && (
                <div className="pb-4 pl-4 space-y-2">
                  {brands.map(({ name, href }) => (
                    <Link
                      key={name}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-white/65 text-[13px] tracking-wide hover:text-white py-2 transition-colors duration-150"
                    >
                      {name}
                    </Link>
                  ))}
                  <div className="pt-2">
                    <Link
                      href="#"
                      onClick={() => setMobileOpen(false)}
                      className="text-[10px] tracking-[0.22em] uppercase font-semibold text-white/40 hover:text-white transition-colors duration-150"
                    >
                      View All Brands →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Products */}
            <Link
              href="#products"
              onClick={() => setMobileOpen(false)}
              className="block py-4 text-sm font-medium tracking-[0.15em] uppercase border-b border-white/10"
            >
              Products
            </Link>

            {/* Actions */}
            <div className="mt-8 space-y-4">
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 text-white/75 hover:text-white transition-colors duration-150"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>

              <Button
                onClick={() => setMobileOpen(false)}
                className="w-full bg-white text-[#0F0F0F] hover:bg-white/90 rounded-full text-[11px] tracking-[0.22em] uppercase font-semibold h-12"
              >
                Explore Collection
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
