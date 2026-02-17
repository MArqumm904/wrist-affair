"use client"

import { useState } from "react"
import HeroSlider from "./HeroSlider"

const brands = [
  { label: "H. Moser & Cie", value: "H. MOSER & CIE", href: "#moser" },
  { label: "Patek Philippe", value: "PATEK PHILIPPE", href: "#patek" },
  { label: "Rolex", value: "ROLEX", href: "#rolex" },
  { label: "Audemars Piguet", value: "AUDEMARS PIGUET", href: "#ap" },
]

export default function CategoryBar() {
  const [selected, setSelected] = useState("H. MOSER & CIE")

  const handleSelect = (value) => {
    setSelected(value)
  }

  return (
    <>
      <div className="bg-[#F3F1EA]/90 border-b border-[#E2DED5] lg:top-20 z-40 backdrop-blur-lg">
        <div className="max-w-[1600px] mx-auto">
          {/* Desktop View */}
          <div className="hidden sm:flex items-center justify-center gap-0 px-4 lg:px-8">
            {brands.map(({ label, value, href }) => {
              const isActive = selected === value
              return (
                <button
                  key={value}
                  onClick={() => handleSelect(value)}
                  className={`flex items-center justify-center px-8 lg:px-12 py-5 transition-all duration-300 border-b-2 shrink-0 group relative ${
                    isActive
                      ? "border-[#1A1A2E] text-[#1A1A2E]"
                      : "border-transparent text-[#1A1A2E]/40 hover:text-[#1A1A2E]/75 hover:border-[#1A1A2E]/20"
                  }`}
                >
                  <span className="text-[10px] tracking-[0.22em] uppercase font-semibold whitespace-nowrap">
                    {label}
                  </span>
                  
                  {/* Active indicator dot */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#1A1A2E] rounded-full" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Mobile View - 2x2 Grid */}
          <div className="sm:hidden grid grid-cols-2 gap-px bg-[#E2DED5] border-t border-[#E2DED5]">
            {brands.map(({ label, value, href }) => {
              const isActive = selected === value
              return (
                <button
                  key={value}
                  onClick={() => handleSelect(value)}
                  className={`flex flex-col items-center justify-center px-3 py-4 transition-all duration-300 bg-[#F3F1EA] relative ${
                    isActive
                      ? "text-[#1A1A2E]"
                      : "text-[#1A1A2E]/40 active:text-[#1A1A2E]/75"
                  }`}
                >
                  <span className="text-[8px] tracking-[0.18em] uppercase font-semibold text-center leading-tight">
                    {label}
                  </span>
                  
                  {/* Active border */}
                  {isActive && (
                    <>
                      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#1A1A2E]" />
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1A1A2E] rounded-full" />
                    </>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Hero Slider synced with selected brand */}
      <HeroSlider selectedBrand={selected} />
    </>
  )
}