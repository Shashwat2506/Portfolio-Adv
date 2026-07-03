"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { certifications } from "@/data";
import type { Certification } from "@/types";
import { cn } from "@/lib/utils";

function CertModal({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, rotateX: -20, opacity: 0 }}
        animate={{ scale: 1, rotateX: 0, opacity: 1 }}
        exit={{ scale: 0.8, rotateX: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-md w-full glass-panel-bright p-10"
        style={{
          borderColor: `${cert.color}44`,
          boxShadow: `0 30px 80px ${cert.color}33`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-lg border border-white/10 text-white/50 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Holographic header bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
        />

        <div className="text-5xl mb-6">🎓</div>
        <h3 className="font-space font-bold text-2xl text-white mb-2">{cert.title}</h3>
        <p className="text-sm mb-6" style={{ color: cert.color }}>{cert.issuer}</p>

        <div className="flex items-center gap-6 text-xs text-white/40 mb-8">
          <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {cert.duration}</span>
          <span className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5" /> Verified</span>
        </div>

        <p className="text-white/60 text-sm leading-relaxed mb-8">{cert.description}</p>

        <div className="border-t border-white/5 pt-6">
          <p className="text-xs font-space font-semibold text-white/60 uppercase tracking-wider mb-4">Skills Acquired</p>
          <div className="flex flex-wrap gap-3">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-1.5 rounded-full text-xs font-mono-custom border"
                style={{ color: cert.color, borderColor: `${cert.color}40`, backgroundColor: `${cert.color}10` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30, rotateY: -15 }}
        whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => setOpen(true)}
        whileHover={{ y: -8, rotateY: 5 }}
        className="glass-panel holo-shimmer cursor-pointer group relative overflow-hidden"
        style={{
          borderColor: hovered ? `${cert.color}44` : undefined,
          boxShadow: hovered ? `0 20px 50px ${cert.color}22` : undefined,
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Top gradient line */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
            opacity: hovered ? 1 : 0.4,
          }}
        />

        {/* Floating hologram icon */}
        <motion.div
          animate={hovered ? { y: -6, rotate: 10 } : { y: 0, rotate: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-60 transition-opacity"
        >
          📜
        </motion.div>

        <div className="p-8 md:p-10">
          {/* Duration chip */}
          <div className="mb-6">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-custom border"
              style={{ color: cert.color, borderColor: `${cert.color}40`, backgroundColor: `${cert.color}10` }}
            >
              <Clock className="w-3 h-3" />
              {cert.duration}
            </span>
          </div>

          <h3 className="font-space font-bold text-white text-xl leading-tight mb-3">
            {cert.title}
          </h3>
          <p className="text-sm mb-4" style={{ color: cert.color }}>{cert.issuer}</p>
          <p className="text-white/50 text-sm leading-relaxed mb-6">{cert.description}</p>

          {/* Skills preview */}
          <div className="flex flex-wrap gap-2">
            {cert.skills.slice(0, 3).map((s) => (
              <span key={s} className="px-3 py-1 rounded text-xs border border-white/8 bg-white/5 text-white/40">
                {s}
              </span>
            ))}
          </div>

          {/* Hover reveal */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            className="mt-6 text-xs font-mono-custom"
            style={{ color: cert.color }}
          >
            ◈ Click to view holographic certificate →
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && <CertModal cert={cert} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="section-padding bg-midnight-blue relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="aurora-blob w-96 h-96 bg-electric-blue/6 top-0 right-0 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          label="Certifications"
          title="Holographic Certificates"
          accentWord="Holographic"
          subtitle="Verified credentials representing months of focused learning and skill development."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 relative z-10">
          {certifications.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
