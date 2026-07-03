"use client";
import { useLenis } from "@/hooks/useLenis";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EasterEggsProvider } from "@/components/ui/EasterEggs";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { TechStack } from "@/components/sections/TechStack";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Leadership } from "@/components/sections/Leadership";
import { Achievements } from "@/components/sections/Achievements";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  useLenis();

  return (
    <>
      {/* Custom cursor + particle trail */}
      <CustomCursor />

      {/* Easter egg system (Konami, sudo hire, logo double-click) */}
      <EasterEggsProvider />

      {/* Navigation */}
      <Navbar />

      {/* Noise texture overlay */}
      <div className="noise fixed inset-0 pointer-events-none z-[9990]" />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <TechStack />
        <Projects />
        <Experience />
        <Leadership />
        <Achievements />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
