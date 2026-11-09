"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Database, HardDrive, Monitor, Send, Server, Smartphone, TestTube2, Cloud } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const nodes = [
  { id: "pos", x: 90, y: 70, icon: Monitor, title: "POS & Admin", sub: "Next.js · React 19" },
  { id: "rep", x: 90, y: 230, icon: Smartphone, title: "Sales-rep app", sub: "Mobile PWA" },
  { id: "idb", x: 330, y: 150, icon: HardDrive, title: "Offline queue", sub: "IndexedDB · idempotency keys" },
  { id: "api", x: 580, y: 150, icon: Server, title: "REST API", sub: "ASP.NET Core 8 · JWT" },
  { id: "db", x: 830, y: 70, icon: Database, title: "PostgreSQL", sub: "EF Core · audit log · stock ledger" },
  { id: "tg", x: 830, y: 230, icon: Send, title: "Telegram bot", sub: "order alerts" },
];
const links: [string, string][] = [["pos", "idb"], ["rep", "idb"], ["idb", "api"], ["api", "db"], ["api", "tg"]];
const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
const path = (a: string, b: string) => {
  const p = byId[a], q = byId[b], mx = (p.x + q.x) / 2;
  return `M${p.x + 70},${p.y} H${mx} V${q.y} H${q.x - 70}`;
};

/** How KOGA fits together, drawn when it scrolls into view, with requests flowing along the wires. */
export function Architecture() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const wires = gsap.utils.toArray<SVGPathElement>("[data-wire]", root.current);
        wires.forEach((w) => { const l = w.getTotalLength(); gsap.set(w, { strokeDasharray: l, strokeDashoffset: l }); });
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%" } });
        tl.from(q("[data-node]"), { y: 16, autoAlpha: 0, duration: 0.6, ease: "power3.out", stagger: 0.1 })
          .to(wires, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut", stagger: 0.12 }, "-=0.3")
          .from(q("[data-chip]"), { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.6 }, "-=0.4")
          .add(() => {
            gsap.utils.toArray<SVGRectElement>("[data-packet]", root.current).forEach((dot, i) => {
              const w = wires[i % wires.length];
              const len = w.getTotalLength();
              const o = { t: 0 };
              gsap.to(o, {
                t: 1, duration: 1.8, ease: "none", repeat: -1, repeatDelay: 0.6, delay: i * 0.35,
                onStart: () => { gsap.set(dot, { autoAlpha: 1 }); },
                onUpdate: () => { const pt = w.getPointAtLength(o.t * len); dot.setAttribute("x", String(pt.x - 4)); dot.setAttribute("y", String(pt.y - 4)); },
              });
            });
          });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="rounded-3xl border border-line bg-panel p-4 sm:p-8">
      <div className="overflow-x-auto">
        <svg viewBox="0 0 920 300" className="min-w-[720px]" role="img" aria-label="KOGA architecture: POS and sales-rep app write to an offline queue, which syncs to the ASP.NET Core API, which stores data in PostgreSQL and sends Telegram alerts.">
          {links.map(([a, b]) => (
            <g key={a + b}>
              <path d={path(a, b)} fill="none" stroke="var(--color-line)" strokeWidth="1.5" />
              <path data-wire d={path(a, b)} fill="none" stroke="var(--color-dim)" strokeWidth="1.5" />
            </g>
          ))}
          {links.map((_, i) => <rect key={i} data-packet x="-4" y="-4" width="8" height="8" rx="4" fill="var(--color-ink)" opacity="0" />)}
          {nodes.map((n) => {
            const Icon = n.icon;
            return (
              <g key={n.id} data-node>
                <rect x={n.x - 70} y={n.y - 34} width="140" height="68" rx="18" fill="var(--color-raised)" stroke="var(--color-line)" strokeWidth="1.5" />
                <foreignObject x={n.x - 64} y={n.y - 28} width="128" height="56">
                  <div className="flex h-full flex-col items-center justify-center text-center leading-tight">
                    <Icon className="mb-1 size-4" strokeWidth={1.75} />
                    <span className="text-[11px] font-semibold">{n.title}</span>
                    <span className="font-mono text-[8px] text-dim">{n.sub}</span>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
      <ul className="label mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-5 text-dim">
        <li data-chip className="flex items-center gap-2"><TestTube2 className="size-3.5" /> 105 test suites on every PR</li>
        <li data-chip className="flex items-center gap-2"><Cloud className="size-3.5" /> Auto-deploy: Cloudflare Pages + Render</li>
        <li data-chip className="flex items-center gap-2"><Server className="size-3.5" /> Background worker · System.Threading.Channels</li>
      </ul>
    </div>
  );
}
