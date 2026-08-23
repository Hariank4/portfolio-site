import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/chat-context";

const MODEL = "gemini-2.0-flash";
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

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
        contents: [
          ...history.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
          { role: "user", parts: [{ text: message }] },
        ],
        generationConfig: { maxOutputTokens: 400, temperature: 0.4 },
      }),
    },
  );

  if (!response.ok) {
    console.error("Gemini request failed", response.status, await response.text());
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
