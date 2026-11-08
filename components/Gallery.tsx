"use client";

import { useState } from "react";
import type { Shot } from "@/lib/data";
import { dims } from "@/lib/shot-sizes";
import { Lightbox } from "@/components/Lightbox";

/** Screenshot gallery: desktop shots in a browser frame, mobile shots in a phone frame; tap to enlarge. */
export function Gallery({ desktop = [], mobile = [] }: { desktop?: Shot[]; mobile?: Shot[] }) {
  const tabs = [
    ...(desktop.length ? [{ key: "desktop", label: "Desktop", shots: desktop }] : []),
    ...(mobile.length ? [{ key: "mobile", label: "Mobile", shots: mobile }] : []),
  ];
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const shots = tabs[tab]?.shots ?? [];
  const isMobile = tabs[tab]?.key === "mobile";

  return (
    <div className="min-w-0">
      {tabs.length > 1 && (
        <div className="mb-5 inline-flex rounded-full border border-line bg-panel p-1" role="tablist">
          {tabs.map((t, i) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={i === tab}
              onClick={() => setTab(i)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${i === tab ? "bg-accent text-white" : "text-dim hover:text-ink"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {isMobile ? (
        <div className="-mx-4 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:mx-0 sm:gap-5 sm:px-0">
          {shots.map((s, i) => (
            <button key={s.src} onClick={() => setOpen(i)} className="group w-[62vw] max-w-[230px] shrink-0 snap-start text-left sm:w-[230px]">
              <div className="overflow-hidden rounded-[1.75rem] border-[5px] border-[#1b2236] bg-black shadow-2xl shadow-black/50 transition group-hover:-translate-y-1 group-hover:border-accent/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.alt} {...dims(s.src)} loading="lazy" className="block h-auto w-full" />
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
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" /><span className="size-2.5 rounded-full bg-[#febc2e]" /><span className="size-2.5 rounded-full bg-[#28c840]" />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.alt} {...dims(s.src)} loading="lazy" className="block aspect-[16/10] w-full object-cover object-top" />
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-dim">{s.alt}</p>
            </button>
          ))}
        </div>
      )}

      <Lightbox shots={shots} index={open} onClose={() => setOpen(null)} />
    </div>
  );
}
