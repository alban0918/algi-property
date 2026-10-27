"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Desplazamiento con inercia. Se desactiva si el usuario pidió reducir el movimiento. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: true });
    let frame = requestAnimationFrame(function raf(tiempo) {
      lenis.raf(tiempo);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
