import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/chat-context";

// Google retires these on a schedule. A dead model returns 404 naming its
// replacement, which is the quickest way to find the new string.
const MODEL = "gemini-3.6-flash";
const MAX_MESSAGE_CHARS = 500;
const MAX_HISTORY_TURNS = 10;

type Turn = { role: "user" | "model"; text: string };

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat is not configured on this deployment." },
      { status: 503 },
    );
  }

  let body: { message?: unknown; history?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return NextResponse.json(
      { error: `Please keep questions under ${MAX_MESSAGE_CHARS} characters.` },
      { status: 400 },
    );
  }

  const history: Turn[] = Array.isArray(body.history)
    ? (body.history as unknown[])
        .filter(
          (t): t is Turn =>
            typeof t === "object" &&
            t !== null &&
            "text" in t &&
            typeof (t as Turn).text === "string" &&
            ((t as Turn).role === "user" || (t as Turn).role === "model"),
        )
        .slice(-MAX_HISTORY_TURNS)
        .map((t) => ({ role: t.role, text: t.text.slice(0, MAX_MESSAGE_CHARS) }))
    : [];

  let response: Response;
  try {
    response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      // Without this a stalled upstream call leaves the widget on
      // "Thinking…" forever, which reads as a hard freeze.
      signal: AbortSignal.timeout(25_000),
      headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
        contents: [
          ...history.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
          { role: "user", parts: [{ text: message }] },
        ],
        generationConfig: {
          // Heavy reasoning is dead weight for "what did he build at X" — it
          // drove replies to 15-30s and ate the output budget. Gemini 3 spells
          // this `thinkingLevel`; the older `thinkingBudget` is a 400 here.
          thinkingConfig: { thinkingLevel: "low" },
          maxOutputTokens: 900,
          temperature: 0.4,
        },
      }),
    },
    );
  } catch (e) {
    const timedOut = e instanceof DOMException && e.name === "TimeoutError";
    console.error("Gemini request failed", e);
    return NextResponse.json(
      {
        error: timedOut
          ? "That took too long — please try again."
          : "Sorry — I couldn't answer that right now.",
      },
      { status: 504 },
    );
  }

  if (!response.ok) {
    console.error("Gemini request failed", response.status, await response.text());
    // The free tier allows only 20 requests/day, so 429 is a routine state
    // here, not an edge case — say so plainly instead of looking broken.
    if (response.status === 429) {
      return NextResponse.json(
        { error: "The chat has hit today's usage limit. Please try again tomorrow." },
        { status: 429 },
      );
    }
    return NextResponse.json(
      { error: "Sorry — I couldn't answer that right now." },
      { status: 502 },
    );
  }

  const data = await response.json();
  const reply = data?.candidates?.[0]?.content?.parts
    ?.map((p: { text?: string }) => p.text ?? "")
    .join("")
    .trim();

  if (!reply) {
    return NextResponse.json(
      { error: "Sorry — I couldn't answer that right now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ reply });
}
