"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/data";

interface NavbarProps {
  onLogoDoubleClick?: () => void;
}

export function Navbar({ onLogoDoubleClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section tracking
      const sections = navItems.map((item) => item.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "py-4 bg-deep-black/80 backdrop-blur-xl border-b border-white/5"
            : "py-6 bg-transparent"
        )}
      >
        <div className="
            max-w-7xl 
            mx-auto 
            flex 
            items-center 
            justify-between 
            px-6
            xl:px-10
            relative 
            z-10
            ">
          {/* Logo */}
          <motion.button
            onDoubleClick={onLogoDoubleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("#hero")}
            className="relative group flex items-center"
            data-magnetic
          >
            <span className="font-space text-2xl font-bold">
              <span className="gradient-text">SH</span>
              <span className="text-white/40">.dev</span>
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyber-cyan to-royal-purple group-hover:w-full transition-all duration-300" />
          </motion.button>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-3 lg:gap-5">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}

                  className={cn(
                    "relative px-3 py-1.5 lg:px-4 lg:py-2 text-sm font-medium transition-all duration-300 rounded-full flex-shrink-0",

                    isActive
                      ? "text-cyber-cyan"
                      : "text-white/50 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -inset-x-2 -inset-y-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10 whitespace-nowrap">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* CTAs */}
          <div className="hidden xl:flex items-center gap-5 flex-shrink-0">
            <motion.a
              href="#projects"
              onClick={(e) => { e.preventDefault(); scrollToSection("#projects"); }}
              className="flex items-center justify-center gap-3 min-w-[130px] px-6 py-3 rounded-xl border border-white/10 text-white/70 text-sm hover:border-cyber-cyan/40 hover:text-cyber-cyan transition-all duration-300 whitespace-nowrap flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-4 h-4" />
              View Work
            </motion.a>
            <motion.a
              href="/resume.pdf"
              download="Shashwat_Holkar_Resume.pdf"
              className="flex items-center justify-center gap-3 min-w-[120px] px-6 py-3 rounded-xl bg-gradient-to-r from-electric-blue to-cyber-cyan text-white text-sm font-medium shadow-glow-cyan whitespace-nowrap flex-shrink-0"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0,212,255,0.6)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" />
              Resume
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="xl:hidden flex flex-col gap-1.5 p-2 group"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={cn("block h-0.5 bg-white transition-all duration-300", mobileMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6")} />
            <span className={cn("block h-0.5 bg-white transition-all duration-300", mobileMenuOpen ? "opacity-0 w-0" : "w-4")} />
            <span className={cn("block h-0.5 bg-white transition-all duration-300", mobileMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5")} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-40 xl:hidden bg-deep-black/95 backdrop-blur-xl border-b border-white/5 px-8 py-6"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left px-5 py-3.5 text-white/70 hover:text-cyber-cyan hover:bg-cyber-cyan/5 rounded-lg transition-all text-sm"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex gap-4 mt-6 pt-6 border-t border-white/5">
                <a
                  href="/resume.pdf"
                  download
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-electric-blue to-cyber-cyan text-white text-sm font-medium"
                >
                  <Download className="w-4 h-4" /> Download CV
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
