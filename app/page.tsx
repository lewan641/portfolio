import { ArrowUpRight, Download } from "lucide-react";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { KogaShowcase } from "@/components/KogaShowcase";
import { Architecture } from "@/components/Architecture";
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
  return <span className="border border-line px-2 py-1 font-mono text-[11px] leading-none text-dim">{children}</span>;
}

/** Bulleted line with a small accent square instead of an icon. */
function Point({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-[0.6em] size-1.5 shrink-0 bg-accent" aria-hidden />
      <span>{children}</span>
    </li>
  );
}

function SectionTitle({ n, eyebrow, title, children }: { n: string; eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-12 grid gap-6 border-t border-ink pt-5 lg:grid-cols-[1fr_3fr]">
      <p data-reveal className="label flex gap-4 text-dim"><span className="text-accent">{n}</span>{eyebrow}</p>
      <div className="max-w-3xl">
        <h2 data-split className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl">{title}</h2>
        {children && <p data-reveal className="mt-6 text-lg leading-relaxed text-dim">{children}</p>}
      </div>
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
          <nav className="label hidden gap-7 md:flex">
            {nav.map((n) => <a key={n.href} href={n.href} className="transition-colors hover:text-accent">{n.label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <a href={profile.cv} download className="label inline-flex items-center gap-2 bg-ink px-3.5 py-2.5 text-bg transition-colors hover:bg-accent">
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
            <dl data-stagger className="grid gap-x-10 gap-y-4 border-y border-line py-5 text-sm sm:grid-cols-3">
              <div><dt className="label text-dim">When</dt><dd className="mt-1">{koga.period}</dd></div>
              <div><dt className="label text-dim">Where</dt><dd className="mt-1">{koga.context}</dd></div>
              <div><dt className="label text-dim">Role</dt><dd className="mt-1">Solo: design, backend, frontend, testing, DevOps</dd></div>
            </dl>
          </div>

          <KogaShowcase shots={koga.desktop} />

          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="label text-dim">{koga.note}</p>

            <dl data-stagger className="mt-16 grid grid-cols-2 border-t border-ink lg:grid-cols-4">
              {koga.numbers.map((n, i) => {
                const num = Number(n.value.replace(/[^\d]/g, ""));
                const pre = n.value.startsWith("~") ? "~" : "";
                const suf = n.value.replace(/[~\d,]/g, "");
                return (
                  <div key={n.label} className={`border-b border-line py-6 pr-4 ${i % 2 ? "border-l pl-4" : ""} ${i ? "lg:border-l lg:pl-6" : ""}`}>
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
              <ol data-stagger className="grid sm:grid-cols-2 sm:gap-x-10">
                {koga.highlights.map((h, i) => (
                  <li key={h.title} className="border-t border-ink py-6">
                    <p className="label text-accent">{two(i + 1)}</p>
                    <h4 className="mt-3 font-display text-2xl font-semibold tracking-tight">{h.title}</h4>
                    <p className="mt-3 leading-relaxed text-dim">{h.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-24">
              <h3 data-split className="mb-8 font-display text-3xl font-semibold tracking-tight sm:text-4xl">How it fits together</h3>
              <Architecture />
            </div>

            <div className="mt-24">
              <h3 data-split className="mb-8 font-display text-3xl font-semibold tracking-tight sm:text-4xl">On the road: the sales-rep app</h3>
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
          <div>
            {projects.map((p, i) => {
              const phones = p.shots?.filter((x) => x.mobile) ?? [];
              const screens = p.shots?.filter((x) => !x.mobile) ?? [];
              return (
                <article key={p.name} data-reveal className="border-t border-line py-12 first:border-t-0 first:pt-0">
                  <div className={`grid grid-cols-1 gap-10 [&>*]:min-w-0 ${phones.length && !screens.length ? "lg:grid-cols-[1.2fr_1fr]" : ""}`}>
                    <div className="max-w-3xl">
                      <p className="label flex flex-wrap gap-x-4 gap-y-1 text-dim"><span className="text-accent">{two(i + 1)}</span><span>{p.kind}</span><span>{p.period}</span></p>
                      <h3 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{p.name}</h3>
                      <p className="mt-2 text-lg text-dim">{p.tagline}</p>
                      <p className="mt-6 text-lg leading-relaxed">{p.text}</p>
                      {p.points.length > 0 && <ul className="mt-6 space-y-2.5 text-dim">{p.points.map((pt) => <Point key={pt}>{pt}</Point>)}</ul>}
                      <div className="mt-7 flex flex-wrap gap-2">{p.tech.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                      {p.link && (
                        <a href={p.link.href} target="_blank" rel="noreferrer" className="link mt-7 inline-flex items-center gap-1.5 font-medium">
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
          <div data-stagger className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s) => (
              <div key={s.group} className="border-t border-ink pb-10 pt-4">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{s.group}</h3>
                <ul className="mt-5 text-dim">
                  {s.items.map((i) => <li key={i} className="border-b border-line py-2">{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 04 — About */}
        <section id="about" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
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
            <ol data-stagger className="border-t border-ink">
              {timeline.map((t) => (
                <li key={t.title} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-5">
                  <p className="label pt-1 text-dim">{t.when}</p>
                  <div>
                    <h3 className="font-medium">{t.title}</h3>
                    <p className="text-sm text-dim">{t.where}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 05 — Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6">
          <div className="border-t border-ink pt-5">
            <p data-reveal className="label flex gap-4 text-dim"><span className="text-accent">05</span>Contact</p>
            <h2 data-split className="mt-10 font-display text-[clamp(2.8rem,9vw,8rem)] font-semibold leading-[0.9] tracking-[-0.04em]">Let&apos;s build something real.</h2>
            <p data-reveal className="mt-8 max-w-xl text-lg leading-relaxed text-dim">I&apos;m looking for a full-stack or backend developer role — on-site in Kurdistan or remote. The fastest way to reach me is email or WhatsApp.</p>
            <div data-reveal className="mt-10">
              <Magnetic strength={0.15}>
                <a href={`mailto:${profile.email}`} className="link break-all font-display text-2xl font-semibold tracking-tight sm:text-4xl">{profile.email}</a>
              </Magnetic>
            </div>
            <ul data-stagger className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "WhatsApp", value: profile.phone, href: profile.whatsapp, ext: true },
                { label: "Phone", value: profile.phone, href: profile.phoneHref, ext: false },
                { label: "LinkedIn", value: "lewan-hassan", href: profile.linkedin, ext: true },
                { label: "GitHub", value: "lewan641", href: profile.github, ext: true },
              ].map((c) => (
                <li key={c.label} className="border-b border-line">
                  <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noreferrer" } : {})} className="group flex items-center justify-between gap-4 py-4 pr-4 transition-colors hover:text-accent">
                    <span><span className="label block text-dim">{c.label}</span><span className="mt-1 block">{c.value}</span></span>
                    <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink">
        <div className="label mx-auto flex max-w-6xl flex-col justify-between gap-2 px-4 py-6 text-dim sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>{profile.location}</p>
          <p>Next.js · Tailwind · GSAP</p>
        </div>
      </footer>
    </>
  );
}
