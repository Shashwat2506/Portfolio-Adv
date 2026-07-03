"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEasterEggs } from "@/hooks/useEasterEggs";

interface EasterEggOverlayProps {
  type: "konami" | "sudo" | "logo" | null;
  onClose: () => void;
}

function EasterEggOverlay({ type, onClose }: EasterEggOverlayProps) {
  if (!type) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center cursor-pointer"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      {type === "konami" && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center"
        >
          <div className="text-8xl mb-6">🕹️</div>
          <h2 className="font-space font-bold text-5xl mb-4" style={{
            background: "linear-gradient(135deg, #ff0080, #00ff80, #0080ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            CYBERPUNK MODE
          </h2>
          <p className="text-emerald-400 font-mono-custom text-lg mb-2">// KONAMI CODE ACTIVATED</p>
          <p className="text-white/40 text-sm font-mono-custom">Click anywhere to exit</p>
          {/* Cyberpunk scanlines */}
          <div className="fixed inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,128,0.03) 2px, rgba(0,255,128,0.03) 4px)",
            }}
          />
        </motion.div>
      )}

      {type === "sudo" && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center max-w-lg mx-auto px-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="font-mono-custom text-cyber-cyan text-sm mb-6 space-y-2">
              {["$ sudo hire shashwat", "> Authenticating credentials...", "> Verifying skills..."].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.3 }}
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          >
            <div className="text-7xl mb-4">🔐</div>
            <h2
              className="font-space font-bold text-4xl mb-3"
              style={{ color: "#00d4ff", textShadow: "0 0 40px rgba(0,212,255,0.8)" }}
            >
              ACCESS GRANTED
            </h2>
            <p className="text-emerald-400 font-mono-custom text-lg mb-2">✓ Future Engineer: LOADED</p>
            <p className="text-white/60 font-mono-custom">⚡ Shashwat Holkar is available for hire</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-white/25 text-xs font-mono-custom mt-8"
          >
            Click anywhere to close
          </motion.p>
        </motion.div>
      )}

      {type === "logo" && (
        <motion.div className="relative w-64 h-64 flex items-center justify-center">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 400,
                opacity: 0,
                scale: 0,
              }}
              transition={{ duration: 1, delay: i * 0.05 }}
              style={{
                background: ["#00d4ff", "#7b2fff", "#ff2d9b", "#0066ff"][i % 4],
                boxShadow: `0 0 10px ${["#00d4ff", "#7b2fff", "#ff2d9b", "#0066ff"][i % 4]}`,
              }}
            />
          ))}
          <div className="font-space text-5xl font-bold gradient-text">SH</div>
        </motion.div>
      )}
    </motion.div>
  );
}

export function EasterEggsProvider({ onLogoDoubleClick }: { onLogoDoubleClick?: () => void }) {
  const [activeEgg, setActiveEgg] = useState<"konami" | "sudo" | "logo" | null>(null);

  const handleKonami = useCallback(() => setActiveEgg("konami"), []);
  const handleSudo = useCallback(() => setActiveEgg("sudo"), []);
  const handleLogo = useCallback(() => setActiveEgg("logo"), []);

  useEasterEggs(handleKonami, handleSudo, handleLogo);

  return (
    <AnimatePresence>
      {activeEgg && (
        <EasterEggOverlay type={activeEgg} onClose={() => setActiveEgg(null)} />
      )}
    </AnimatePresence>
  );
}
