"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { leadershipRoles } from "@/data";
import { cn } from "@/lib/utils";

function AnimatedCounter({ value, color }: { value: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="font-space font-bold text-2xl"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{ color }}
    >
      {value}
    </motion.div>
  );
}

export function Leadership() {
  return (
    <section id="leadership" className="section-padding bg-midnight-blue relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="aurora-blob w-96 h-96 bg-royal-purple/8 top-0 left-0 pointer-events-none" />
      <div className="aurora-blob w-64 h-64 bg-neon-pink/5 bottom-0 right-0 pointer-events-none" style={{ animationDelay: "2s" }} />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          label="Leadership"
          title="Command Center"
          accentWord="Center"
          subtitle="Futuristic command terminals for every organization I've led or contributed to."
        />

        {/* Command center grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
          {leadershipRoles.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -6 }}
              className={cn(
                "glass-panel p-8 md:p-10 relative overflow-hidden group cursor-default transition-all duration-400",
                "hover:border-opacity-50"
              )}
              style={{
                borderColor: `${role.color}22`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${role.color}55`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${role.color}22`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${role.color}22`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = "";
              }}
            >
              {/* Background gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top left, ${role.color}0a 0%, transparent 70%)`,
                }}
              />

              {/* Scan line effect */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-40 group-hover:opacity-80 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${role.color}, transparent)` }}
              />

              {/* Terminal header */}
              <div className="relative z-10 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: role.color }} />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                </div>
                <span className="text-xs font-mono-custom text-white/20">terminal://</span>
              </div>

              {/* Icon & org name */}
              <div className="relative z-10 mb-5">
                <span className="text-3xl">{role.icon}</span>
                <h3 className="font-space font-bold text-white mt-4 text-xl leading-tight">{role.org}</h3>
                <p className="text-xs font-mono-custom mt-1" style={{ color: role.color }}>{role.role}</p>
                <p className="text-white/25 text-xs mt-1">{role.period}</p>
              </div>

              {/* Description */}
              <p className="relative z-10 text-white/50 text-sm leading-relaxed mb-6">{role.description}</p>

              {/* Stats row */}
              <div className="relative z-10 border-t border-white/5 pt-6 grid grid-cols-3 gap-4">
                {role.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <AnimatedCounter value={stat.value} color={role.color} />
                    <div className="text-white/30 text-xs mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
