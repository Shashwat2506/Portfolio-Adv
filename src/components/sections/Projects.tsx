"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { GlowButton } from "@/components/ui/GlowButton";
import { projects } from "@/data";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-2xl w-full glass-panel-bright p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ borderColor: `${project.color}44` }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-mono-custom mb-3"
            style={{ color: project.color, backgroundColor: `${project.color}15`, border: `1px solid ${project.color}30` }}
          >
            {project.category}
          </div>
          <h3 className="font-space font-bold text-3xl text-white mb-2">{project.title}</h3>
          <p className="text-white/50 text-sm">{project.tagline}</p>
        </div>

        {/* Gradient divider */}
        <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${project.color}50, transparent)` }} />

        {/* Description */}
        <p className="text-white/70 mb-6 leading-relaxed">{project.longDescription}</p>

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-space font-semibold text-white text-sm mb-3 uppercase tracking-wider">Key Features</h4>
          <ul className="space-y-2">
            {project.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-white/60 text-sm">
                <ChevronRight className="w-3 h-3 shrink-0" style={{ color: project.color }} />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Challenges */}
        <div className="mb-6">
          <h4 className="font-space font-semibold text-white text-sm mb-3 uppercase tracking-wider">Engineering Challenges</h4>
          <ul className="space-y-2">
            {project.challenges.map((c, i) => (
              <li key={i} className="flex items-center gap-2 text-white/60 text-sm">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: project.accentColor }} />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div className="mb-6">
          <h4 className="font-space font-semibold text-white text-sm mb-3 uppercase tracking-wider">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs font-mono-custom border border-white/10 bg-white/5 text-white/60"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-3 flex-wrap">
          {project.liveUrl && (
            <GlowButton variant="primary" size="sm" href={project.liveUrl} icon={<ExternalLink className="w-4 h-4" />}>
              Live Demo
            </GlowButton>
          )}
          {project.githubUrl && (
            <GlowButton variant="ghost" size="sm" href={project.githubUrl} icon={<FaGithub className="w-4 h-4" />}>
              Source Code
            </GlowButton>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => setModalOpen(true)}
        className="glass-panel holo-shimmer cursor-pointer group relative overflow-hidden transition-all duration-500"
        style={{
          borderColor: hovered ? `${project.color}44` : undefined,
          boxShadow: hovered
            ? `0 20px 60px ${project.color}22, 0 0 0 1px ${project.color}22`
            : undefined,
        }}
        whileHover={{ y: -8 }}
      >
        {/* Background gradient on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top left, ${project.color}0d 0%, transparent 60%)`,
          }}
        />

        {/* Category badge + status */}
        <div className="relative z-10 p-8 sm:p-10">
          <div className="flex items-start justify-between mb-8">
            <div
              className="px-4 py-1.5 rounded-full text-xs font-mono-custom"
              style={{
                color: project.color,
                backgroundColor: `${project.color}15`,
                border: `1px solid ${project.color}30`,
              }}
            >
              {project.category}
            </div>
            {project.liveUrl && (
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: "#10b981" }}
                />
                <span className="text-emerald-400 text-xs">Live</span>
              </div>
            )}
          </div>

          {/* Gradient bar */}
          <div
            className="h-0.5 w-12 rounded mb-6 transition-all duration-500 group-hover:w-20"
            style={{ background: `linear-gradient(90deg, ${project.color}, ${project.accentColor})` }}
          />

          {/* Title & tagline */}
          <h3 className="font-space font-bold text-2xl text-white mb-3 group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="text-white/40 text-xs font-mono-custom mb-5">{project.tagline}</p>
          <p className="text-white/60 text-sm leading-relaxed mb-8">{project.description}</p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded text-xs border border-white/8 bg-white/5 text-white/50"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-3 py-1.5 rounded text-xs text-white/30">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* CTA row */}
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
              className="text-sm font-medium transition-all duration-300 hover:tracking-wide"
              style={{ color: project.color }}
            >
              View Details →
            </button>
            <div className="flex gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2.5 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2.5 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <ProjectModal project={project} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section-padding bg-midnight-blue relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="aurora-blob w-80 h-80 bg-royal-purple/8 top-0 right-0 pointer-events-none" />
      <div className="aurora-blob w-96 h-96 bg-electric-blue/5 bottom-0 left-0 pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          label="My Work"
          title="Featured Projects"
          accentWord="Projects"
          subtitle="Each project is a universe of its own — click any card to explore the full story."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 mb-16 relative z-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <GlowButton
            variant="ghost"
            size="lg"
            href="https://github.com/Shashwat2506"
            icon={<FaGithub className="w-5 h-5" />}
          >
            View All on GitHub
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
}
