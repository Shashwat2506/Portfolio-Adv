"use client";
import { useEffect, useCallback } from "react";

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function useEasterEggs(
  onKonami: () => void,
  onSudoHire: () => void,
  onLogoDoubleClick?: () => void
) {
  // Konami code detector
  useEffect(() => {
    let sequence: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      sequence.push(e.key);
      if (sequence.length > KONAMI_CODE.length) {
        sequence = sequence.slice(-KONAMI_CODE.length);
      }
      if (sequence.join(",") === KONAMI_CODE.join(",")) {
        onKonami();
        sequence = [];
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKonami]);

  // "sudo hire shashwat" typed anywhere
  useEffect(() => {
    let typed = "";
    const TARGET = "sudo hire shashwat";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        typed += e.key.toLowerCase();
        if (typed.length > TARGET.length) {
          typed = typed.slice(-TARGET.length);
        }
        if (typed === TARGET) {
          onSudoHire();
          typed = "";
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSudoHire]);

  const logoDoubleClickHandler = useCallback(() => {
    if (onLogoDoubleClick) onLogoDoubleClick();
  }, [onLogoDoubleClick]);

  return { logoDoubleClickHandler };
}
