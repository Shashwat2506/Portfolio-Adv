"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowRight, Zap } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { GlowButton } from "@/components/ui/GlowButton";

const ROLES = [
  "Full Stack Developer",
  "AI Enthusiast",
  "Cloud Learner",
  "Hackathon Builder",
  "GenAI Explorer",
  "Problem Solver",
  "Future Engineer",
];

const CODING_SYMBOLS = ["</>", "{}", "=>", "const", "async", "npm", "git", "API", "AI", "0x", "01", "&&"];

const GREETINGS = [
  "Hello, World! 👋 Welcome to my universe",
  "Initializing portfolio... ✅ Done!",
  "sudo apt-get install shashwat 🚀",
  "git clone shashwat-holkar.dev 💻",
  "404: Ordinary developer not found 😄",
  "Building the future, one commit at a time 🔧",
];

function useTypewriter(phrases: string[], typingSpeed = 55, deletingSpeed = 30, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed === current) {
      // Finished typing — pause then start deleting
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && displayed === "") {
      // Finished deleting — move to next phrase
      setIsDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayed(isDeleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1)
        );
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, phraseIdx, phrases, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

function NeuralBackground({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; radius: number }>>([]);
  const rafRef = useRef<number>(0);

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

    // Create nodes
    const nodeCount = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 15000));
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;
      const CONNECTION_DIST = 140;

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Mouse attraction
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && mouseX > 0) {
          node.vx += dx * 0.00008;
          node.vy += dy * 0.00008;
        }

        // Speed clamp
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 0.8) { node.vx *= 0.8 / speed; node.vy *= 0.8 / speed; }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 212, 255, 0.6)";
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#00d4ff";
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.25;
            const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            gradient.addColorStop(0, `rgba(0, 212, 255, ${alpha})`);
            gradient.addColorStop(0.5, `rgba(123, 47, 255, ${alpha * 0.7})`);
            gradient.addColorStop(1, `rgba(0, 102, 255, ${alpha})`);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.shadowBlur = 4;
            ctx.shadowColor = "rgba(0,212,255,0.3)";
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

