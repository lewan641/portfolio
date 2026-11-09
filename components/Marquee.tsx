/** Endless scrolling strip of technologies (pure CSS, pauses on hover). */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="marquee-track flex shrink-0 items-center gap-8 pr-8">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-8 whitespace-nowrap font-display text-3xl font-semibold tracking-tight sm:text-5xl">
          {t}<span className="text-accent" aria-hidden>/</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee flex overflow-hidden border-y border-ink py-5">
      {row(false)}
      {row(true)}
    </div>
  );
}
