"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { experiences } from "@/data";
import type { Experience } from "@/types";
import { cn } from "@/lib/utils";

const typeIcons: Record<Experience["type"], string> = {
  leadership: "👑",
  hackathon: "⚡",
  internship: "💼",
  event: "🎤",
};

function ExperienceModal({ exp, onClose }: { exp: Experience; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-lg w-full glass-panel-bright p-8"
        style={{ borderColor: `${exp.color}44` }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg border border-white/10 text-white/50 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="text-4xl mb-4">{typeIcons[exp.type]}</div>
        <h3 className="font-space font-bold text-2xl text-white mb-1">{exp.title}</h3>
        <p className="font-medium text-sm mb-4" style={{ color: exp.color }}>{exp.org}</p>
        <div className="flex flex-wrap gap-4 mb-6 text-white/40 text-xs">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{exp.period}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.location}</span>
        </div>
        <ul className="space-y-3">
          {exp.description.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: exp.color }} />
              {point}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

function PlanetCard({ exp, index }: { exp: Experience; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: index * 0.15, type: "spring", stiffness: 150, damping: 20 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => setOpen(true)}
        className="flex flex-col items-center gap-4 cursor-pointer group"
      >
        {/* Planet */}
        <motion.div
          animate={{
            y: hovered ? -12 : [0, -8, 0],
            scale: hovered ? 1.1 : 1,
          }}
          transition={hovered
            ? { duration: 0.3 }
            : { duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut" }
          }
          className="relative"
        >
          <div
            className="w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center relative overflow-hidden"
            style={{
              background: `radial-gradient(circle at 35% 30%, ${exp.color}66 0%, ${exp.color}22 50%, rgba(0,0,0,0.6) 100%)`,
              border: `2px solid ${exp.color}44`,
              boxShadow: hovered
                ? `0 0 50px ${exp.color}66, 0 0 100px ${exp.color}22`
                : `0 0 30px ${exp.color}33`,
            }}
          >
            {/* Surface texture rings */}
            <div
              className="absolute inset-3 rounded-full opacity-20"
              style={{ border: `1px solid ${exp.color}` }}
            />
            <div
              className="absolute inset-6 rounded-full opacity-10"
              style={{ border: `1px solid ${exp.color}` }}
            />

            {/* Highlight */}
            <div
              className="absolute top-3 left-4 w-8 h-5 rounded-full opacity-30"
              style={{ background: "radial-gradient(circle, white, transparent)" }}
            />

            <span className="text-3xl relative z-10">{typeIcons[exp.type]}</span>
          </div>

          {/* Orbit ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8 + index * 2, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 rounded-full"
            style={{
              border: `1px dashed ${exp.color}25`,
              transform: "rotateX(60deg)",
            }}
          />
        </motion.div>

        {/* Label */}
        <div className="text-center mt-4">
          <div className="font-space font-semibold text-white text-base group-hover:text-white/90 transition-colors">
            {exp.org}
          </div>
          <div className="text-sm mt-1.5" style={{ color: exp.color }}>
            {exp.title.split(",")[0]}
          </div>
          <div className="text-xs text-white/25 mt-1.5 font-mono-custom">{exp.period}</div>
          <div
            className="mt-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ color: exp.color }}
          >
            Click to explore →
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && <ExperienceModal exp={exp} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section-padding bg-deep-black relative overflow-hidden">
      {/* Deep space background */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,30,0.8), #050505)",
      }} />

      {/* Stars */}
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 0.5 + "px",
            height: Math.random() * 2 + 0.5 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            opacity: Math.random() * 0.6 + 0.1,
            animation: `glow-pulse ${2 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: Math.random() * 4 + "s",
          }}
        />
      ))}

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          label="Experience"
          title="My Experience Galaxy"
          accentWord="Experience"
          subtitle="Each experience is a world of its own. Click any planet to explore."
        />

        {/* Galaxy layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-14 justify-items-center mt-14">
          {experiences.map((exp, i) => (
            <PlanetCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>

        {/* Galaxy hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 text-center"
        >
          <p className="text-white/20 text-xs font-mono-custom">
            ◈ Each planet represents a chapter of my journey ◈
          </p>
        </motion.div>
      </div>
    </section>
  );
}
