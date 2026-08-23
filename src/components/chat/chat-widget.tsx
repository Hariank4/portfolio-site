"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MessageCircle, Send, X } from "lucide-react";
type Turn = { role: "user" | "model"; text: string };

/**
 * `name`, `assistantName` and `starters` arrive as props rather than being
 * imported here: this is a client component in the root layout, so importing
 * the content files directly would ship every case study's prose to every page.
 */
export function ChatWidget({
  name,
  assistantName,
  starters,
}: {
  name: string;
  assistantName: string;
  starters: string[];
}) {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    inputRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [turns, pending]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || pending) return;

    const history = turns;
    setTurns([...history, { role: "user", text: question }]);
    setInput("");
    setPending(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: question, history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setTurns((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : `Chat with ${assistantName}`}
        aria-expanded={open}
        className="fixed right-5 bottom-5 z-[80] flex h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-raised text-fg shadow-lg transition-colors hover:border-accent hover:text-accent"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {open &&
        createPortal(
          // Portaled to <body> for the same reason as the mobile nav: an
          // ancestor with backdrop-filter would become the containing block for
          // this fixed panel. See docs/architecture.md §8.
          <div
            role="dialog"
            aria-label={`Chat with ${assistantName}`}
            className="fixed right-5 bottom-20 z-[80] flex max-h-[min(32rem,calc(100vh-7rem))] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-lg border border-border bg-bg-raised shadow-2xl"
          >
            <div className="border-b border-border px-4 py-3">
              <p className="font-display text-sm font-medium">{assistantName}</p>
              <p className="mt-0.5 text-xs text-fg-faint">
                {name}&apos;s personal chat assistant. Answers come only from
                this site&apos;s content.
              </p>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {turns.length === 0 && (
                <div className="space-y-2">
                  {starters.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="block w-full rounded-md border border-border px-3 py-2 text-left text-xs text-fg-muted transition-colors hover:border-accent hover:text-fg"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {turns.map((t, i) => (
                <div
                  key={i}
                  className={
                    t.role === "user"
                      ? "ml-auto w-fit max-w-[85%] rounded-lg bg-accent px-3 py-2 text-sm text-accent-fg"
                      : "w-fit max-w-[90%] rounded-lg bg-bg-raised-2 px-3 py-2 text-sm leading-relaxed text-fg-muted"
                  }
                >
                  {t.text}
                </div>
              ))}

              {pending && <p className="text-xs text-fg-faint">Thinking…</p>}
              {error && <p className="text-xs text-accent">{error}</p>}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border px-3 py-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder="Ask a question…"
                aria-label="Your question"
                className="flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-fg-faint"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                aria-label="Send"
                className="flex h-8 w-8 items-center justify-center rounded-full text-fg-muted transition-colors hover:text-accent disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>,
          document.body,
        )}
    </>
  );
}
