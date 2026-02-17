"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Award, Globe } from "lucide-react"

const AboutSection = () => {
  return (
    <section className="relative bg-[#F3F1EA] py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Animated Logo */}
          <div className="relative flex items-center justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px]">
              
              {/* Outer rotating ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-[1.5px] border-[#1F1F1F]/15"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {/* Decorative lines on the ring */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-8 bg-[#1F1F1F]/20" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] h-8 bg-[#1F1F1F]/20" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-[1.5px] bg-[#1F1F1F]/20" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-[1.5px] bg-[#1F1F1F]/20" />
              </motion.div>

              {/* Middle rotating ring (opposite direction) */}
              <motion.div
                className="absolute inset-8 rounded-full border-[1.5px] border-[#1F1F1F]/12"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {/* Diagonal decorative lines */}
                <div className="absolute top-4 right-4 w-[1.5px] h-6 bg-[#1F1F1F]/15 rotate-45" />
                <div className="absolute bottom-4 left-4 w-[1.5px] h-6 bg-[#1F1F1F]/15 rotate-45" />
                <div className="absolute top-4 left-4 w-[1.5px] h-6 bg-[#1F1F1F]/15 -rotate-45" />
                <div className="absolute bottom-4 right-4 w-[1.5px] h-6 bg-[#1F1F1F]/15 -rotate-45" />
              </motion.div>

              {/* Inner rotating ring */}
              <motion.div
                className="absolute inset-16 rounded-full border-[1.5px] border-[#1F1F1F]/10"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {/* Small dots on inner ring */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1F1F1F]/25" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1F1F1F]/25" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#1F1F1F]/25" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#1F1F1F]/25" />
              </motion.div>

              {/* Center content with subtle pulse */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Main brand letters */}
                <div className="relative">
                  <motion.div
                    className="text-6xl sm:text-7xl lg:text-8xl font-bold text-[#1F1F1F] tracking-[0.1em]"
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    WA
                  </motion.div>
                  
                  {/* Decorative dot */}
                  <motion.div
                    className="absolute -top-2 -right-3 w-3 h-3 rounded-full bg-[#1F1F1F]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Small tagline below */}
                <div className="mt-3 text-[9px] tracking-[0.3em] uppercase text-[#1F1F1F]/40 font-semibold">
                  Since 2024
                </div>
              </motion.div>

              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-[#1F1F1F]/5 to-transparent blur-2xl" />
            </div>
          </div>

          {/* RIGHT: Content */}
          <motion.div
            className="space-y-6 lg:space-y-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1F1F1F]/10 bg-white/50">
              <Clock size={14} className="text-[#1F1F1F]/60" />
              <span className="text-[9px] tracking-[0.22em] uppercase font-semibold text-[#1F1F1F]/60">
                About Wrist Affair
              </span>
            </div>

            {/* Main heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-[#1F1F1F]">
              The laboratory of
              <br />
              horological art
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#1F1F1F]/70 max-w-2xl">
              Wrist Affair is the laboratory of horological art. We are more than a luxury watch boutique – we are a constantly developing and growing community of watch lovers and experts established in Dubai and operating all over the world.
            </p>

            {/* Feature list */}
            <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 pt-4">
              {[
                {
                  icon: Award,
                  title: "Curated Selection",
                  desc: "Handpicked timepieces from world's finest watchmakers"
                },
                {
                  icon: Globe,
                  title: "Global Presence",
                  desc: "Serving watch enthusiasts across the globe"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-lg bg-white/40 border border-[#E2DED5] hover:bg-white/60 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1F1F1F]/5 flex items-center justify-center">
                    <item.icon size={18} className="text-[#1F1F1F]/60" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1F1F1F] tracking-wide mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#1F1F1F]/60 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                className="group px-8 h-12 lg:h-14 text-[10px] tracking-[0.2em] uppercase font-semibold rounded-none border-2 bg-[#1F1F1F] text-white border-[#1F1F1F] hover:bg-transparent hover:text-[#1F1F1F] transition-all duration-300 cursor-pointer"
              >
                Discover Our Story
                <ArrowRight 
                  size={16} 
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1F1F1F]/3 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1F1F1F]/3 rounded-full blur-3xl -z-10" />
    </section>
  )
}

export default AboutSection