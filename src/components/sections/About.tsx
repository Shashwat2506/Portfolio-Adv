"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { timelineStages, stats } from "@/data";
import { cn } from "@/lib/utils";

function StatCounter({ value, suffix, label }: { value: string; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "backOut" }}
      className="glass-panel p-8 text-center group hover:border-cyber-cyan/30 transition-all duration-300"
    >
      <motion.div
        className="font-space font-bold text-3xl md:text-4xl gradient-text mb-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {value}{suffix}
      </motion.div>
      <div className="text-white/40 text-sm">{label}</div>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="section-padding bg-deep-black relative overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 dot-grid-bg opacity-20" />

      {/* Aurora */}
      <div className="aurora-blob w-80 h-80 bg-royal-purple/8 top-0 right-0 pointer-events-none" />
      <div className="aurora-blob w-64 h-64 bg-electric-blue/6 bottom-0 left-0 pointer-events-none" style={{ animationDelay: "4s" }} />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          label="About Me"
          title="My Journey So Far"
          accentWord="Journey"
          subtitle="From curious student to full-stack developer — every step has been a new universe to explore."
        />

        {/* Timeline */}
        <div className="relative mt-14">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-cyan/50 via-royal-purple/40 to-transparent transform -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {timelineStages.map((stage, i) => {
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={cn(
                    "relative flex items-center justify-between md:justify-normal w-full mb-12 md:mb-16",
                    i % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  )}
                >
                  {/* Card */}
                  <div className="flex-1 md:max-w-[calc(50%-3rem)]">
                    <div className="glass-panel p-8 md:p-10 holo-shimmer group hover:border-cyber-cyan/30 transition-all duration-500 cursor-default">
                      <div className="flex items-start gap-5">
                        <span className="text-4xl shrink-0 group-hover:scale-125 transition-transform duration-300">
                          {stage.icon}
                        </span>
                        <div>
                          <div className="font-space font-bold text-white text-xl mb-2">
                            {stage.stage}
                          </div>
                          <div className="text-cyber-cyan text-xs font-mono-custom mb-3">{stage.year}</div>
                          <p className="text-white/50 text-sm leading-relaxed">{stage.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="relative hidden md:flex items-center justify-center w-12 h-12 shrink-0">
                    <div className="w-4 h-4 rounded-full bg-cyber-cyan shadow-glow-cyan" />
                    <div className="absolute w-8 h-8 rounded-full border border-cyber-cyan/30 animate-ping-slow" />
                  </div>

                  {/* Empty space for other side */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-space text-2xl font-bold text-white text-center mb-8"
          >
            By The{" "}
            <span className="gradient-text">Numbers</span>
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>

        {/* CS Student badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 glass-panel-bright p-8 md:p-10 text-center"
        >
          <div className="text-5xl mb-6">🎓</div>
          <h3 className="font-space font-bold text-2xl text-white mb-3">
            B.Tech in Computer Science & Engineering
          </h3>
          <p className="text-cyber-cyan font-mono-custom text-sm mb-2">MIT World Peace University, Pune</p>
          <p className="text-white/40 text-sm">July 2024 – May 2028 · CGPA: <span className="text-white font-bold">9.52/10</span></p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["Data Structures & Algorithms", "Operating Systems", "Computer Networks", "DBMS", "OOP", "AI & ML", "Cloud Computing", "IoT"].map((course) => (
              <span
                key={course}
                className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs"
              >
                {course}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
