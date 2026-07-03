"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "purple" | "blue" | "pink" | "none";
  animate?: boolean;
  hover?: boolean;
  neonBorder?: boolean;
  onClick?: () => void;
}

const glowMap = {
  cyan: "hover:shadow-glow-cyan hover:border-cyber-cyan/40",
  purple: "hover:shadow-glow-purple hover:border-royal-purple/40",
  blue: "hover:shadow-glow-blue hover:border-electric-blue/40",
  pink: "hover:shadow-glow-pink hover:border-neon-pink/40",
  none: "",
};

export function GlassCard({
  children,
  className,
  glowColor = "cyan",
  animate = true,
  hover = true,
  neonBorder = false,
  onClick,
}: GlassCardProps) {
  const Component = animate ? motion.div : "div";

  return (
    <Component
      className={cn(
        "glass-panel holo-shimmer transition-all duration-500",
        hover && "cursor-pointer",
        hover && glowMap[glowColor],
        neonBorder && "neon-border",
        className
      )}
      onClick={onClick}
      {...(animate
        ? {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-50px" },
            transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
            whileHover: hover ? { y: -4, scale: 1.01 } : undefined,
          }
        : {})}
    >
      {children}
    </Component>
  );
}
