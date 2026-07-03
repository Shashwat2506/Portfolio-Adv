"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Terminal } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { GlowButton } from "@/components/ui/GlowButton";
import { socialLinks, terminalCommands } from "@/data";

interface TerminalLine {
  id: number;
  type: "input" | "output" | "system" | "success" | "error";
  content: string;
}

const BOOT_SEQUENCE = [
  { type: "system" as const, content: "SHASHWAT_OS v2045.1 — Initializing contact interface..." },
  { type: "system" as const, content: "Loading neural communication module..." },
  { type: "success" as const, content: "✓ AI Terminal ready. Type 'help' to see available commands." },
];

function TerminalUI() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [booted, setBooted] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);

  const addLine = (type: TerminalLine["type"], content: string) => {
    setLines((prev) => [...prev, { id: idRef.current++, type, content }]);
  };

  // Boot sequence
  useEffect(() => {
    if (booted) return;
    setBooted(true);
    let delay = 300;
    BOOT_SEQUENCE.forEach((line, i) => {
      setTimeout(() => addLine(line.type, line.content), delay + i * 500);
    });
  }, [booted]);

  // Auto-scroll the terminal body only — NOT the whole page
  useEffect(() => {
    const body = terminalBodyRef.current;
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    addLine("input", `guest@shashwat.dev:~$ ${cmd}`);

    if (!trimmed) return;

    if (trimmed === "clear") {
      setTimeout(() => setLines([]), 200);
      return;
    }

    const response = terminalCommands[trimmed];

    if (response) {
      setTimeout(() => {
        if (trimmed === "resume") {
          addLine("success", response);
          setTimeout(() => {
            window.open("/resume.pdf", "_blank");
          }, 800);
        } else if (trimmed === "linkedin") {
          addLine("success", response);
          setTimeout(() => window.open(socialLinks.linkedin, "_blank"), 800);
        } else if (trimmed === "github") {
          addLine("success", response);
          setTimeout(() => window.open(socialLinks.github, "_blank"), 800);
        } else if (trimmed === "email") {
          addLine("success", response);
          setTimeout(() => window.open(`mailto:${socialLinks.email}`), 800);
        } else if (trimmed === "sudo hire shashwat") {
          const lines = response.split("\n");
          lines.forEach((line, i) => {
            setTimeout(() => addLine("success", line), i * 400);
          });
        } else {
          addLine("output", response);
        }
      }, 200);
    } else {
      setTimeout(() => {
        addLine("error", `Command not found: '${trimmed}'. Type 'help' for available commands.`);
      }, 200);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input;
      setHistory((prev) => [cmd, ...prev]);
      setHistoryIndex(-1);
      handleCommand(cmd);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? "" : history[newIndex]);
    }
  };

  const lineColors = {
    input: "text-cyber-cyan",
    output: "text-white/70",
    system: "text-white/40",
    success: "text-emerald-400",
    error: "text-red-400",
  };

  return (
    <div
      className="glass-panel-bright rounded-2xl overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal title bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-white/3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex items-center gap-2 flex-1 justify-center">
          <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
          <span className="text-white/40 text-xs font-mono-custom">shashwat.dev — contact terminal</span>
        </div>
        <span className="text-white/20 text-xs font-mono-custom">v2045.1</span>
      </div>

      {/* Terminal body */}
      <div ref={terminalBodyRef} className="h-72 overflow-y-auto p-4 space-y-1 font-mono-custom text-xs" id="terminal-body">
        {lines.map((line) => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={lineColors[line.type]}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {line.content}
          </motion.div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-white/5">
        <span className="text-cyber-cyan text-xs font-mono-custom shrink-0">
          guest@shashwat.dev:~$
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-white text-xs font-mono-custom outline-none caret-cyber-cyan"
          placeholder="type a command..."
          autoComplete="off"
          spellCheck={false}
        />
        <div className="terminal-cursor" />
      </div>
    </div>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct mailto
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.open(`mailto:${socialLinks.email}?subject=${subject}&body=${body}`);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="section-padding bg-deep-black relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="aurora-blob w-96 h-96 bg-electric-blue/8 top-0 left-0 pointer-events-none" />
      <div className="aurora-blob w-80 h-80 bg-royal-purple/8 bottom-0 right-0 pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          label="Contact"
          title="Let's Build Something"
          accentWord="Build"
          subtitle="Open to internships, collaborations, and exciting projects. Pick your interface below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Terminal column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-space font-bold text-white text-xl mb-6 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyber-cyan" />
              AI Command Console
            </h3>
            <TerminalUI />
            <p className="text-white/25 text-xs font-mono-custom mt-5 text-center">
              Try: help · about · linkedin · github · email · sudo hire shashwat
            </p>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="font-space font-bold text-white text-xl mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-royal-purple" />
              Direct Message
            </h3>

            <div className="glass-panel-bright p-8 lg:p-10 rounded-2xl">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="text-5xl mb-4">🚀</div>
                    <div className="text-emerald-400 font-space font-bold text-xl mb-2">Message Sent!</div>
                    <p className="text-white/40 text-sm">Your email client should have opened. I&apos;ll respond soon!</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <label className="block text-white/50 text-xs font-space mb-2 uppercase tracking-wider">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-cyber-cyan/50 focus:bg-white/8 transition-all duration-300 placeholder-white/20"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs font-space mb-2 uppercase tracking-wider">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-cyber-cyan/50 focus:bg-white/8 transition-all duration-300 placeholder-white/20"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs font-space mb-2 uppercase tracking-wider">Message</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-cyber-cyan/50 focus:bg-white/8 transition-all duration-300 placeholder-white/20 resize-none"
                        placeholder="Tell me about your project, opportunity, or idea..."
                      />
                    </div>
                    <GlowButton type="submit" variant="primary" size="lg" className="w-full justify-center" icon={<Send className="w-4 h-4" />}>
                      Send Message
                    </GlowButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Social links */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl border border-white/10 text-white/50 hover:border-cyber-cyan/40 hover:text-cyber-cyan text-sm transition-all duration-300"
              >
                <FaGithub className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl border border-white/10 text-white/50 hover:border-electric-blue/40 hover:text-electric-blue text-sm transition-all duration-300"
              >
                <FaLinkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href={`mailto:${socialLinks.email}`}
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl border border-white/10 text-white/50 hover:border-neon-pink/40 hover:text-neon-pink text-sm transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
