"use client";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { achievements } from "@/data";
import { cn } from "@/lib/utils";

export function Achievements() {
  return (
    <section id="achievements" className="section-padding bg-deep-black relative overflow-hidden">
      <div className="absolute inset-0 dot-grid-bg opacity-15" />
      <div className="aurora-blob w-80 h-80 bg-electric-blue/8 top-0 right-0 pointer-events-none" />
      <div className="aurora-blob w-72 h-72 bg-neon-pink/6 bottom-0 left-0 pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          label="Achievements"
          title="Milestones & Wins"
          accentWord="Milestones"
          subtitle="Every milestone represents a challenge conquered and a new level unlocked."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 relative z-10">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="glass-panel holo-shimmer p-8 md:p-10 group cursor-default relative overflow-hidden transition-all duration-400"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${achievement.color}44`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 50px ${achievement.color}22`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "";
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${achievement.color}, transparent)` }}
              />

              {/* Background hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${achievement.color}15 0%, transparent 70%)` }}
              />

              {/* Card content */}
              <div className="relative z-10 mb-6">
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-mono-custom border"
                  style={{
                    color: achievement.color,
                    borderColor: `${achievement.color}40`,
                    backgroundColor: `${achievement.color}10`,
                  }}
                >
                  {achievement.year}
                </div>
              </div>

              <motion.div
                className="text-5xl mb-5"
                whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                {achievement.icon}
              </motion.div>

              <h3 className="font-space font-bold text-white text-xl leading-tight mb-4">
                {achievement.title}
              </h3>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
