import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/chat-context";

// Groq, not Gemini: the Gemini free tier allows 20 requests/day, which a
// public portfolio exhausts before lunch. Groq's is 14,400/day, and its API
// is OpenAI-compatible.
// Groq rotates these; a retired id returns 404 `model_not_found`. Check what
// is actually served with GET https://api.groq.com/openai/v1/models.
const MODEL = "openai/gpt-oss-120b";
const MAX_MESSAGE_CHARS = 500;
const MAX_HISTORY_TURNS = 10;

type Turn = { role: "user" | "model"; text: string };

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
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
    response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      // Without this a stalled upstream call leaves the widget on
      // "Thinking…" forever, which reads as a hard freeze.
      signal: AbortSignal.timeout(25_000),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          // Recent turns join the question for project selection: a follow-up
          // like "what stack did it use?" carries no project terms of its own.
          {
            role: "system",
            content: buildSystemPrompt(
              [...history.slice(-2).map((t) => t.text), message].join(" "),
            ),
          },
          ...history.map((t) => ({
            role: t.role === "model" ? "assistant" : "user",
            content: t.text,
          })),
          { role: "user", content: message },
        ],
        max_tokens: 900,
        temperature: 0.4,
      }),
    });
  } catch (e) {
    const timedOut = e instanceof DOMException && e.name === "TimeoutError";
    console.error("Groq request failed", e);
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
    console.error("Groq request failed", response.status, await response.text());
    if (response.status === 429) {
      return NextResponse.json(
        { error: "The chat is busy right now — please try again in a moment." },
        { status: 429 },
      );
    }
    return NextResponse.json(
      { error: "Sorry — I couldn't answer that right now." },
      { status: 502 },
    );
  }

  const data = await response.json();
  const reply =
    typeof data?.choices?.[0]?.message?.content === "string"
      ? data.choices[0].message.content.trim()
      : "";

  if (!reply) {
    return NextResponse.json(
      { error: "Sorry — I couldn't answer that right now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ reply });
}
