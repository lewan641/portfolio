"use client";

import { useEffect, useRef, useState } from "react";
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
// syntax colours stay inside the green family
const color: Record<string, string> = {
  c: "text-code-dim italic", a: "text-dim", k: "text-dim", t: "text-ink", f: "text-ink font-medium", s: "text-code-fg",
};

// the four stats sit on stacked plates, each one tone lighter than the one under it
const plates = [
  "bg-panel border-line text-ink",
  "bg-raised border-line text-ink",
  "bg-line border-dim text-ink",
  "bg-dim border-dim text-bg",
];

/** Local time in Qaladze, ticking. Rendered only after mount so server and client HTML match. */
function LocalTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Baghdad", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const tick = () => setNow(fmt.format(new Date()));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => { clearTimeout(first); clearInterval(id); };
  }, []);
  return <span className="tabular-nums">{now ?? "--:--:--"}</span>;
}

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
          // Take the sheet out completely once it has lifted. Left in place (only moved off-screen)
          // it is still a full-screen fixed element in the page's INVERSE colour, and mobile Safari
          // tints its toolbar from fixed elements — the bar ended up dark on the light theme.
          .set(q("[data-loader]"), { display: "none" })
          // 2. name rises letter by letter, then the rest
          .from(name.chars, { yPercent: 110, duration: 1, stagger: 0.03 }, "-=0.4")
          .from(q("[data-hero-rule]"), { scaleX: 0, duration: 1, ease: "power3.inOut" }, "-=0.8")
          .from(q("[data-hero-fade]"), { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, "-=0.7")
          // 3. the plates drop onto the stack one by one
          .from(q("[data-plate]"), { y: -46, autoAlpha: 0, duration: 0.7, ease: "back.out(1.4)", stagger: 0.14 }, "-=0.5")
          .from(q("[data-terminal]"), { y: 40, autoAlpha: 0, duration: 0.9 }, "-=0.6")
          // 4. the code types itself line by line
          .fromTo(q("[data-line]"), { clipPath: "inset(0 100% 0 0)" }, {
            clipPath: "inset(0 0% 0 0)", duration: 0.4, ease: "steps(24)", stagger: 0.25,
          }, "-=0.4")
          .from(q("[data-ok]"), { autoAlpha: 0, duration: 0.4 }, "+=0.1");

        // stats count up as their plates land
        q("[data-stat-num]").forEach((el: HTMLElement, i: number) => {
          const end = Number(el.dataset.to); const suf = el.dataset.suffix ?? ""; const o = { v: 0 };
          tl.to(o, { v: end, duration: 1.4, ease: "power2.out", onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString("en-US") + suf; } }, 2.5 + i * 0.14);
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

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <div data-hero-fade className="label flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-dim">
          <span>{profile.role} — {profile.stack}</span>
          <span className="flex items-center gap-2 text-ink"><span className="size-2 rounded-full bg-ink" />Open to full-stack &amp; backend roles</span>
        </div>

        <h1 data-hero-name className="mt-6 whitespace-nowrap font-display text-[clamp(2.6rem,12.4vw,10.4rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
          Lewan Hassan
        </h1>
        <div data-hero-rule className="mt-8 h-px origin-left bg-line" />

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[1.15fr_1fr] [&>*]:min-w-0">
          <div>
            <p data-hero-fade className="max-w-xl text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">{profile.intro}</p>
            <div data-hero-fade className="mt-9 flex flex-wrap gap-3">
              <Magnetic>
                <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-dim">
                  See my work <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={profile.cv} download className="inline-flex items-center gap-2 rounded-full border border-dim px-6 py-3.5 text-sm font-medium transition-colors hover:bg-raised">
                  <Download className="size-4" /> Download CV
                </a>
              </Magnetic>
            </div>
          </div>

          {/* stats as stacked plates */}
          <dl className="flex flex-col">
            {stats.map((s, i) => {
              const n = Number(s.value.replace(/[^\d]/g, ""));
              const suffix = s.value.replace(/[\d,]/g, "");
              return (
                <div
                  key={s.label}
                  data-plate
                  style={{ zIndex: i + 1 }}
                  className={`relative flex items-baseline justify-between gap-4 rounded-[2.2rem] border px-7 pt-4 sm:px-9 ${i < stats.length - 1 ? "-mb-7 pb-11" : "pb-5"} ${plates[i]}`}
                >
                  <dd className="font-display text-4xl font-semibold tracking-tight sm:text-5xl" data-stat-num data-to={n} data-suffix={suffix}>{s.value}</dd>
                  <dt className="text-right text-sm leading-snug opacity-80">{s.label}</dt>
                </div>
              );
            })}
          </dl>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr] [&>*]:min-w-0">
          {/* code block */}
          <figure data-terminal className="overflow-hidden rounded-3xl border border-line bg-panel">
            <figcaption className="label flex items-center justify-between border-b border-line px-6 py-3.5 text-dim">
              <span>KOGA / SalesController.cs</span><span>C#</span>
            </figcaption>
            <pre className="overflow-x-auto p-6 font-mono text-[11.5px] leading-[1.8] sm:text-[12.5px]">
              {code.map((line, i) => (
                <div key={i} data-line className="whitespace-pre">
                  <span className="mr-4 inline-block w-4 select-none text-right text-line">{i + 1}</span>
                  {line.map(([t, c], j) => <span key={j} className={c ? color[c] : "text-code-fg"}>{t}</span>)}
                </div>
              ))}
            </pre>
            <p data-ok className="border-t border-line bg-raised px-6 py-3 font-mono text-xs">
              ✓ 53 API suites · 52 E2E suites passed
            </p>
          </figure>

          {/* now card */}
          <dl data-hero-fade className="rounded-3xl border border-line bg-panel px-6 py-2 text-sm">
            {[
              ["Local time", <><LocalTime /> <span className="text-dim">· GMT+3</span></>],
              ["Based in", <>Qaladze, Kurdistan <span className="text-dim">· 36.18°N 45.12°E</span></>],
              ["Building", <>KOGA — retail ERP &amp; POS</>],
              ["Studied", <>B.Sc. Computer Science &amp; IT, 2026</>],
              ["Speaks", <>Kurdish, English, Arabic</>],
            ].map(([k, v], i) => (
              <div key={i} className="flex items-baseline justify-between gap-6 border-b border-line py-3.5 last:border-b-0">
                <dt className="label shrink-0 text-dim">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
