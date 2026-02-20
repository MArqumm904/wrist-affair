"use client";

import { notFound } from "next/navigation";
import { use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MessageCircle,
  Shield,
  Award,
  Tag,
  Sparkles,
  ChevronRight,
  Clock,
  CheckCircle2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import prod1 from "@/assets/products/prod-1.png";
import prod2 from "@/assets/products/prod-2.png";
import prod3 from "@/assets/products/prod-3.png";
import prod4 from "@/assets/products/prod-4.png";
import prod5 from "@/assets/products/prod-5.png";
import prod6 from "@/assets/products/prod-6.png";
import prod7 from "@/assets/products/prod-7.png";
import prod8 from "@/assets/products/prod-8.png";
import prod9 from "@/assets/products/prod-9.png";

// ─── PRODUCTS DATA ─────────────────────────────────────────────────────────────
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
    year: "2022",
    caseMaterial: "Oystersteel",
    caseDiameter: "40mm",
    movement: "Automatic, Calibre 3285",
    waterResistance: "100m / 330ft",
    bracelet: "Jubilee, Oystersteel",
    condition: "Mint — Unworn, complete set",
    features: [
      "Black/Blue Cerachrom bezel insert",
      "Jubilee bracelet with Oysterlock clasp",
      "Calibre 3285 movement",
      "GMT hand for second time zone",
      "Complete box and papers",
    ],
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
    year: "2023",
    caseMaterial: "Stainless Steel",
    caseDiameter: "42mm",
    movement: "Automatic, Calibre 17",
    waterResistance: "200m / 660ft",
    bracelet: "Stainless Steel Mesh",
    condition: "Brand New — Full set",
    features: [
      "Blue dial with vintage-inspired design",
      "Unidirectional rotating bezel",
      "Luminescent hands and indices",
      "Steel mesh bracelet",
      "Full manufacturer warranty",
    ],
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
    year: "2021",
    caseMaterial: "Stainless Steel",
    caseDiameter: "42mm",
    movement: "Manual, Calibre 3861",
    waterResistance: "50m / 165ft",
    bracelet: "Stainless Steel Bracelet",
    condition: "Perfect — Excellent condition",
    features: [
      "Hesalite crystal (NASA specification)",
      "Co-Axial Master Chronometer",
      "Moon phase complication",
      "Tachymeter scale bezel",
      "Box and papers included",
    ],
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
    year: "2023",
    caseMaterial: "Stainless Steel",
    caseDiameter: "40.5mm",
    movement: "Automatic, Calibre 324 S QA LU 24H",
    waterResistance: "60m / 200ft",
    bracelet: "Integrated Steel Bracelet",
    condition: "Brand New — Sealed",
    features: [
      "Annual calendar complication",
      "Moon phase display",
      "Integrated Nautilus bracelet",
      "Blue gradient dial",
      "Patek Philippe Seal certified",
    ],
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
    year: "2022",
    caseMaterial: "Stainless Steel",
    caseDiameter: "41mm",
    movement: "Automatic, Calibre 4302",
    waterResistance: "50m / 165ft",
    bracelet: "Integrated Steel Bracelet",
    condition: "Mint — Lightly worn",
    features: [
      "Iconic octagonal bezel with 8 screws",
      "Grande Tapisserie dial pattern",
      "Integrated steel bracelet",
      "Calibre 4302 automatic movement",
      "Box and papers",
    ],
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
    year: "2023",
    caseMaterial: "Stainless Steel",
    caseDiameter: "40mm",
    movement: "Automatic, HMC 200",
    waterResistance: "30m / 100ft",
    bracelet: "Alligator Leather Strap",
    condition: "Brand New — Full set",
    features: [
      "Fumé dial that evolves with light",
      "In-house HMC 200 movement",
      "No date for clean aesthetic",
      "Moser's signature hands",
      "Full manufacturer warranty",
    ],
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
    year: "2020",
    caseMaterial: "Steel with ADLC coating",
    caseDiameter: "39.8mm",
    movement: "Automatic, Calibre 1847 MC",
    waterResistance: "100m / 330ft",
    bracelet: "Steel & Black Rubber Interchangeable",
    condition: "Used — Very good condition",
    features: [
      "ADLC-coated steel case",
      "Quick-strap interchangeable system",
      "Square Roman numeral dial",
      "Iconic exposed screws on bezel",
      "Original bracelet included",
    ],
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
    year: "2021",
    caseMaterial: "Stainless Steel",
    caseDiameter: "42mm",
    movement: "Manual, Calibre 78230",
    waterResistance: "30m / 100ft",
    bracelet: "Alligator Leather Strap",
    condition: "Mint — Excellent condition",
    features: [
      "Railway-track minute scale",
      "Flyback chronograph function",
      "In-house Calibre 78230",
      "Rhodium-plated subsidiary dials",
      "Box and papers",
    ],
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
    year: "2023",
    caseMaterial: "Stainless Steel",
    caseDiameter: "41mm",
    movement: "Automatic, Calibre 5110 DT",
    waterResistance: "150m / 500ft",
    bracelet: "Interchangeable Steel / Rubber / Leather",
    condition: "Brand New — Complete set",
    features: [
      "Dual time zone display",
      "Day/night indicator",
      "Interchangeable strap system",
      "Maltese cross motif",
      "Full warranty and accessories",
    ],
  },
];

