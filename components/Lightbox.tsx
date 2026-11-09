"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Shot } from "@/lib/data";
import { dims } from "@/lib/shot-sizes";

/**
 * Full-screen image viewer. Rendered into <body> through a portal so it is never trapped
 * inside an animated (transformed) parent — `position: fixed` breaks inside transforms.
 * Keyboard: Esc / ← / →. Touch: swipe left/right, tap the backdrop to close.
 */
export function Lightbox({ shots, index, onClose }: { shots: Shot[]; index: number | null; onClose: () => void }) {
  const [i, setI] = useState(index ?? 0);
  const [mounted, setMounted] = useState(false);
  const touchX = useRef<number | null>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- portals need the DOM, which exists only after mount
  useEffect(() => setMounted(true), []);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- follow the image the visitor tapped
  useEffect(() => { if (index !== null) setI(index); }, [index]);

  const step = useCallback((d: number) => setI((v) => (v + d + shots.length) % shots.length), [shots.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); html.style.overflow = prev; };
  }, [index, onClose, step]);

  if (!mounted || index === null) return null;
  const s = shots[i];

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-[#031213]"
      role="dialog"
      aria-modal="true"
      aria-label={s.alt}
      onClick={onClose}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) { e.preventDefault(); step(dx < 0 ? 1 : -1); }
      }}
    >
      <div className="flex shrink-0 items-center justify-between px-4 pb-2 pt-[max(1rem,env(safe-area-inset-top))]">
        <span className="font-mono text-xs text-dim">{i + 1} / {shots.length}</span>
        <button aria-label="Close" className="rounded-full bg-raised p-2.5 text-ink hover:bg-line" onClick={onClose}>
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={s.src}
          alt={s.alt}
          {...dims(s.src)}
          onClick={(e) => e.stopPropagation()}
          className="h-auto max-h-full w-auto max-w-full rounded-xl object-contain"
        />
        {shots.length > 1 && (
          <>
            <button aria-label="Previous" className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-raised p-3 text-ink hover:bg-line sm:block" onClick={(e) => { e.stopPropagation(); step(-1); }}>
              <ChevronLeft className="size-6" />
            </button>
            <button aria-label="Next" className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-raised p-3 text-ink hover:bg-line sm:block" onClick={(e) => { e.stopPropagation(); step(1); }}>
              <ChevronRight className="size-6" />
            </button>
          </>
        )}
      </div>

      <div className="shrink-0 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 text-center">
        <p className="mx-auto max-w-2xl text-sm text-dim">{s.alt}</p>
        {shots.length > 1 && (
          <div className="mt-3 flex items-center justify-center gap-4 sm:hidden">
            <button aria-label="Previous" className="rounded-full bg-raised p-3 text-ink" onClick={(e) => { e.stopPropagation(); step(-1); }}><ChevronLeft className="size-5" /></button>
            <span className="text-xs text-dim">swipe</span>
            <button aria-label="Next" className="rounded-full bg-raised p-3 text-ink" onClick={(e) => { e.stopPropagation(); step(1); }}><ChevronRight className="size-5" /></button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
