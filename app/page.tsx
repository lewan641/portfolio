import { ArrowUpRight, Download, Mail, MapPin, Phone, MessageCircle, CheckCircle2 } from "lucide-react";
import { Gallery } from "@/components/Gallery";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { Hero } from "@/components/Hero";
import { KogaShowcase } from "@/components/KogaShowcase";
import { Architecture } from "@/components/Architecture";
import { Marquee } from "@/components/Marquee";
import { Motion } from "@/components/motion/Motion";
import { Cursor } from "@/components/motion/Cursor";
import { Magnetic } from "@/components/motion/Magnetic";
import { koga, languages, profile, projects, skills, timeline } from "@/lib/data";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const marquee = ["C#", "ASP.NET Core", "PostgreSQL", "Next.js", "React", "TypeScript", "EF Core", "Tailwind", "Playwright", "Docker", "GitHub Actions", "Supabase"];

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md border border-line bg-white/[.03] px-2 py-0.5 text-xs text-dim">{children}</span>;
}

function SectionTitle({ eyebrow, title, children, n }: { eyebrow: string; title: string; children?: React.ReactNode; n?: string }) {
  return (
    <div className="mb-12 max-w-3xl">
      <p data-reveal className="mb-3 flex items-center gap-3 font-display text-sm font-medium uppercase tracking-[.2em] text-accent-2">
        {n && <span className="font-mono text-xs text-dim">{n}</span>}
        <span className="h-px w-8 bg-accent-2/60" />
        {eyebrow}
      </p>
      <h2 data-split className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
      {children && <p data-reveal className="mt-5 text-lg leading-relaxed text-dim">{children}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <div className="grain">
      <Motion />
      <Cursor />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/50 bg-bg/60 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="font-display text-lg font-semibold">lewan<span className="text-accent">.</span>dev</a>
          <nav className="hidden gap-7 text-sm text-dim md:flex">
            {nav.map((n) => <a key={n.href} href={n.href} className="relative transition hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform hover:after:origin-left hover:after:scale-x-100">{n.label}</a>)}
          </nav>
          <Magnetic>
            <a href={profile.cv} download className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:brightness-110">
              <Download className="size-4" /> CV
            </a>
          </Magnetic>
        </div>
      </header>

      <main className="pt-16">
        <Hero />

        <Marquee items={marquee} />

        {/* KOGA */}
        <section id="work" className="pt-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionTitle n="01" eyebrow="Featured work" title={`${koga.name} — ${koga.tagline}`}>{koga.summary}</SectionTitle>
            <div data-stagger className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-dim">
              <span>{koga.period}</span>
              <span className="flex items-center gap-1.5"><MapPin className="size-4" />{koga.context}</span>
              <span>Solo: design, backend, frontend, testing, DevOps</span>
            </div>
          </div>

          <KogaShowcase shots={koga.desktop} />

          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-xs text-dim/70">{koga.note}</p>

            <dl data-stagger className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {koga.numbers.map((n) => {
                const num = Number(n.value.replace(/[^\d]/g, ""));
                const pre = n.value.startsWith("~") ? "~" : "";
                const suf = n.value.replace(/[~\d,]/g, "");
                return (
                  <div key={n.label} className="rounded-2xl border border-line bg-panel p-6">
                    <dd className="font-display text-4xl font-semibold text-accent" data-count={num} data-prefix={pre} data-suffix={suf}>{n.value}</dd>
                    <dt className="mt-2 text-sm text-dim">{n.label}</dt>
                  </div>
                );
              })}
            </dl>

            <div className="mt-24 grid gap-12 lg:grid-cols-[1fr_2fr]">
              <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
                <h3 className="font-display text-2xl font-semibold">Why I built it</h3>
                <p className="mt-4 leading-relaxed text-dim">{koga.problem}</p>
              </div>
              <div data-stagger className="grid gap-4 sm:grid-cols-2">
                {koga.highlights.map((h, i) => (
                  <div key={h.title} className="group relative overflow-hidden rounded-2xl border border-line bg-panel p-6 transition duration-500 hover:-translate-y-1 hover:border-accent/50">
                    <span className="absolute -right-2 -top-4 font-display text-7xl font-bold text-white/[.03] transition group-hover:text-accent/10">0{i + 1}</span>
                    <h4 className="flex items-start gap-2 font-semibold"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent-2" />{h.title}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-dim">{h.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-24">
              <h3 data-split className="mb-8 font-display text-2xl font-semibold sm:text-3xl">How it fits together</h3>
              <Architecture />
            </div>

            <div className="mt-24">
              <h3 data-split className="mb-8 font-display text-2xl font-semibold sm:text-3xl">On the road: the sales-rep app</h3>
              <div data-reveal><Gallery mobile={koga.mobile} /></div>
            </div>

            <div data-stagger className="mt-12 flex flex-wrap gap-2">{koga.tech.map((t) => <Tag key={t}>{t}</Tag>)}</div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mt-32 border-y border-line bg-panel/40">
          <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
            <SectionTitle n="02" eyebrow="More work" title="Projects & client work">
              Real products for real users — a university research platform and software for local businesses in Qaladze.
            </SectionTitle>
            <div className="grid gap-8">
              {projects.map((p, i) => (
                <article key={p.name} data-reveal className={`group grid grid-cols-1 gap-8 rounded-3xl border border-line bg-bg/60 p-6 transition duration-500 hover:border-accent/40 sm:p-10 [&>*]:min-w-0 ${p.shots ? "lg:grid-cols-[1.1fr_1fr]" : ""}`}>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-dim">0{i + 1}</span>
                      <p className="text-xs font-medium uppercase tracking-wider text-accent-2">{p.kind}</p>
                    </div>
                    <h3 className="mt-3 font-display text-3xl font-semibold">{p.name}</h3>
                    <p className="text-dim">{p.tagline} · <span className="text-sm">{p.period}</span></p>
                    <p className="mt-5 leading-relaxed">{p.text}</p>
                    {p.points.length > 0 && (
                      <ul className="mt-5 space-y-2.5 text-sm text-dim">
                        {p.points.map((pt) => <li key={pt} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />{pt}</li>)}
                      </ul>
                    )}
                    <div className="mt-6 flex flex-wrap gap-2">{p.tech.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                    {p.link && (
                      <Magnetic>
                        <a href={p.link.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-accent/50 px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent hover:text-white">
                          {p.link.label} <ArrowUpRight className="size-4" />
                        </a>
                      </Magnetic>
                    )}
                  </div>
                  {p.shots && <Gallery mobile={p.shots} />}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
          <SectionTitle n="03" eyebrow="Toolbox" title="Skills">The tools I use every day to take a product from idea to production.</SectionTitle>
          <div data-stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s) => (
              <div key={s.group} className="rounded-2xl border border-line bg-panel p-6 transition duration-500 hover:-translate-y-1 hover:border-accent/50">
                <h3 className="font-display text-lg font-semibold">{s.group}</h3>
                <ul className="mt-4 space-y-2 text-sm text-dim">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-t border-line bg-panel/40">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-28 sm:px-6 lg:grid-cols-2">
            <div>
              <SectionTitle n="04" eyebrow="About" title="Developer and store owner" />
              <div data-stagger className="space-y-4 text-lg leading-relaxed text-dim">
                <p>I&apos;m a Computer Science graduate from Salahaddin University – Erbil, based in Qaladze. I build software for Kurdish-speaking businesses and users, and I care most about software that keeps working on a busy day, on a cheap phone, with a weak connection.</p>
                <p>Because I run a store myself, I understand the people I build for — cashiers, warehouse staff and sales reps. Every feature in KOGA started as a real problem in the shop.</p>
                <p>I work like a team even when I work alone: pull requests, automated tests on every change, and automatic deployment. Right now I&apos;m also learning AI / LLM integration and Python.</p>
              </div>
              <div data-reveal className="mt-8">
                <h3 className="mb-3 font-display font-semibold">Languages</h3>
                <div className="flex flex-wrap gap-3">
                  {languages.map((l) => <span key={l.name} className="rounded-full border border-line px-3 py-1 text-sm">{l.name} <span className="text-dim">· {l.level}</span></span>)}
                </div>
              </div>
            </div>
            <ol data-stagger className="relative mt-2 space-y-10 border-l border-line pl-8 lg:mt-28">
              {timeline.map((t) => (
                <li key={t.title} className="relative">
                  <span className="absolute -left-[39px] top-1 size-3.5 rounded-full border-2 border-accent bg-bg shadow-[0_0_12px] shadow-accent/60" />
                  <p className="text-sm text-accent-2">{t.when}</p>
                  <h3 className="mt-1 text-lg font-semibold">{t.title}</h3>
                  <p className="text-sm text-dim">{t.where}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative overflow-hidden">
          <div data-parallax="0.25" className="absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 py-36 text-center sm:px-6">
            <p data-reveal className="mb-3 font-display text-sm font-medium uppercase tracking-[.2em] text-accent-2">05 · Contact</p>
            <h2 data-split className="mx-auto max-w-4xl font-display text-5xl font-semibold tracking-tight sm:text-7xl">Let&apos;s build something real.</h2>
            <p data-reveal className="mx-auto mt-6 max-w-xl text-lg text-dim">I&apos;m looking for a full-stack or backend developer role — on-site in Kurdistan or remote. The fastest way to reach me is email or WhatsApp.</p>
            <div data-stagger className="mt-12 flex flex-wrap justify-center gap-3">
              <Magnetic><a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white hover:brightness-110"><Mail className="size-4" /> {profile.email}</a></Magnetic>
              <Magnetic><a href={profile.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-6 py-3.5 text-sm font-semibold hover:border-accent"><MessageCircle className="size-4" /> WhatsApp</a></Magnetic>
              <Magnetic><a href={profile.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-6 py-3.5 text-sm font-semibold hover:border-accent"><Phone className="size-4" /> {profile.phone}</a></Magnetic>
            </div>
            <div data-stagger className="mt-6 flex justify-center gap-3">
              <Magnetic><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="block rounded-full border border-line p-3 text-dim hover:text-ink"><LinkedinIcon className="size-5" /></a></Magnetic>
              <Magnetic><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="block rounded-full border border-line p-3 text-dim hover:text-ink"><GithubIcon className="size-5" /></a></Magnetic>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-sm text-dim sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {profile.name} · Built with Next.js, Tailwind & GSAP</p>
          <p className="flex items-center gap-1.5"><MapPin className="size-4" />{profile.location}</p>
        </div>
      </footer>
    </div>
  );
}
