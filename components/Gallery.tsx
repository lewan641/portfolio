"use client";

import { useState } from "react";
import type { Shot } from "@/lib/data";
import { dims } from "@/lib/shot-sizes";
import { Lightbox } from "@/components/Lightbox";

const two = (n: number) => String(n).padStart(2, "0");

/** Screenshot gallery: desktop shots as bordered plates, phone shots in a phone frame; tap to enlarge. */
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
        <div className="label mb-5 inline-flex border border-ink" role="tablist">
          {tabs.map((t, i) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={i === tab}
              onClick={() => setTab(i)}
              className={`px-4 py-2 transition-colors ${i === tab ? "bg-ink text-bg" : "hover:text-accent"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {isMobile ? (
        <div className="-mx-4 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:mx-0 sm:gap-6 sm:px-0">
          {shots.map((s, i) => (
            <button key={s.src} onClick={() => setOpen(i)} className="group w-[62vw] max-w-[230px] shrink-0 snap-start text-left sm:w-[230px]">
              <div className="overflow-hidden rounded-[1.6rem] border-[5px] border-ink bg-ink transition-transform duration-300 group-hover:-translate-y-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.alt} {...dims(s.src)} loading="lazy" className="block h-auto w-full" />
              </div>
              <p className="mt-3 text-sm leading-snug text-dim"><span className="label mr-2 text-accent">{two(i + 1)}</span>{s.alt}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
          {shots.map((s, i) => (
            <button key={s.src} onClick={() => setOpen(i)} className={`group text-left ${i === 0 ? "sm:col-span-2" : ""}`}>
              <div className="overflow-hidden border border-ink">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.alt} {...dims(s.src)} loading="lazy" className="block aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
              </div>
              <p className="mt-3 text-sm leading-snug text-dim"><span className="label mr-2 text-accent">{two(i + 1)}</span>{s.alt}</p>
            </button>
          ))}
        </div>
      )}

      <Lightbox shots={shots} index={open} onClose={() => setOpen(null)} />
    </div>
  );
}
