import type { TimelineItem } from "@/content/experience";
import { RevealOnScroll } from "./reveal";
import { Tag } from "./tag";

export function TimelineRow({ item }: { item: TimelineItem }) {
  return (
    <RevealOnScroll
      as="li"
      className="grid grid-cols-1 gap-2 border-t border-border py-8 first:border-t-0 md:grid-cols-[160px_1fr]"
    >
      <div className="text-xs uppercase tracking-wide text-fg-faint">{item.period}</div>
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="font-display text-xl font-medium text-fg md:text-2xl">{item.title}</h3>
          <p className="text-sm text-fg-muted">{item.org}</p>
        </div>
        <p className="max-w-[65ch] text-sm leading-relaxed text-fg-muted md:text-base">
          {item.description}
        </p>
        {item.tags && (
          <div className="flex flex-wrap gap-2 pt-1">
            {item.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </div>
    </RevealOnScroll>
  );
}
