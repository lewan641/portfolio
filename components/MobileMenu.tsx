"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";

/** Hamburger menu for phones and small tablets (the inline nav is hidden below md). */
export function MobileMenu({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- portals need the DOM, which exists only after mount
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { html.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <>
      <button aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)} className="rounded-full border border-line p-2.5 md:hidden">
        <Menu className="size-5" />
      </button>
      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[95] flex flex-col bg-bg px-4 pb-10 pt-[max(0.5rem,env(safe-area-inset-top))] md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex h-12 items-center justify-between">
            <span className="font-display text-lg font-semibold tracking-tight">Lewan Hassan</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="rounded-full border border-line p-2.5"><X className="size-5" /></button>
          </div>
          <nav className="mt-10 flex flex-col border-t border-line">
            {items.map((n, i) => (
              <a key={n.href} href={n.href} onClick={(e) => {
                  // close first (unlocks page scroll), then jump to the section
                  e.preventDefault();
                  setOpen(false);
                  setTimeout(() => {
                    document.querySelector(n.href)?.scrollIntoView({ behavior: "smooth" });
                    history.replaceState(null, "", n.href);
                  }, 30);
                }} className="flex items-baseline gap-4 border-b border-line py-5 font-display text-4xl font-semibold tracking-tight">
                <span className="label text-dim">0{i + 1}</span>{n.label}
              </a>
            ))}
          </nav>
        </div>,
        document.body,
      )}
    </>
  );
}