export function Hero() {
  const { mousePosition, normalizedPosition } = useMousePosition();
  const [roleIndex, setRoleIndex] = useState(0);
  const [nameRevealed, setNameRevealed] = useState(false);
  const typewriterText = useTypewriter(GREETINGS);

  useEffect(() => {
    const timer = setTimeout(() => setNameRevealed(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Camera parallax offset
  const parallaxX = normalizedPosition.x * 12;
  const parallaxY = -normalizedPosition.y * 12;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-black py-28"
    >
      {/* Neural network background */}
      <NeuralBackground mouseX={mousePosition.x} mouseY={mousePosition.y} />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Aurora blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="aurora-blob w-[600px] h-[600px] bg-electric-blue/8 -top-40 -left-40"
          animate={{ x: parallaxX * 0.5, y: parallaxY * 0.5 }}
          transition={{ type: "spring", stiffness: 30, damping: 30 }}
        />
        <motion.div
          className="aurora-blob w-[500px] h-[500px] bg-royal-purple/10 top-1/4 right-0"
          animate={{ x: -parallaxX * 0.3, y: parallaxY * 0.4 }}
          transition={{ type: "spring", stiffness: 25, damping: 30 }}
          style={{ animationDelay: "2s" }}
        />
        <motion.div
          className="aurora-blob w-[400px] h-[400px] bg-cyber-cyan/6 bottom-0 left-1/3"
          animate={{ x: parallaxX * 0.4, y: -parallaxY * 0.3 }}
          transition={{ type: "spring", stiffness: 20, damping: 30 }}
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Floating coding symbols */}
      {CODING_SYMBOLS.map((symbol, i) => (
        <motion.div
          key={i}
          className="absolute font-mono-custom text-cyber-cyan/20 text-sm select-none pointer-events-none"
          initial={{
            x: `${10 + Math.random() * 80}%`,
            y: `${10 + Math.random() * 80}%`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [`${10 + (i * 7) % 80}%`, `${5 + (i * 7 - 10) % 80}%`],
          }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        >
          {symbol}
        </motion.div>
      ))}

      {/* Main content — parallax shifted with mouse */}
      <motion.div

        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        animate={{ x: parallaxX, y: parallaxY }}
        transition={{ type: "spring", stiffness: 80, damping: 25 }}
      >
        {/* Hello badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan text-sm font-mono-custom mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse shrink-0" />
          <span className="min-w-0">
            {typewriterText}
            <span
              className="inline-block w-px h-[1em] bg-cyber-cyan ml-0.5 align-middle"
              style={{ animation: "blink 1s step-end infinite" }}
            />
          </span>
        </motion.div>

        {/* Name — character materialization */}
        <div className="mb-8">
          <h1 className="font-space font-bold text-5xl sm:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tight">
            {"Shashwat".split("").map((char, i) => (
              <motion.span
                key={`s-${i}`}
                className="inline-block"
                initial={{ opacity: 0, y: 50, filter: "blur(20px)", scale: 0.5 }}
                animate={nameRevealed ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + i * 0.07,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{ color: "#ffffff" }}
              >
                {char}
              </motion.span>
            ))}
            <br />
            {"Holkar".split("").map((char, i) => (
              <motion.span
                key={`h-${i}`}
                className="inline-block"
                initial={{ opacity: 0, y: 50, filter: "blur(20px)", scale: 0.5 }}
                animate={nameRevealed ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.8 + i * 0.09,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  background: "linear-gradient(135deg, #00d4ff 0%, #7b2fff 50%, #ff2d9b 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Morphing role text */}
        <div className="h-10 flex items-center justify-center mb-10 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              className="font-space text-xl sm:text-2xl md:text-3xl font-medium text-white/70"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              ✦ {ROLES[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6 }}
          className="text-white/40 text-base max-w-2xl mx-auto mb-12 leading-relaxed"

        >
          CS Engineering student at MIT World Peace University · Building{" "}
          <span className="text-cyber-cyan">AI-powered experiences</span>,{" "}
          <span className="text-royal-purple">full-stack applications</span>, and{" "}
          <span className="text-neon-pink">hardware innovations</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.9 }}
          className="flex flex-row flex-wrap items-center justify-center gap-4 md:gap-6 mb-12"
        >
          <GlowButton
            variant="primary"
            size="lg"
            icon={<Zap className="w-5 h-5" />}
            onClick={() => scrollToSection("projects")}
          >
            Explore My Universe
          </GlowButton>
          <GlowButton
            variant="ghost"
            size="lg"
            icon={<Download className="w-5 h-5" />}
            iconPosition="left"
            href="/resume.pdf"
            download
          >
            Download Resume
          </GlowButton>
          <GlowButton
            variant="secondary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
            onClick={() => scrollToSection("contact")}
          >
            Let&apos;s Build Together
          </GlowButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.2 }}
          className="inline-flex flex-wrap justify-center gap-px glass-panel overflow-hidden"
        >
          {[
            { label: "CGPA", value: "9.52" },
            { label: "Projects", value: "10+" },
            { label: "Hackathons", value: "8+" },
            { label: "Technologies", value: "40+" },
          ].map((stat, i) => (
            <div
              key={i}
              className="px-7 py-4 sm:px-10 sm:py-5 border-r border-white/5 last:border-0 text-center"
            >
              <div className="font-space font-bold text-2xl gradient-text-blue">{stat.value}</div>
              <div className="text-white/30 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Lens flare */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ opacity: { duration: 3, repeat: Infinity }, x: { duration: 0.5 }, y: { duration: 0.5 } }}
        style={{ top: "15%", right: "15%", width: 200, height: 200 }}
      >
        <div className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, rgba(123,47,255,0.08) 40%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-white/25 text-xs font-mono-custom tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-cyber-cyan/50 to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
