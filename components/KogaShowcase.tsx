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
 * Desktop: the section pins and the screenshots slide sideways as you scroll, each one scaling into place.
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
          gsap.fromTo(card, { scale: 0.9, autoAlpha: 0.3 }, {
            scale: 1, autoAlpha: 1, ease: "power2.out",
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
      <div ref={track} className="flex gap-6 overflow-x-auto px-4 pb-4 sm:px-6 lg:w-max lg:overflow-visible lg:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:pr-24">
        {shots.map((s, i) => (
          <figure key={s.src} data-card className="w-[85vw] shrink-0 sm:w-[60vw] lg:w-[min(62vw,860px)]">
            <figcaption className="label mb-3 flex justify-between text-dim">
              <span><span className="text-ink">{String(i + 1).padStart(2, "0")}</span> / {String(shots.length).padStart(2, "0")}</span>
              <span className="hidden sm:inline">Click to enlarge</span>
            </figcaption>
            <button onClick={() => setOpen(i)} className="group relative block w-full overflow-hidden rounded-3xl border border-line text-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={s.alt} {...dims(s.src)} loading="lazy" className="block aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]" />
              <span className="absolute bottom-4 right-4 rounded-full bg-ink p-2.5 text-bg opacity-0 transition-opacity group-hover:opacity-100">
                <Maximize2 className="size-4" />
              </span>
            </button>
            <p className="mt-3 text-sm text-dim">{s.alt}</p>
          </figure>
        ))}
      </div>
      <div className="mx-auto mt-4 hidden h-px w-full max-w-6xl bg-line lg:block">
        <div data-progress className="h-[3px] origin-left scale-x-0 rounded-full bg-dim" />
      </div>

      <Lightbox shots={shots} index={open} onClose={() => setOpen(null)} />
    </div>
  );
}
