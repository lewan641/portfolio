import { ArrowUpRight, Download, Mail, MapPin, Phone, MessageCircle, CheckCircle2 } from "lucide-react";
import { Gallery } from "@/components/Gallery";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { koga, languages, profile, projects, skills, stats, timeline } from "@/lib/data";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md border border-line bg-white/[.03] px-2 py-0.5 text-xs text-dim">{children}</span>;
}

function SectionTitle({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-2 font-display text-sm font-medium uppercase tracking-[.2em] text-accent-2">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 leading-relaxed text-dim">{children}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/75 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="font-display text-lg font-semibold">
            lewan<span className="text-accent">.</span>dev
          </a>
          <nav className="hidden gap-7 text-sm text-dim md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="transition hover:text-ink">{n.label}</a>
            ))}
          </nav>
          <a href={profile.cv} download className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:brightness-110">
            <Download className="size-4" /> CV
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="glow relative overflow-hidden">
          <div className="grid-bg absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-3 py-1 text-xs text-dim">
              <span className="size-2 animate-pulse rounded-full bg-emerald-400" /> Open to full-stack & backend roles
            </p>
            <h1 className="font-display text-5xl font-bold tracking-tight sm:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-3 font-display text-2xl font-medium sm:text-3xl">
              <span className="text-gradient">{profile.role}</span>
              <span className="text-dim"> · {profile.stack}</span>
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dim">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-bg transition hover:bg-white">
                See my work <ArrowUpRight className="size-4" />
              </a>
              <a href={profile.cv} download className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-5 py-3 text-sm font-semibold transition hover:border-accent">
                <Download className="size-4" /> Download CV
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-dim transition hover:text-ink">
                Contact me
              </a>
            </div>
            <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-panel/90 p-5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-semibold">{s.value}</dd>
                  <dd className="mt-1 text-sm text-dim">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* KOGA case study */}
        <section id="work" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionTitle eyebrow="Featured work" title={`${koga.name} — ${koga.tagline}`}>
            {koga.summary}
          </SectionTitle>

          <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-dim">
            <span>{koga.period}</span>
            <span className="flex items-center gap-1.5"><MapPin className="size-4" />{koga.context}</span>
            <span>Solo: design, backend, frontend, testing, DevOps</span>
          </div>

          <Gallery desktop={koga.desktop} mobile={koga.mobile} />
          <p className="mt-4 text-xs text-dim/70">{koga.note}</p>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <h3 className="font-display text-xl font-semibold">Why I built it</h3>
              <p className="mt-3 leading-relaxed text-dim">{koga.problem}</p>
              <dl className="mt-8 grid grid-cols-2 gap-4">
                {koga.numbers.map((n) => (
                  <div key={n.label} className="rounded-xl border border-line bg-panel p-4">
                    <dd className="font-display text-2xl font-semibold text-accent">{n.value}</dd>
                    <dt className="mt-1 text-xs text-dim">{n.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold">What I built</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {koga.highlights.map((h) => (
                  <div key={h.title} className="rounded-xl border border-line bg-panel p-5 transition hover:border-accent/50">
                    <h4 className="flex items-start gap-2 font-semibold"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent-2" />{h.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-dim">{h.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-2">{koga.tech.map((t) => <Tag key={t}>{t}</Tag>)}</div>
        </section>

        {/* Other projects */}
        <section id="projects" className="border-y border-line bg-panel/40">
          <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
            <SectionTitle eyebrow="More work" title="Projects & client work">
              Real products for real users — a university research platform and software for local businesses in Qaladze.
            </SectionTitle>
            <div className="grid gap-6">
              {projects.map((p) => (
                <article key={p.name} className={`grid grid-cols-1 gap-8 rounded-2xl border [&>*]:min-w-0 border-line bg-bg/60 p-6 sm:p-8 ${p.shots ? "lg:grid-cols-[1.1fr_1fr]" : ""}`}>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-accent-2">{p.kind}</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold">{p.name}</h3>
                    <p className="text-dim">{p.tagline} · <span className="text-sm">{p.period}</span></p>
                    <p className="mt-4 leading-relaxed">{p.text}</p>
                    {p.points.length > 0 && (
                      <ul className="mt-4 space-y-2 text-sm text-dim">
                        {p.points.map((pt) => (
                          <li key={pt} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />{pt}</li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-5 flex flex-wrap gap-2">{p.tech.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                    {p.link && (
                      <a href={p.link.href} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                        {p.link.label} <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </div>
                  {p.shots && <Gallery mobile={p.shots} />}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionTitle eyebrow="Toolbox" title="Skills">
            The tools I use every day to take a product from idea to production.
          </SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s) => (
              <div key={s.group} className="rounded-2xl border border-line bg-panel p-6">
                <h3 className="font-display font-semibold">{s.group}</h3>
                <ul className="mt-4 space-y-2 text-sm text-dim">
                  {s.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-t border-line bg-panel/40">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2">
            <div>
              <SectionTitle eyebrow="About" title="Developer and store owner" />
              <div className="space-y-4 leading-relaxed text-dim">
                <p>
                  I&apos;m a Computer Science graduate from Salahaddin University – Erbil, based in Qaladze. I build software
                  for Kurdish-speaking businesses and users, and I care most about software that keeps working on a busy
                  day, on a cheap phone, with a weak connection.
                </p>
                <p>
                  Because I run a store myself, I understand the people I build for — cashiers, warehouse staff and sales
                  reps. Every feature in KOGA started as a real problem in the shop.
                </p>
                <p>
                  I work like a team even when I work alone: pull requests, automated tests on every change, and
                  automatic deployment. Right now I&apos;m also learning AI / LLM integration and Python.
                </p>
              </div>
              <div className="mt-8">
                <h3 className="mb-3 font-display font-semibold">Languages</h3>
                <div className="flex flex-wrap gap-3">
                  {languages.map((l) => (
                    <span key={l.name} className="rounded-full border border-line px-3 py-1 text-sm">
                      {l.name} <span className="text-dim">· {l.level}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <ol className="relative mt-2 space-y-8 border-l border-line pl-8 lg:mt-24">
              {timeline.map((t) => (
                <li key={t.title} className="relative">
                  <span className="absolute -left-[39px] top-1 size-3.5 rounded-full border-2 border-accent bg-bg" />
                  <p className="text-sm text-accent-2">{t.when}</p>
                  <h3 className="mt-1 font-semibold">{t.title}</h3>
                  <p className="text-sm text-dim">{t.where}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="glow relative">
          <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
            <p className="mb-2 font-display text-sm font-medium uppercase tracking-[.2em] text-accent-2">Contact</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Let&apos;s build something real.</h2>
            <p className="mx-auto mt-4 max-w-xl text-dim">
              I&apos;m looking for a full-stack or backend developer role — on-site in Kurdistan or remote. The fastest way to reach me is email or WhatsApp.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:brightness-110">
                <Mail className="size-4" /> {profile.email}
              </a>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-5 py-3 text-sm font-semibold hover:border-accent">
                <MessageCircle className="size-4" /> WhatsApp
              </a>
              <a href={profile.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-5 py-3 text-sm font-semibold hover:border-accent">
                <Phone className="size-4" /> {profile.phone}
              </a>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-line p-3 text-dim hover:text-ink"><LinkedinIcon className="size-5" /></a>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full border border-line p-3 text-dim hover:text-ink"><GithubIcon className="size-5" /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-sm text-dim sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p className="flex items-center gap-1.5"><MapPin className="size-4" />{profile.location}</p>
        </div>
      </footer>
    </>
  );
}
