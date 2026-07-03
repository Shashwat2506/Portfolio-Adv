"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { techStack } from "@/data";
import { cn } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  lang: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  db: "Database",
  cloud: "Cloud",
  tools: "Dev Tools",
  hardware: "Hardware",
  ai: "AI / ML",
};

function TechSphere({ tech, index }: { tech: typeof techStack[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.035,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.15, y: -10, rotate: 5 }}
      className="relative flex flex-col items-center gap-3 cursor-default group"
    >
      {/* Sphere */}
      <div
        className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-400"
        style={{
          background: hovered
            ? `radial-gradient(circle at 35% 35%, ${tech.color}44, ${tech.color}11 60%, rgba(0,0,0,0.8))`
            : "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.08), rgba(0,0,0,0.5))",
          border: `1px solid ${hovered ? tech.color + "66" : "rgba(255,255,255,0.08)"}`,
          boxShadow: hovered
            ? `0 0 30px ${tech.color}55, 0 0 60px ${tech.color}22, inset 0 1px 0 rgba(255,255,255,0.15)`
            : "0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Highlight */}
        <div
          className="absolute top-2 left-2.5 w-4 h-3 rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.8), transparent)" }}
        />

        {/* Tech text/emoji */}
        <span
          className="relative z-10 text-sm font-space font-bold"
          style={{ color: hovered ? tech.color : "rgba(255,255,255,0.7)" }}
        >
          {tech.icon}
        </span>

        {/* Orbit ring on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4, rotate: { duration: 3, repeat: Infinity, ease: "linear" } }}
              className="absolute -inset-2 rounded-full"
              style={{
                border: `1px dashed ${tech.color}44`,
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Label */}
      <motion.span
        className="text-xs text-white/50 group-hover:text-white/90 transition-colors duration-300 text-center font-space leading-tight"
        style={{ color: hovered ? tech.color : undefined }}
      >
        {tech.name}
      </motion.span>
    </motion.div>
  );
}

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState("all");
  const categories = [{ key: "all", label: "All" }, ...Object.entries(categoryLabels).map(([key, label]) => ({ key, label }))];

  const filtered = activeCategory === "all"
    ? techStack
    : techStack.filter((t) => t.category === activeCategory);

  return (
    <section id="techstack" className="section-padding bg-deep-black relative overflow-hidden">
      <div className="absolute inset-0 dot-grid-bg opacity-15" />
      <div className="aurora-blob w-96 h-96 bg-electric-blue/6 top-1/4 left-0 pointer-events-none" />
      <div className="aurora-blob w-72 h-72 bg-royal-purple/6 bottom-0 right-0 pointer-events-none" style={{ animationDelay: "2s" }} />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          label="Technologies"
          title="My Tech Universe"
          accentWord="Tech"
          subtitle="30+ technologies I work with — from web to cloud to embedded systems."
        />

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={cn(
                "px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 border",
                activeCategory === key
                  ? "bg-cyber-cyan/15 border-cyber-cyan/40 text-cyber-cyan"
                  : "border-white/8 text-white/40 hover:text-white/70 hover:border-white/15"
              )}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Tech grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6 md:gap-8 justify-items-center"
          >
            {filtered.map((tech, i) => (
              <TechSphere key={tech.name} tech={tech} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
