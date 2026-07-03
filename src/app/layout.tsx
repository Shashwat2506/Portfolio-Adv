import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export const metadata: Metadata = {
  title: "Shashwat Holkar — Full Stack Developer & AI Enthusiast",
  description:
    "Portfolio of Shashwat Holkar — CS Engineering student at MIT WPU, Full Stack Developer, AI Enthusiast, Cloud Learner, TEDx Organizer and Hackathon Builder.",
  keywords: [
    "Shashwat Holkar",
    "Full Stack Developer",
    "AI Enthusiast",
    "Portfolio",
    "React",
    "Next.js",
    "Cloud",
    "TEDx",
    "MIT WPU",
  ],
  authors: [{ name: "Shashwat Holkar", url: "https://github.com/Shashwat2506" }],
  creator: "Shashwat Holkar",
  openGraph: {
    title: "Shashwat Holkar — Full Stack Developer & AI Enthusiast",
    description: "Award-winning portfolio by Shashwat Holkar — building futuristic digital experiences.",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Disable browser scroll-restoration BEFORE hydration so the page always loads at the top */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                window.scrollTo(0, 0);
              }
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-deep-black text-white antialiased font-inter overflow-x-hidden">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
