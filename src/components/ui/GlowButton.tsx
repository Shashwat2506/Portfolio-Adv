"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  download?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const variantStyles = {
  primary:
    "bg-gradient-to-r from-electric-blue to-cyber-cyan text-white shadow-glow-cyan hover:shadow-glow-cyan border border-cyber-cyan/30",
  secondary:
    "bg-transparent border border-royal-purple/60 text-royal-purple hover:bg-royal-purple/10 hover:border-royal-purple hover:shadow-glow-purple",
  ghost:
    "bg-glass-white border border-glass-border text-white/80 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm",
  danger:
    "bg-gradient-to-r from-neon-pink to-royal-purple text-white shadow-glow-pink border border-neon-pink/30",
};

const sizeStyles = {
  sm: "px-5 py-2.5 text-sm gap-2",
  md: "px-8 py-3 text-sm gap-2.5",
  lg: "px-10 py-3.5 text-base gap-3",
};

export function GlowButton({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
  href,
  download,
  disabled,
  type = "button",
  icon,
  iconPosition = "left",
}: GlowButtonProps) {
  const classes = cn(
    "btn-glow relative inline-flex items-center justify-center rounded-full font-medium font-space transition-all duration-300 select-none whitespace-nowrap leading-none",
    "focus:outline-none focus:ring-2 focus:ring-cyber-cyan/50",
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        target={download ? undefined : "_blank"}
        rel="noopener noreferrer"
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {content}
    </motion.button>
  );
}
