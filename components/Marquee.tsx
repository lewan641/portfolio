/** Endless scrolling strip of technologies (pure CSS, pauses on hover). */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="marquee-track flex shrink-0 items-center gap-10 pr-10">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl font-semibold text-dim/70 sm:text-3xl">
          {t}<span className="size-2 rounded-full bg-accent/60" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee group relative flex overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      {row(false)}
      {row(true)}
    </div>
  );
}
