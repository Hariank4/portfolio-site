import type { TimelineItem } from "@/content/experience";
import { RevealOnScroll } from "./reveal";
import { Tag } from "./tag";
import { Photo } from "./photo";

export function TimelineRow({ item }: { item: TimelineItem }) {
  return (
    <RevealOnScroll
      as="li"
      className="grid grid-cols-1 gap-2 border-t border-border py-8 first:border-t-0 md:grid-cols-[160px_1fr]"
    >
      <div className="text-xs uppercase tracking-wide text-fg-faint">{item.period}</div>

      {/* With a photo the copy narrows to make room; without one it keeps the
          full measure, so rows that have no image are unchanged. */}
      <div
        className={
          item.image ? "grid grid-cols-1 gap-6 md:grid-cols-[1fr_260px]" : undefined
        }
      >
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

        {item.image && (
          <Photo
            image={item.image}
            className="aspect-[4/3] md:aspect-[4/5]"
            sizes="(min-width: 768px) 260px, 100vw"
          />
        )}
      </div>
    </RevealOnScroll>
  );
}
