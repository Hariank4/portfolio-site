"use client";

import { ArrowRight } from "lucide-react";
import { openChat } from "@/components/chat/chat-widget";

export function AskJinxButton({ name }: { name: string }) {
  return (
    <button
      type="button"
      onClick={openChat}
      className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold tracking-wide text-accent-fg uppercase transition-colors hover:brightness-110 sm:inline-flex"
    >
      Ask {name}
      <ArrowRight className="h-3.5 w-3.5" />
    </button>
  );
}
