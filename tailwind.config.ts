import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-black": "#050505",
        "midnight-blue": "#0a0a1a",
        "electric-blue": "#0066ff",
        "cyber-cyan": "#00d4ff",
        "royal-purple": "#7b2fff",
        "neon-pink": "#ff2d9b",
        "glass-white": "rgba(255,255,255,0.06)",
        "glass-border": "rgba(255,255,255,0.1)",
      },
      fontFamily: {
        "space-grotesk": ["Space Grotesk", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "aurora-1": "linear-gradient(135deg, #0066ff22 0%, #7b2fff22 50%, #00d4ff22 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
      },
      animation: {
        "aurora-pulse": "aurora-pulse 8s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "border-glow": "border-glow 3s ease-in-out infinite",
        "text-shimmer": "text-shimmer 3s ease-in-out infinite",
        "particle-drift": "particle-drift 20s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "blob": "blob 7s infinite",
        "scanner": "scanner 2s ease-in-out infinite",
      },
      keyframes: {
        "aurora-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,212,255,0.3)" },
          "50%": { boxShadow: "0 0 60px rgba(0,212,255,0.8), 0 0 100px rgba(123,47,255,0.4)" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(0,212,255,0.3)" },
          "50%": { borderColor: "rgba(0,212,255,0.8)" },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "particle-drift": {
          "0%": { transform: "translateY(100vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-100vh) rotate(720deg)", opacity: "0" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        scanner: {
          "0%": { top: "0%", opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-cyan": "0 0 30px rgba(0,212,255,0.4), 0 0 60px rgba(0,212,255,0.2)",
        "glow-purple": "0 0 30px rgba(123,47,255,0.4), 0 0 60px rgba(123,47,255,0.2)",
        "glow-blue": "0 0 30px rgba(0,102,255,0.4), 0 0 60px rgba(0,102,255,0.2)",
        "glow-pink": "0 0 30px rgba(255,45,155,0.4)",
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
