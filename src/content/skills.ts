// Skills, grouped the way the CV groups them. Kept as short scannable lists,
// not a giant undifferentiated tag cloud.

export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming",
    items: ["Python", "C", "JavaScript / TypeScript", "SQL", "Data Structures & Algorithms"],
  },
  {
    title: "Web & Backend",
    items: ["Next.js / React", "FastAPI", "REST API Design", "Supabase / PostgreSQL"],
  },
  {
    title: "AI & Generative AI",
    items: [
      "LLMs & Prompting",
      "RAG (Retrieval-Augmented Generation)",
      "Embeddings & Vector Retrieval",
      "LLM API Integration (Groq)",
      "Model Behavior & Tokens",
    ],
  },
  {
    title: "Tools & Workflow",
    items: [
      "Git & GitHub",
      "Jira",
      "Vercel Deployment",
      "Claude Code",
      "Cursor",
      "Codex",
      "Bolt",
      "Email Automation (SMTP)",
    ],
  },
];
