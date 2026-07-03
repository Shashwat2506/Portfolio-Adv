"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const particleIdRef = useRef(0);
  const rafRef = useRef<number>(0);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const COLORS = ["#00d4ff", "#7b2fff", "#ff2d9b", "#0066ff", "#ffffff"];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnParticle = (x: number, y: number) => {
      const dx = x - lastMouseRef.current.x;
      const dy = y - lastMouseRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed < 2) return;

      particlesRef.current.push({
        id: particleIdRef.current++,
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 1,
        life: 1,
        maxLife: 30 + Math.random() * 20,
        size: Math.random() * 3 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });

      if (particlesRef.current.length > 100) {
        particlesRef.current = particlesRef.current.slice(-80);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life -= 1 / p.maxLife;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.vx *= 0.98;

        if (p.life <= 0) return false;

        ctx.save();
        ctx.globalAlpha = p.life * 0.7;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return true;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      mouseRef.current = { x, y };

      spawnParticle(x, y);
      lastMouseRef.current = { x, y };

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x - 6}px, ${y - 6}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${x - 20}px, ${y - 20}px)`;
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hover on interactive elements
    const handleHoverStart = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-magnetic]")) {
        setIsHovering(true);
      }
    };
    const handleHoverEnd = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
    };
  }, []);

  return (
    <>
      {/* Particle trail canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Cursor dot */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: isHovering ? 1.5 : 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
            style={{ willChange: "transform" }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: isHovering
                  ? "radial-gradient(circle, #ff2d9b, #7b2fff)"
                  : "radial-gradient(circle, #00d4ff, #0066ff)",
                boxShadow: isHovering
                  ? "0 0 20px rgba(255,45,155,0.8)"
                  : "0 0 15px rgba(0,212,255,0.8)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cursor ring */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={ringRef}
            className="fixed top-0 left-0 pointer-events-none z-[9997] will-change-transform"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isHovering ? 0.8 : 0.4,
              scale: isHovering ? 1.5 : 1,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.15 }}
            style={{ willChange: "transform" }}
          >
            <div
              className="w-10 h-10 rounded-full border"
              style={{
                borderColor: isHovering ? "rgba(255,45,155,0.6)" : "rgba(0,212,255,0.5)",
                boxShadow: isHovering
                  ? "0 0 20px rgba(255,45,155,0.2)"
                  : "0 0 15px rgba(0,212,255,0.15)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
