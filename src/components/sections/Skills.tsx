"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { skills, skillCategories } from "@/data";
import type { Skill } from "@/types";
import { cn } from "@/lib/utils";

const tierColors: Record<Skill["tier"], string> = {
  Expert: "text-cyber-cyan border-cyber-cyan/40 bg-cyber-cyan/10",
  Proficient: "text-royal-purple border-royal-purple/40 bg-royal-purple/10",
  Learning: "text-neon-pink border-neon-pink/40 bg-neon-pink/10",
};

const tierGlow: Record<Skill["tier"], string> = {
  Expert: "hover:shadow-glow-cyan hover:border-cyber-cyan/50",
  Proficient: "hover:shadow-glow-purple hover:border-royal-purple/50",
  Learning: "hover:shadow-glow-pink hover:border-neon-pink/30",
};

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.08, y: -6 }}
      className={cn(
        "glass-panel p-5 sm:p-6 cursor-default transition-all duration-400 relative overflow-hidden",
        tierGlow[skill.tier]
      )}
    >
      {/* Hologram glow on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: skill.tier === "Expert"
                ? "radial-gradient(circle at center, rgba(0,212,255,0.12), transparent 70%)"
                : skill.tier === "Proficient"
                ? "radial-gradient(circle at center, rgba(123,47,255,0.12), transparent 70%)"
                : "radial-gradient(circle at center, rgba(255,45,155,0.12), transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Scan line on hover */}
      {hovered && <div className="scan-line" />}

      <div className="relative z-10 p-2 sm:p-3">
        <div className="text-3xl mb-4">{skill.icon}</div>
        <div className="font-space font-semibold text-white text-base mb-4 leading-tight">
          {skill.name}
        </div>
        <span className={cn(
          "inline-block px-3 py-1 rounded-full border text-xs font-mono-custom",
          tierColors[skill.tier]
        )}>
          {skill.tier}
        </span>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...skillCategories];

  const filtered = activeCategory === "All"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding bg-midnight-blue relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="aurora-blob w-96 h-96 bg-cyber-cyan/5 top-0 left-0 pointer-events-none" />
      <div className="aurora-blob w-72 h-72 bg-neon-pink/5 bottom-0 right-0 pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          label="Technical Skills"
          title="AI Skill Matrix"
          accentWord="Skill"
          subtitle="An interactive holographic matrix of my technical capabilities across 7 domains."
        />

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 border",
                activeCategory === cat
                  ? "bg-gradient-to-r from-electric-blue to-cyber-cyan text-white border-transparent shadow-glow-cyan"
                  : "border-white/10 text-white/50 hover:border-white/20 hover:text-white bg-white/5"
              )}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-8 mb-16">
          {(["Expert", "Proficient", "Learning"] as const).map((tier) => (
            <div key={tier} className={cn("flex items-center gap-2 text-xs font-mono-custom border rounded-full px-4 py-1.5", tierColors[tier])}>
              <span className="w-2 h-2 rounded-full bg-current" />
              {tier}
            </div>
          ))}
        </div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 md:gap-7"
          >
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Neural connection hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 text-center text-white/25 text-xs font-mono-custom"
        >
          ◈ Hover over any skill to activate holographic mode ◈
        </motion.div>
      </div>
    </section>
  );
}
