"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight, Download } from "lucide-react";
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
// muted editor palette on the dark code block
const color: Record<string, string> = {
  c: "text-[#8a8577] italic", a: "text-[#d9a441]", k: "text-[#e2795a]", t: "text-[#9fbf8f]", f: "text-[#e9e4d6] font-medium", s: "text-[#d9a441]",
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

        // 1. intro: counts to 100, then the sheet lifts
        tl.to(counter, {
          v: 100, duration: 1, ease: "power2.inOut",
          onUpdate: () => { const el = q("[data-loader-num]")[0]; if (el) el.textContent = String(Math.round(counter.v)).padStart(3, "0"); },
        })
          .to(q("[data-loader-bar]"), { scaleX: 1, duration: 1, ease: "power2.inOut" }, 0)
          .to(q("[data-loader]"), { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, "+=0.1")
          // 2. name rises letter by letter, then the rest
          .from(name.chars, { yPercent: 110, duration: 1, stagger: 0.03 }, "-=0.4")
          .from(q("[data-hero-rule]"), { scaleX: 0, duration: 1, ease: "power3.inOut" }, "-=0.8")
          .from(q("[data-hero-fade]"), { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, "-=0.7")
          .from(q("[data-terminal]"), { y: 40, autoAlpha: 0, duration: 0.9 }, "-=0.7")
          // 3. the code types itself line by line
          .fromTo(q("[data-line]"), { clipPath: "inset(0 100% 0 0)" }, {
            clipPath: "inset(0 0% 0 0)", duration: 0.4, ease: "steps(24)", stagger: 0.25,
          }, "-=0.4")
          .from(q("[data-ok]"), { autoAlpha: 0, duration: 0.4 }, "+=0.1")
          .from(q("[data-stat]"), { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.07 }, 2);

        // stats count up as part of the intro
        q("[data-stat-num]").forEach((el: HTMLElement) => {
          const end = Number(el.dataset.to); const suf = el.dataset.suffix ?? ""; const o = { v: 0 };
          tl.to(o, { v: end, duration: 1.6, ease: "power2.out", onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString("en-US") + suf; } }, 2.1);
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(q("[data-loader]"), { display: "none" });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="relative">
      {/* intro sheet */}
      <div data-loader className="fixed inset-0 z-[80] flex flex-col justify-end bg-ink p-6 text-bg sm:p-10">
        <div className="flex items-end justify-between">
          <p className="label">Lewan Hassan — Portfolio</p>
          <p className="font-display text-7xl font-semibold tabular-nums leading-none sm:text-9xl"><span data-loader-num>000</span></p>
        </div>
        <div className="mt-6 h-px w-full bg-bg/20"><div data-loader-bar className="h-px origin-left scale-x-0 bg-bg" /></div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
        <div data-hero-fade className="label flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-dim">
          <span>{profile.role} — {profile.stack}</span>
          <span className="flex items-center gap-2 text-ink"><span className="size-2 bg-accent" />Open to full-stack &amp; backend roles</span>
        </div>

        <h1 data-hero-name className="mt-6 whitespace-nowrap font-display text-[clamp(2.6rem,12.4vw,10.4rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
          Lewan Hassan
        </h1>
        <div data-hero-rule className="mt-8 h-px origin-left bg-ink" />

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] [&>*]:min-w-0">
          <div>
            <p data-hero-fade className="max-w-xl text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">{profile.intro}</p>
            <div data-hero-fade className="mt-9 flex flex-wrap gap-3">
              <Magnetic>
                <a href="#work" className="group inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-accent">
                  See my work <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={profile.cv} download className="inline-flex items-center gap-2 border border-ink px-6 py-3.5 text-sm font-medium transition-colors hover:bg-ink hover:text-bg">
                  <Download className="size-4" /> Download CV
                </a>
              </Magnetic>
            </div>
          </div>

          {/* code block */}
          <figure data-terminal className="bg-code text-[#e9e4d6]">
            <figcaption className="label flex items-center justify-between border-b border-white/10 px-5 py-3 text-[#8a8577]">
              <span>KOGA / SalesController.cs</span><span>C#</span>
            </figcaption>
            <pre className="overflow-x-auto p-5 font-mono text-[11.5px] leading-[1.8] sm:text-[12.5px]">
              {code.map((line, i) => (
                <div key={i} data-line className="whitespace-pre">
                  <span className="mr-4 inline-block w-4 select-none text-right text-[#5f5b52]">{i + 1}</span>
                  {line.map(([t, c], j) => <span key={j} className={c ? color[c] : ""}>{t}</span>)}
                </div>
              ))}
            </pre>
            <p data-ok className="border-t border-white/10 px-5 py-3 font-mono text-xs text-[#9fbf8f]">
              ✓ 53 API suites · 52 E2E suites passed
            </p>
          </figure>
        </div>

        {/* stats */}
        <dl className="mt-16 grid grid-cols-2 border-t border-ink sm:grid-cols-4">
          {stats.map((s, i) => {
            const n = Number(s.value.replace(/[^\d]/g, ""));
            const suffix = s.value.replace(/[\d,]/g, "");
            return (
              <div key={s.label} data-stat className={`border-b border-line py-6 pr-4 sm:border-b-0 ${i % 2 ? "pl-4 sm:pl-6" : "sm:pl-6"} ${i ? "sm:border-l sm:border-line" : "sm:pl-0"} ${i % 2 ? "border-l border-line" : ""}`}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-5xl font-semibold tracking-tight sm:text-6xl" data-stat-num data-to={n} data-suffix={suffix}>{s.value}</dd>
                <dd className="mt-2 text-sm text-dim">{s.label}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
