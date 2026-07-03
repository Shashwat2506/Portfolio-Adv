"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  gradient?: boolean;
  stagger?: number;
}

// Word-by-word animation
export function AnimatedWords({ text, className, once = true, delay = 0, gradient = false, stagger = 0.06 }: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <span className={cn("inline-flex flex-wrap gap-x-[0.3em]", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={cn("inline-block", gradient && "gradient-text")}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once }}
          transition={{
            duration: 0.7,
            delay: delay + i * stagger,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Character-by-character animation
export function AnimatedChars({ text, className, once = true, delay = 0, stagger = 0.03 }: AnimatedTextProps) {
  const chars = text.split("");

  return (
    <span className={cn("inline-flex", className)}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once }}
          transition={{
            duration: 0.4,
            delay: delay + i * stagger,
            ease: "easeOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

// Section heading with gradient accent
interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  accentWord?: string;
  className?: string;
}

export function SectionHeading({ label, title, subtitle, accentWord, className }: SectionHeadingProps) {
  const titleParts = accentWord ? title.split(accentWord) : [title];

  return (
    <div className={cn("text-center space-y-5 mb-14 md:mb-18", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan text-xs font-mono-custom uppercase tracking-widest"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
        {label}
      </motion.div>

      <h2 className="font-space text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
        {accentWord ? (
          <>
            <AnimatedWords text={titleParts[0]} />
            <span className="gradient-text"> {accentWord} </span>
            <AnimatedWords text={titleParts[1] || ""} />
          </>
        ) : (
          <AnimatedWords text={title} />
        )}
      </h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
