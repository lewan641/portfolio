"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/**
 * Page-wide scroll animations, driven by data attributes so server components stay simple:
 *   data-reveal            fade + rise when scrolled into view
 *   data-stagger           its direct children reveal one after another
 *   data-split             heading reveals word by word
 *   data-count="1100"      number counts up (keeps data-suffix / data-prefix)
 *   data-parallax="0.15"   moves slower/faster than the page
 * Everything is skipped when the visitor prefers reduced motion.
 */
export function Motion() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Positions are measured once; re-measure after the pinned section is set up and fonts swap in.
    // Images carry width/height (lib/shot-sizes.ts), so lazy loading doesn't shift the layout —
    // refreshing on every image load would interrupt in-progress smooth scrolls (menu jumps).
    ScrollTrigger.config({ ignoreMobileResize: true });
    let t: ReturnType<typeof setTimeout>;
    const refresh = () => { clearTimeout(t); t = setTimeout(() => ScrollTrigger.refresh(), 150); };
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    const settle = setTimeout(refresh, 400);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(bar.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          onStart() { gsap.set(el, { transition: "none" }); },
          onComplete() { gsap.set(el, { clearProps: "transition,transform,translate,rotate,scale" }); },
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
        // CSS hover transitions on the children would fight GSAP's per-frame updates,
        // so they are switched off while the entrance runs and restored after.
        gsap.from(el.children, {
          y: 36,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.09,
          onStart() { gsap.set(el.children, { transition: "none" }); },
          onComplete() { gsap.set(el.children, { clearProps: "transition,transform,translate,rotate,scale" }); },
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const split = SplitText.create(el, { type: "words", mask: "words" });
        gsap.from(split.words, {
          yPercent: 110,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const pre = el.dataset.prefix ?? "";
        const suf = el.dataset.suffix ?? "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
          onUpdate: () => {
            el.textContent = pre + Math.round(obj.v).toLocaleString("en-US") + suf;
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0.15;
        gsap.to(el, {
          yPercent: -100 * speed,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });

    return () => {
      clearTimeout(t); clearTimeout(settle);
      window.removeEventListener("load", refresh);
    };
  });

  return (
    <div
      ref={bar}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-accent via-fuchsia-400 to-accent-2"
    />
  );
}
