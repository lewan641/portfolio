"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/** Custom cursor (dot + trailing ring) on devices with a fine pointer. Grows over links and buttons. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      document.documentElement.classList.add("has-cursor");
      gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, autoAlpha: 1 });
      const dx = gsap.quickTo(dot.current, "x", { duration: 0.08 });
      const dy = gsap.quickTo(dot.current, "y", { duration: 0.08 });
      const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
      const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

      const move = (e: PointerEvent) => {
        dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
        const hot = (e.target as HTMLElement).closest("a, button, [data-cursor]");
        gsap.to(ring.current, { scale: hot ? 1.8 : 1, duration: 0.3, overwrite: "auto" });
        gsap.to(dot.current, { scale: hot ? 0 : 1, duration: 0.2, overwrite: "auto" });
      };
      const leave = () => gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.2 });
      const enter = () => gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.2 });
      window.addEventListener("pointermove", move);
      document.addEventListener("pointerleave", leave);
      document.addEventListener("pointerenter", enter);
      return () => {
        document.documentElement.classList.remove("has-cursor");
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerleave", leave);
        document.removeEventListener("pointerenter", enter);
      };
    });
  });

  return (
    <>
      <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[70] size-9 rounded-full border border-white/40 opacity-0 mix-blend-difference" />
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[70] size-1.5 rounded-full bg-white opacity-0 mix-blend-difference" />
    </>
  );
}
