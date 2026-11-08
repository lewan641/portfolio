"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Maximize2 } from "lucide-react";
import { Lightbox } from "@/components/Lightbox";
import type { Shot } from "@/lib/data";
import { dims } from "@/lib/shot-sizes";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Desktop: the section pins and the screenshots slide sideways as you scroll, each one tilting into place.
 * Mobile / reduced motion: a normal swipeable row.
 */
export function KogaShowcase({ shots }: { shots: Shot[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const t = track.current!;
        const distance = () => t.scrollWidth - window.innerWidth + 96;
        const tween = gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-card]", t).forEach((card) => {
          gsap.fromTo(card, { rotateY: -18, scale: 0.88, autoAlpha: 0.35 }, {
            rotateY: 0, scale: 1, autoAlpha: 1, ease: "power2.out",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 95%", end: "left 45%", scrub: true },
          });
        });
        gsap.to("[data-progress]", {
          scaleX: 1, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + distance(), scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative flex min-h-0 flex-col justify-center overflow-hidden py-6 lg:h-screen">
      <div ref={track} className="flex gap-6 overflow-x-auto px-4 pb-4 [perspective:1400px] sm:px-6 lg:w-max lg:overflow-visible lg:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:pr-24">
        {shots.map((s, i) => (
          <figure key={s.src} data-card className="w-[85vw] shrink-0 sm:w-[60vw] lg:w-[min(62vw,860px)]">
            <button
              onClick={() => setOpen(i)}
              data-cursor
              className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-panel text-left shadow-2xl shadow-black/50 transition hover:border-accent/60"
            >
              <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" /><span className="size-2.5 rounded-full bg-[#febc2e]" /><span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-auto font-mono text-[10px] text-dim">0{i + 1} / 0{shots.length}</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={s.alt} {...dims(s.src)} loading="lazy" className="block aspect-[16/10] w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]" />
              <span className="absolute bottom-3 right-3 rounded-full bg-black/60 p-2 opacity-0 backdrop-blur transition group-hover:opacity-100">
                <Maximize2 className="size-4" />
              </span>
            </button>
            <figcaption className="mt-3 text-sm text-dim">{s.alt}</figcaption>
          </figure>
        ))}
      </div>
      <div className="mx-auto mt-4 hidden h-px w-full max-w-6xl bg-line lg:block">
        <div data-progress className="h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2" />
      </div>

      <Lightbox shots={shots} index={open} onClose={() => setOpen(null)} />
    </div>
  );
}
