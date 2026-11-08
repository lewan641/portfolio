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
  return `M${p.x + 70},${p.y} C${mx},${p.y} ${mx},${q.y} ${q.x - 70},${q.y}`;
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
        tl.from(q("[data-node]"), { scale: 0.6, autoAlpha: 0, duration: 0.7, ease: "back.out(1.8)", stagger: 0.12, transformOrigin: "50% 50%" })
          .to(wires, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut", stagger: 0.12 }, "-=0.4")
          .from(q("[data-chip]"), { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.6 }, "-=0.4")
          .add(() => {
            gsap.utils.toArray<SVGCircleElement>("[data-packet]", root.current).forEach((dot, i) => {
              const w = wires[i % wires.length];
              const len = w.getTotalLength();
              const o = { t: 0 };
              gsap.to(o, {
                t: 1, duration: 1.6, ease: "power1.inOut", repeat: -1, repeatDelay: 0.6, delay: i * 0.35,
                onStart: () => { gsap.set(dot, { autoAlpha: 1 }); },
                onUpdate: () => { const pt = w.getPointAtLength(o.t * len); dot.setAttribute("cx", String(pt.x)); dot.setAttribute("cy", String(pt.y)); },
              });
            });
          });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="rounded-3xl border border-line bg-panel/60 p-4 sm:p-8">
      <div className="overflow-x-auto">
        <svg viewBox="0 0 920 300" className="min-w-[720px]" role="img" aria-label="KOGA architecture: POS and sales-rep app write to an offline queue, which syncs to the ASP.NET Core API, which stores data in PostgreSQL and sends Telegram alerts.">
          <defs>
            <linearGradient id="wire" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="920" y2="0"><stop offset="0" stopColor="#6d72ff" /><stop offset="1" stopColor="#22d3ee" /></linearGradient>
          </defs>
          {links.map(([a, b]) => (
            <g key={a + b}>
              <path d={path(a, b)} fill="none" stroke="#1d2538" strokeWidth="2" />
              <path data-wire d={path(a, b)} fill="none" stroke="url(#wire)" strokeWidth="2" />
            </g>
          ))}
          {links.map((_, i) => <circle key={i} data-packet r="4" fill="#22d3ee" opacity="0" style={{ filter: "drop-shadow(0 0 6px #22d3ee)" }} />)}
          {nodes.map((n) => {
            const Icon = n.icon;
            return (
              <g key={n.id} data-node>
                <rect x={n.x - 70} y={n.y - 34} width="140" height="68" rx="14" fill="#0e1322" stroke="#2a3450" />
                <foreignObject x={n.x - 64} y={n.y - 28} width="128" height="56">
                  <div className="flex h-full flex-col items-center justify-center text-center leading-tight">
                    <Icon className="mb-1 size-4 text-accent-2" />
                    <span className="text-[11px] font-semibold text-ink">{n.title}</span>
                    <span className="text-[8.5px] text-dim">{n.sub}</span>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs">
        <span data-chip className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-dim"><TestTube2 className="size-3.5 text-emerald-400" /> 105 test suites on every PR</span>
        <span data-chip className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-dim"><Cloud className="size-3.5 text-accent" /> Auto-deploy: Cloudflare Pages + Render</span>
        <span data-chip className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-dim"><Server className="size-3.5 text-accent-2" /> Background worker · System.Threading.Channels</span>
      </div>
    </div>
  );
}
