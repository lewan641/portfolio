import { ArrowUp, ArrowUpRight, Download, Plus } from "lucide-react";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { KogaShowcase } from "@/components/KogaShowcase";
import { Architecture } from "@/components/Architecture";
import { OfflineDemo } from "@/components/OfflineDemo";
import { Marquee } from "@/components/Marquee";
import { Motion } from "@/components/motion/Motion";
import { Magnetic } from "@/components/motion/Magnetic";
import { MobileMenu } from "@/components/MobileMenu";
import { koga, languages, profile, projects, skills, timeline } from "@/lib/data";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const marquee = ["C#", "ASP.NET Core", "PostgreSQL", "Next.js", "React", "TypeScript", "EF Core", "Tailwind", "Playwright", "Docker", "GitHub Actions", "Supabase"];

const two = (n: number) => String(n).padStart(2, "0");

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] leading-none text-dim">{children}</span>;
}

/** Bulleted line with a small dot instead of an icon. */
function Point({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-dim" aria-hidden />
      <span>{children}</span>
    </li>
  );
}

function SectionTitle({ n, eyebrow, title, children }: { n: string; eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-12 grid gap-6 border-t border-line pt-5 lg:grid-cols-[1fr_3fr]">
      <p data-reveal className="label flex gap-4 text-dim"><span className="text-ink">{n}</span>{eyebrow}</p>
      <div className="max-w-3xl">
        <h2 data-split className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl">{title}</h2>
        {children && <p data-reveal className="mt-6 text-lg leading-relaxed text-dim">{children}</p>}
      </div>
    </div>
  );
}

