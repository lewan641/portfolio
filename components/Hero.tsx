"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Download } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { profile, stats } from "@/lib/data";

gsap.registerPlugin(useGSAP, SplitText);

// Simplified from KOGA's SalesController + IdempotencyService.
type Tok = [string, string?];
const code: Tok[][] = [
  [["// offline POS replays a sale after reconnecting", "c"]],
  [["[HttpPost]", "a"]],
  [["public async ", "k"], ["Task", "t"], ["<IActionResult> "], ["Create", "f"], ["(CreateSaleDto dto)"]],
  [["{"]],
  [["    var ", "k"], ["cached = "], ["await ", "k"], ["_idempotency."], ["CheckOperationAsync", "f"], ["(dto.OperationId);"]],
  [["    if ", "k"], ["(cached != "], ["null", "k"], [") "], ["return ", "k"], ["Ok", "f"], ["(cached); "], ["// no double sale", "c"]],
  [[""]],
  [["    var ", "k"], ["sale = "], ["await ", "k"], ["_sales."], ["CreateAsync", "f"], ["(dto);"]],
  [["    await ", "k"], ["_idempotency."], ["SaveOperationAsync", "f"], ["(dto.OperationId, "], ["\"Sale\"", "s"], [", sale);"]],
  [["    return ", "k"], ["Ok", "f"], ["(sale);"]],
  [["}"]],
];
const color: Record<string, string> = {
  c: "text-slate-500 italic", a: "text-amber-300", k: "text-fuchsia-400", t: "text-emerald-300", f: "text-sky-300", s: "text-orange-300",
};

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const name = SplitText.create(q("[data-hero-name]"), { type: "chars", mask: "chars" });
        const counter = { v: 0 };
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // 1. intro loader: counts to 100, then wipes up
        tl.to(counter, {
          v: 100, duration: 1.1, ease: "power2.inOut",
          onUpdate: () => { const el = q("[data-loader-num]")[0]; if (el) el.textContent = String(Math.round(counter.v)); },
        })
          .to(q("[data-loader-bar]"), { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0)
          .to(q("[data-loader]"), { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "+=0.1")
          // 2. hero content
          .from(name.chars, { yPercent: 120, rotate: 8, duration: 1.1, stagger: 0.035 }, "-=0.45")
          .from(q("[data-hero-fade]"), { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.1 }, "-=0.8")
          .from(q("[data-terminal]"), { y: 60, rotateX: 18, autoAlpha: 0, duration: 1.2, transformPerspective: 900 }, "-=0.9")
          // 3. code "types" itself line by line
          .fromTo(q("[data-line]"), { clipPath: "inset(0 100% 0 0)" }, {
            clipPath: "inset(0 0% 0 0)", duration: 0.45, ease: "steps(24)", stagger: 0.28,
          }, "-=0.5")
          .from(q("[data-ok]"), { autoAlpha: 0, y: 8, duration: 0.5 }, "+=0.1")
          .from(q("[data-stat]"), { y: 30, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 2.2);

        // stats count up as part of the intro
        q("[data-stat-num]").forEach((el: HTMLElement) => {
          const end = Number(el.dataset.to); const suf = el.dataset.suffix ?? ""; const o = { v: 0 };
          tl.to(o, { v: end, duration: 1.8, ease: "power2.out", onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString("en-US") + suf; } }, 2.3);
        });

        // floating orbs drift forever
        q("[data-orb]").forEach((el: HTMLElement, i: number) => {
          gsap.to(el, { x: "random(-60, 60)", y: "random(-40, 40)", duration: "random(6, 10)", repeat: -1, yoyo: true, ease: "sine.inOut", delay: i });
        });
      });

      // spotlight follows the mouse
      mm.add("(pointer: fine)", () => {
        const el = root.current!;
        const xTo = gsap.quickTo(el, "--mx", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(el, "--my", { duration: 0.6, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo(((e.clientX - r.left) / r.width) * 100);
          yTo(((e.clientY - r.top) / r.height) * 100);
        };
        el.addEventListener("pointermove", move);
        return () => el.removeEventListener("pointermove", move);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(q("[data-loader]"), { display: "none" });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="hero relative overflow-hidden" style={{ ["--mx" as string]: 70, ["--my" as string]: 20 }}>
      {/* intro loader */}
      <div data-loader className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-6 bg-bg">
        <p className="font-display text-sm uppercase tracking-[.4em] text-dim">Lewan Hassan</p>
        <p className="font-display text-7xl font-bold tabular-nums sm:text-8xl"><span data-loader-num>0</span><span className="text-accent">%</span></p>
        <div className="h-px w-48 bg-line"><div data-loader-bar className="h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2" /></div>
      </div>

      <div className="spotlight absolute inset-0" aria-hidden />
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div data-orb className="absolute -right-24 top-10 size-[28rem] rounded-full bg-accent/25 blur-[110px]" aria-hidden />
      <div data-orb className="absolute -left-32 top-64 size-[22rem] rounded-full bg-accent-2/15 blur-[110px]" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.15fr_1fr] [&>*]:min-w-0">
        <div>
          <p data-hero-fade className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-3 py-1 text-xs text-dim backdrop-blur">
            <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-emerald-400" /></span>
            Open to full-stack & backend roles
          </p>
          <h1 data-hero-name className="font-display text-[clamp(3.2rem,9vw,6.5rem)] font-bold leading-[0.95] tracking-tight">
            Lewan<br />Hassan
          </h1>
          <p data-hero-fade className="mt-5 font-display text-xl font-medium sm:text-2xl">
            <span className="text-gradient">{profile.role}</span>
            <span className="text-dim"> · {profile.stack}</span>
          </p>
          <p data-hero-fade className="mt-5 max-w-xl text-lg leading-relaxed text-dim">{profile.intro}</p>
          <div data-hero-fade className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-bg transition hover:bg-white">
                See my work <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.cv} download className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 px-6 py-3.5 text-sm font-semibold backdrop-blur transition hover:border-accent">
                <Download className="size-4" /> Download CV
              </a>
            </Magnetic>
          </div>
        </div>

        {/* code window */}
        <div data-terminal className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/30 via-transparent to-accent-2/20 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-2xl border border-line bg-[#0a0f1c]/90 shadow-2xl shadow-black/60 backdrop-blur">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="size-3 rounded-full bg-[#ff5f57]" /><span className="size-3 rounded-full bg-[#febc2e]" /><span className="size-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-dim">KOGA / SalesController.cs</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[11.5px] leading-[1.75] sm:text-[12.5px]">
              {code.map((line, i) => (
                <div key={i} data-line className="whitespace-pre">
                  <span className="mr-4 inline-block w-4 select-none text-right text-slate-600">{i + 1}</span>
                  {line.map(([t, c], j) => <span key={j} className={c ? color[c] : "text-slate-200"}>{t}</span>)}
                </div>
              ))}
            </pre>
            <div data-ok className="flex items-center gap-2 border-t border-line bg-emerald-500/5 px-5 py-2.5 font-mono text-xs text-emerald-300">
              ✓ 53 API suites · 52 E2E suites passed
            </div>
          </div>
        </div>

        {/* stats */}
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4 lg:col-span-2">
          {stats.map((s) => {
            const n = Number(s.value.replace(/[^\d]/g, ""));
            const suffix = s.value.replace(/[\d,]/g, "");
            return (
              <div key={s.label} data-stat className="bg-panel/90 p-5 backdrop-blur">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-semibold sm:text-4xl" data-stat-num data-to={n} data-suffix={suffix}>{s.value}</dd>
                <dd className="mt-1 text-sm text-dim">{s.label}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
