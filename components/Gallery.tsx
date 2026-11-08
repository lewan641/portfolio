"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Shot } from "@/lib/data";

/** Screenshot gallery: desktop shots in a browser frame, mobile shots in a phone frame, click to enlarge. */
export function Gallery({ desktop = [], mobile = [] }: { desktop?: Shot[]; mobile?: Shot[] }) {
  const tabs = [
    ...(desktop.length ? [{ key: "desktop", label: "Desktop", shots: desktop }] : []),
    ...(mobile.length ? [{ key: "mobile", label: "Mobile", shots: mobile }] : []),
  ];
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const shots = tabs[tab]?.shots ?? [];
  const isMobile = tabs[tab]?.key === "mobile";

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + shots.length) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <div>
      {tabs.length > 1 && (
        <div className="mb-5 inline-flex rounded-full border border-line bg-panel p-1" role="tablist">
          {tabs.map((t, i) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={i === tab}
              onClick={() => setTab(i)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                i === tab ? "bg-accent text-white" : "text-dim hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {isMobile ? (
        <div className="flex snap-x items-start gap-5 overflow-x-auto pb-2 sm:justify-start">
          {shots.map((s, i) => (
            <button key={s.src} onClick={() => setOpen(i)} className="group w-[200px] shrink-0 snap-start text-left sm:w-[230px]">
              <div className="overflow-hidden rounded-[2rem] border-[6px] border-[#1b2236] bg-black shadow-2xl shadow-black/50 transition group-hover:-translate-y-1 group-hover:border-accent/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.alt} loading="lazy" className="block h-auto w-full" />
              </div>
              <p className="mt-3 text-xs leading-relaxed text-dim">{s.alt}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {shots.map((s, i) => (
            <button key={s.src} onClick={() => setOpen(i)} className={`group text-left ${i === 0 ? "sm:col-span-2" : ""}`}>
              <div className="overflow-hidden rounded-xl border border-line bg-panel shadow-2xl shadow-black/40 transition group-hover:-translate-y-1 group-hover:border-accent/60">
                <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.alt} loading="lazy" className="block aspect-[16/10] w-full object-cover object-top" />
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-dim">{s.alt}</p>
            </button>
          ))}
        </div>
      )}

      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={shots[open].alt}
        >
          <button aria-label="Close" className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-white/20" onClick={() => setOpen(null)}>
            <X className="size-5" />
          </button>
          {shots.length > 1 && (
            <>
              <button aria-label="Previous" className="absolute left-2 rounded-full bg-white/10 p-2 hover:bg-white/20 sm:left-6" onClick={(e) => { e.stopPropagation(); step(-1); }}>
                <ChevronLeft className="size-6" />
              </button>
              <button aria-label="Next" className="absolute right-2 rounded-full bg-white/10 p-2 hover:bg-white/20 sm:right-6" onClick={(e) => { e.stopPropagation(); step(1); }}>
                <ChevronRight className="size-6" />
              </button>
            </>
          )}
          <figure className="max-h-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shots[open].src} alt={shots[open].alt} className={`mx-auto max-h-[82vh] rounded-lg ${isMobile ? "w-auto" : "w-full object-contain"}`} />
            <figcaption className="mt-3 text-center text-sm text-dim">
              {shots[open].alt} <span className="opacity-60">· {open + 1}/{shots.length}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