function SubTitle({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <p data-reveal className="label text-dim">{kicker}</p>
      <h3 data-split className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{children}</h3>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Motion />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="font-display text-lg font-semibold tracking-tight">Lewan Hassan</a>
          <nav className="label hidden gap-7 text-dim md:flex">
            {nav.map((n) => <a key={n.href} href={n.href} className="transition-colors hover:text-ink">{n.label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <a href={profile.cv} download className="label inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-bg transition-colors hover:bg-dim">
              <Download className="size-3.5" /> CV
            </a>
            <MobileMenu items={nav} />
          </div>
        </div>
      </header>

      <main className="pt-14">
        <Hero />

        <Marquee items={marquee} />

        {/* 01 — KOGA */}
        <section id="work" className="pt-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionTitle n="01" eyebrow="Featured work" title={`${koga.name} — ${koga.tagline}`}>{koga.summary}</SectionTitle>
            <dl data-stagger className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line text-sm sm:grid-cols-3">
              <div className="bg-panel p-5"><dt className="label text-dim">When</dt><dd className="mt-2">{koga.period}</dd></div>
              <div className="bg-panel p-5"><dt className="label text-dim">Where</dt><dd className="mt-2">{koga.context}</dd></div>
              <div className="bg-panel p-5"><dt className="label text-dim">Role</dt><dd className="mt-2">Solo: design, backend, frontend, testing, DevOps</dd></div>
            </dl>
          </div>

          <KogaShowcase shots={koga.desktop} />

          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="label text-dim">{koga.note}</p>

            <dl data-stagger className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {koga.numbers.map((n) => {
                const num = Number(n.value.replace(/[^\d]/g, ""));
                const pre = n.value.startsWith("~") ? "~" : "";
                const suf = n.value.replace(/[~\d,]/g, "");
                return (
                  <div key={n.label} className="rounded-3xl bg-panel p-6">
                    <dd className="font-display text-5xl font-semibold tracking-tight" data-count={num} data-prefix={pre} data-suffix={suf}>{n.value}</dd>
                    <dt className="mt-2 text-sm text-dim">{n.label}</dt>
                  </div>
                );
              })}
            </dl>

            <div className="mt-24 grid gap-10 lg:grid-cols-[1fr_3fr]">
              <div data-reveal className="lg:sticky lg:top-24 lg:self-start">
                <h3 className="label text-dim">Why I built it</h3>
                <p className="mt-4 text-lg leading-relaxed">{koga.problem}</p>
              </div>
              <ol data-stagger className="grid gap-3 sm:grid-cols-2">
                {koga.highlights.map((h, i) => (
                  <li key={h.title} className="rounded-3xl bg-panel p-6 transition-colors duration-300 hover:bg-raised sm:p-7">
                    <p className="label text-dim">{two(i + 1)}</p>
                    <h4 className="mt-4 font-display text-2xl font-semibold tracking-tight">{h.title}</h4>
                    <p className="mt-3 leading-relaxed text-dim">{h.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-24">
              <SubTitle kicker="Try it">Switch the internet off and keep selling</SubTitle>
              <p data-reveal className="-mt-3 mb-8 max-w-2xl text-lg leading-relaxed text-dim">
                This is the idea at the centre of KOGA&apos;s point of sale, rebuilt small enough to play with. Sell while offline, turn the connection back on, then send a request twice.
              </p>
              <div data-reveal><OfflineDemo /></div>
            </div>

            <div className="mt-24">
              <SubTitle kicker="Architecture">How it fits together</SubTitle>
              <Architecture />
            </div>

            <div className="mt-24 grid gap-10 lg:grid-cols-[1fr_3fr]">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <p data-reveal className="label text-dim">Engineering notes</p>
                <h3 data-split className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Four problems, and what I did about them</h3>
              </div>
              <div data-stagger className="grid gap-3">
                {koga.notes.map((note, i) => (
                  <details key={note.title} name="notes" open={i === 0} className="group rounded-3xl bg-panel open:bg-panel">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 sm:p-7 [&::-webkit-details-marker]:hidden">
                      <span className="flex items-baseline gap-4">
                        <span className="label text-dim">{two(i + 1)}</span>
                        <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{note.title}</span>
                      </span>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-raised transition-transform duration-300 group-open:rotate-45"><Plus className="size-4" /></span>
                    </summary>
                    <div className="grid gap-6 px-6 pb-7 sm:px-7 lg:grid-cols-2">
                      <div><p className="label text-dim">The problem</p><p className="mt-2 leading-relaxed text-dim">{note.problem}</p></div>
                      <div><p className="label text-dim">What I did</p><p className="mt-2 leading-relaxed">{note.answer}</p></div>
                      <pre className="overflow-x-auto rounded-2xl bg-bg p-4 font-mono text-xs leading-relaxed text-dim lg:col-span-2">{note.code}</pre>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <div className="mt-24">
              <SubTitle kicker="Mobile">On the road: the sales-rep app</SubTitle>
              <div data-reveal><Gallery mobile={koga.mobile} /></div>
            </div>

            <div data-stagger className="mt-12 flex flex-wrap gap-2">{koga.tech.map((t) => <Tag key={t}>{t}</Tag>)}</div>
          </div>
        </section>

        {/* 02 — Projects */}
        <section id="projects" className="mx-auto max-w-6xl px-4 pt-32 sm:px-6">
          <SectionTitle n="02" eyebrow="More work" title="Projects & client work">
            Real products for real users — a university research platform and software for local businesses in Qaladze.
          </SectionTitle>
          <div className="grid gap-4">
            {projects.map((p, i) => {
              const phones = p.shots?.filter((x) => x.mobile) ?? [];
              const screens = p.shots?.filter((x) => !x.mobile) ?? [];
              return (
                <article key={p.name} data-reveal className="rounded-[2rem] bg-panel p-6 sm:p-10">
                  <div className={`grid grid-cols-1 gap-10 [&>*]:min-w-0 ${phones.length && !screens.length ? "lg:grid-cols-[1.2fr_1fr]" : ""}`}>
                    <div className="max-w-3xl">
                      <p className="label flex flex-wrap gap-x-4 gap-y-1 text-dim"><span className="text-ink">{two(i + 1)}</span><span>{p.kind}</span><span>{p.period}</span></p>
                      <h3 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{p.name}</h3>
                      <p className="mt-2 text-lg text-dim">{p.tagline}</p>
                      <p className="mt-6 text-lg leading-relaxed">{p.text}</p>
                      {p.points.length > 0 && <ul className="mt-6 space-y-2.5 text-dim">{p.points.map((pt) => <Point key={pt}>{pt}</Point>)}</ul>}
                      <div className="mt-7 flex flex-wrap gap-2">{p.tech.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                      {p.link && (
                        <a href={p.link.href} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full border border-dim px-5 py-2.5 text-sm font-medium transition-colors hover:bg-raised">
                          {p.link.label} <ArrowUpRight className="size-4" />
                        </a>
                      )}
                    </div>
                    {p.shots && <Gallery desktop={screens} mobile={phones} />}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 03 — Skills */}
        <section id="skills" className="mx-auto max-w-6xl px-4 pt-32 sm:px-6">
          <SectionTitle n="03" eyebrow="Toolbox" title="Skills">The tools I use every day to take a product from idea to production.</SectionTitle>
          <div data-stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s, i) => (
              <div key={s.group} className="rounded-3xl bg-panel p-6">
                <p className="label text-dim">{two(i + 1)}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{s.group}</h3>
                <ul className="mt-5 text-dim">
                  {s.items.map((it) => <li key={it} className="border-t border-line py-2">{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 04 — About */}
        <section id="about" className="mx-auto max-w-6xl px-4 pt-32 sm:px-6">
          <SectionTitle n="04" eyebrow="About" title="Developer and store owner" />
          <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div data-stagger className="space-y-5 text-lg leading-relaxed">
                <p>I&apos;m a Computer Science graduate from Salahaddin University – Erbil, based in Qaladze. I build software for Kurdish-speaking businesses and users, and I care most about software that keeps working on a busy day, on a cheap phone, with a weak connection.</p>
                <p className="text-dim">Because I run a store myself, I understand the people I build for — cashiers, warehouse staff and sales reps. Every feature in KOGA started as a real problem in the shop.</p>
                <p className="text-dim">I work like a team even when I work alone: pull requests, automated tests on every change, and automatic deployment. Right now I&apos;m also learning AI / LLM integration and Python.</p>
              </div>
              <dl data-reveal className="mt-10 border-t border-line">
                {languages.map((l) => (
                  <div key={l.name} className="flex justify-between border-b border-line py-3">
                    <dt>{l.name}</dt><dd className="text-dim">{l.level}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ol data-stagger className="grid content-start gap-3">
              {timeline.map((t) => (
                <li key={t.title} className="rounded-3xl bg-panel p-6">
                  <p className="label text-dim">{t.when}</p>
                  <h3 className="mt-2 text-lg font-medium">{t.title}</h3>
                  <p className="text-sm text-dim">{t.where}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 05 — Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6">
          <div className="rounded-[2.5rem] bg-ink px-6 py-12 text-bg sm:px-12 sm:py-16">
            <p data-reveal className="label flex gap-4"><span>05</span>Contact</p>
            <h2 data-split className="mt-8 font-display text-[clamp(2.6rem,8.4vw,7.2rem)] font-semibold leading-[0.9] tracking-[-0.04em]">Let&apos;s build something real.</h2>
            <p data-reveal className="mt-8 max-w-xl text-lg leading-relaxed opacity-75">I&apos;m looking for a full-stack or backend developer role — on-site in Kurdistan or remote. The fastest way to reach me is email or WhatsApp.</p>
            <div data-reveal className="mt-10">
              <Magnetic strength={0.15}>
                <a href={`mailto:${profile.email}`} className="whitespace-nowrap font-display text-[clamp(1rem,5.6vw,2.25rem)] font-semibold tracking-tight underline decoration-bg/30 decoration-1 underline-offset-8 transition-colors hover:decoration-bg">{profile.email}</a>
              </Magnetic>
            </div>
            <ul data-stagger className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "WhatsApp", value: profile.phone, href: profile.whatsapp, ext: true },
                { label: "Phone", value: profile.phone, href: profile.phoneHref, ext: false },
                { label: "LinkedIn", value: "lewan-hassan", href: profile.linkedin, ext: true },
                { label: "GitHub", value: "lewan641", href: profile.github, ext: true },
              ].map((c) => (
                <li key={c.label}>
                  <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noreferrer" } : {})} className="group flex items-center justify-between gap-4 rounded-full border border-bg/20 py-3 pl-6 pr-4 transition-colors hover:bg-bg hover:text-ink">
                    <span><span className="label block opacity-60">{c.label}</span><span className="block text-sm">{c.value}</span></span>
                    <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="overflow-hidden">
        <div className="label mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-6 text-dim sm:px-6">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>{profile.location}</p>
          <p>Designed &amp; built in Qaladze</p>
          <a href="#top" className="inline-flex items-center gap-2 text-ink transition-colors hover:text-dim">Back to top <ArrowUp className="size-3.5" /></a>
        </div>
        {/* the name once more, one tone above the page */}
        <p aria-hidden className="select-none whitespace-nowrap text-center font-display text-[14.4vw] font-semibold leading-[0.8] tracking-[-0.05em] text-panel">Lewan Hassan</p>
      </footer>
    </>
  );
}