// ─── BADGE CONFIG ──────────────────────────────────────────────────────────────
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
};

// ─── SPEC ROW ─────────────────────────────────────────────────────────────────
function SpecRow({ label, value }) {
  return (
    <div className="flex items-start justify-between py-3.5 border-b border-[#E5E2D9] last:border-0 gap-4">
      <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#1F1F1F]/40 shrink-0 pt-0.5">
        {label}
      </span>
      <span className="text-[13px] text-[#1F1F1F] font-medium text-right leading-snug">
        {value}
      </span>
    </div>
  );
}

// ─── WHATSAPP BUTTON ──────────────────────────────────────────────────────────
function WhatsAppButton({ product }) {
  const message = encodeURIComponent(
    `Hi! I'm interested in the ${product.brand} – ${product.title} (${product.ref}) listed at ${product.price}. Could you please provide more details?`,
  );
  const href = `https://wa.me/923001234567?text=${message}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
      <Button
        size="lg"
        className="w-full h-14 rounded-none border-2 bg-[#1F1F1F] text-white border-[#1F1F1F] hover:bg-transparent hover:text-[#1F1F1F] text-[11px] tracking-[0.2em] uppercase font-semibold gap-3 transition-all duration-300 cursor-pointer group"
      >
        <MessageCircle
          size={18}
          className="group-hover:scale-110 group-hover:text-[#1F1F1F] transition-all duration-200"
        />
        Enquire on WhatsApp
      </Button>
    </Link>
  );
}

// ─── RELATED CARD ─────────────────────────────────────────────────────────────
function RelatedCard({ product }) {
  const badge = badgeConfig[product.type] || badgeConfig.used;
  const BadgeIcon = badge.icon;

  return (
    <Link href={`/products/${product.id}`}>
      <motion.article
        className="group bg-white border border-[#E5E2D9] overflow-hidden cursor-pointer"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="relative bg-[#F3F1EA] aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={`${product.brand} – ${product.title}`}
            fill
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2">
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 text-[7px] tracking-[0.15em] uppercase font-semibold border ${badge.className}`}
            >
              <BadgeIcon size={7} />
              {badge.label}
            </span>
          </div>
        </div>
        <div className="p-4 border-t border-[#E5E2D9]">
          <p className="text-[8px] tracking-[0.22em] uppercase font-semibold text-[#1F1F1F]/40 mb-1">
            {product.brand}
          </p>
          <h4 className="text-xs font-bold text-[#1F1F1F] line-clamp-2 leading-snug mb-2">
            {product.title}
          </h4>
          <p className="text-sm font-bold text-[#1F1F1F]">{product.price}</p>
        </div>
      </motion.article>
    </Link>
  );
}

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────
export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // Change to 'smooth' if you want a smooth scroll effect
    });
  });

  const badge = badgeConfig[product.type] || badgeConfig.used;
  const BadgeIcon = badge.icon;
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F3F1EA]">
      {/* ── Breadcrumb ── */}
      <div className="border-b border-[#E5E2D9] bg-[#F3F1EA]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-medium text-[#1F1F1F]/40">
            <Link
              href="/"
              className="hover:text-[#1F1F1F] transition-colors duration-200"
            >
              Home
            </Link>
            <ChevronRight size={10} />
            <Link
              href="/#products"
              className="hover:text-[#1F1F1F] transition-colors duration-200"
            >
              Products
            </Link>
            <ChevronRight size={10} />
            <span className="text-[#1F1F1F]/70 truncate max-w-[200px]">
              {product.brand}
            </span>
          </nav>
        </div>
      </div>

      {/* ── Back button ── */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <Link href="/#products">
          <motion.div
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#1F1F1F]/50 hover:text-[#1F1F1F] transition-colors duration-200 group"
            whileHover={{ x: -3 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft
              size={13}
              className="group-hover:-translate-x-1 transition-transform duration-200"
            />
            Back to Collection
          </motion.div>
        </Link>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24">
          {/* ── LEFT: Image Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative border border-[#E5E2D9] overflow-hidden aspect-square">
              {/* Decorative rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[70%] h-[70%] rounded-full border border-[#1F1F1F]/5" />
                <div className="absolute w-[50%] h-[50%] rounded-full border border-[#1F1F1F]/5" />
              </div>

              {/* Background monogram */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[12rem] font-bold text-[#1F1F1F]/[0.025] tracking-widest select-none">
                  {product.brand
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="relative z-10 w-full h-full"
              >
                <Image
                  src={product.image}
                  alt={`${product.brand} – ${product.title}`}
                  fill
                  className="object-contain p-10 sm:p-14 lg:p-16 drop-shadow-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Badge overlay */}
              <div className="absolute top-4 left-4 z-20">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[9px] tracking-[0.18em] uppercase font-semibold border ${badge.className}`}
                >
                  <BadgeIcon size={9} />
                  {badge.label}
                </span>
              </div>

              {/* REF overlay */}
              <div className="absolute bottom-4 right-4 z-20">
                <span className="text-[9px] tracking-[0.2em] uppercase font-medium text-[#1F1F1F]/30">
                  {product.ref}
                </span>
              </div>
            </div>

            {/* Trust badges below image */}
            <div className="grid grid-cols-3 gap-px mt-px border border-[#E5E2D9] bg-[#E5E2D9]">
              {[
                { icon: Shield, label: "Authenticity Guaranteed" },
                { icon: CheckCircle2, label: "14-Day Returns" },
                { icon: Star, label: "Certified Experts" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="bg-white flex flex-col items-center gap-1.5 py-4 px-2 text-center"
                >
                  <Icon size={14} className="text-[#1F1F1F]/40" />
                  <span className="text-[8px] tracking-[0.12em] uppercase font-semibold text-[#1F1F1F]/40 leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Details Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex flex-col"
          >
            {/* Brand */}
            <p className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#1F1F1F]/40 mb-3">
              {product.brand}
            </p>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-[#1F1F1F] mb-5">
              {product.title}
            </h1>

            {/* Divider with year */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] flex-1 bg-[#E5E2D9]" />
              <div className="flex items-center gap-1.5 text-[#1F1F1F]/35">
                <Clock size={11} />
                <span className="text-[9px] tracking-[0.2em] uppercase font-semibold">
                  {product.year}
                </span>
              </div>
              <div className="h-[1px] flex-1 bg-[#E5E2D9]" />
            </div>

            {/* Description */}
            <p className="text-sm sm:text-[15px] text-[#1F1F1F]/60 leading-relaxed mb-8">
              {product.desc}
            </p>

            {/* Condition */}
            <div className="flex items-start gap-3 p-4 bg-white border border-[#E5E2D9] mb-8">
              <CheckCircle2
                size={15}
                className="text-[#1F1F1F]/50 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase font-semibold text-[#1F1F1F]/40 mb-0.5">
                  Condition
                </p>
                <p className="text-[13px] font-semibold text-[#1F1F1F]">
                  {product.condition}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <p className="text-[9px] tracking-[0.2em] uppercase font-semibold text-[#1F1F1F]/40 mb-1">
                Price
              </p>
              <p className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1F1F1F]">
                {product.price}
              </p>
            </div>

            {/* WhatsApp CTA */}
            <div className="mb-8 space-y-3">
              <WhatsAppButton product={product} />
              <p className="text-center text-[9px] tracking-[0.15em] uppercase text-[#1F1F1F]/30 font-medium">
                Click to open WhatsApp conversation
              </p>
            </div>

            <Separator className="bg-[#E5E2D9] mb-8" />

            {/* Specifications */}
            <div className="mb-8">
              <h2 className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#1F1F1F]/40 mb-4">
                Specifications
              </h2>
              <div className="bg-white border border-[#E5E2D9] px-5">
                <SpecRow label="Reference" value={product.ref} />
                <SpecRow label="Year" value={product.year} />
                <SpecRow label="Case Material" value={product.caseMaterial} />
                <SpecRow label="Case Diameter" value={product.caseDiameter} />
                <SpecRow label="Movement" value={product.movement} />
                <SpecRow
                  label="Water Resistance"
                  value={product.waterResistance}
                />
                <SpecRow label="Bracelet / Strap" value={product.bracelet} />
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#1F1F1F]/40 mb-4">
                What's Included
              </h2>
              <ul className="space-y-2.5">
                {product.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
                  >
                    <div className="w-1 h-1 rounded-full bg-[#1F1F1F]/40 mt-2 shrink-0" />
                    <span className="text-[13px] text-[#1F1F1F]/65 leading-relaxed">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── RELATED WATCHES ── */}
      <section className="border-t border-[#E5E2D9] mt-8 sm:mt-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase font-semibold text-[#1F1F1F]/40 mb-3">
                You Might Also Like
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1F1F1F]">
                Related Pieces
              </h2>
            </div>
            <Link
              href="/#products"
              className="hidden sm:inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#1F1F1F]/50 hover:text-[#1F1F1F] transition-colors duration-200 border-b border-[#1F1F1F]/20 hover:border-[#1F1F1F] pb-0.5"
            >
              View All
              <ChevronRight size={11} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E5E2D9]">
            {related.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <RelatedCard product={p} />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 sm:hidden text-center">
            <Link href="/#products">
              <Button
                variant="outline"
                className="border-2 border-[#1F1F1F] text-[#1F1F1F] rounded-none text-[10px] tracking-[0.2em] uppercase font-semibold h-12 px-8 hover:bg-[#1F1F1F] hover:text-white transition-all duration-300"
              >
                View Full Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
