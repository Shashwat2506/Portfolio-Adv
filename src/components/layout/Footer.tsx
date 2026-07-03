"use client";
import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { navItems, socialLinks, projects } from "@/data";

export function Footer() {
  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 bg-deep-black py-24 md:py-36">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent" />

      {/* Aurora background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aurora-blob w-96 h-96 bg-royal-purple/5 -bottom-32 -left-32" />
        <div className="aurora-blob w-80 h-80 bg-electric-blue/5 -bottom-20 -right-20" style={{ animationDelay: "3s" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-8 md:px-12 py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-16 mb-20">
          {/* Brand column */}
          <div className="space-y-6">
            <div className="font-space text-2xl font-bold">
              <span className="gradient-text">SH</span>
              <span className="text-white/40">.dev</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Full Stack Developer & AI Enthusiast crafting futuristic digital experiences at MIT World Peace University, Pune.
            </p>
            <div className="flex items-center gap-4">
              <motion.a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-white/10 text-white/50 hover:border-cyber-cyan/40 hover:text-cyber-cyan transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                data-magnetic
              >
                <FaGithub className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-white/10 text-white/50 hover:border-electric-blue/40 hover:text-electric-blue transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                data-magnetic
              >
                <FaLinkedin className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={`mailto:${socialLinks.email}`}
                className="p-3 rounded-xl border border-white/10 text-white/50 hover:border-neon-pink/40 hover:text-neon-pink transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                data-magnetic
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="font-space font-semibold text-white/80 text-sm mb-6 uppercase tracking-widest">Navigation</h3>
            <ul className="space-y-3.5">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-white/40 hover:text-cyber-cyan text-sm transition-colors duration-300"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured work column */}
          <div>
            <h3 className="font-space font-semibold text-white/80 text-sm mb-6 uppercase tracking-widest">Featured Work</h3>
            <ul className="space-y-4">
              {projects.slice(0, 4).map((project) => (
                <li key={project.id}>
                  <a
                    href={project.liveUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="text-white/70 text-sm group-hover:text-cyber-cyan transition-colors duration-300">{project.title}</div>
                    <div className="text-white/30 text-xs mt-1">{project.tagline}</div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="font-space font-semibold text-white/80 text-sm mb-6 uppercase tracking-widest">Get In Touch</h3>
            <div className="space-y-4">
              <a
                href={`mailto:${socialLinks.email}`}
                className="flex items-center gap-2.5 text-white/40 hover:text-cyber-cyan text-sm transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                {socialLinks.email}
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-white/40 hover:text-electric-blue text-sm transition-colors duration-300"
              >
                <FaLinkedin className="w-4 h-4" />
                linkedin.com/in/shashwat2504
              </a>
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection("#contact"); }}
                className="inline-flex items-center gap-2 mt-3 px-5 py-3 rounded-xl bg-gradient-to-r from-electric-blue to-cyber-cyan text-white text-sm font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Let&apos;s Connect ↗
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © 2026 Shashwat Holkar. Built with Next.js, Framer Motion & Three.js.
          </p>
          <p className="text-white/25 text-xs flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-neon-pink fill-neon-pink" /> Shashwat
          </p>
        </div>
      </div>
    </footer>
  );
}
