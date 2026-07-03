"use client";
import { useEffect } from "react";

/**
 * Disables the browser's native scroll-restoration behaviour and forces
 * the page to start at the very top on every fresh load / hot-reload.
 */
export function ScrollToTop() {
  useEffect(() => {
    // Tell the browser not to restore the previous scroll position
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // Instantly jump to top — no smooth scroll so it feels like a clean load
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null; // renders nothing
}
