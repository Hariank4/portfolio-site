export function SpecList({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted md:text-base">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ChallengeList({
  items,
}: {
  items: { challenge: string; resolution: string }[];
}) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-col gap-8">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-2">
          <p className="text-sm font-medium text-fg md:text-base">{item.challenge}</p>
          <p className="text-sm leading-relaxed text-fg-muted md:text-base">
            <span className="text-accent">→ </span>
            {item.resolution}
          </p>
        </div>
      ))}
    </div>
  );
}
