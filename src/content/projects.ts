// All project / case-study content. Sourced from the CV and the 45-day
// internship report — figures like "5,000+ users" and "178+ commits" are
// quoted directly from that report, not estimated. Two projects ("flagship")
// get full case-study pages at /work/[slug]; the other two are lighter
// "also building" entries shown inline on the home page.

export type ArchitectureStep = { label: string; detail: string };
export type Challenge = { challenge: string; resolution: string };
export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  kind: "flagship" | "build";
  status: "Live" | "Internal MVP" | "Concept" | "Prototype";
  title: string;
  plainTitle: string;
  subtitle: string;
  summary: string;
  timeframe: string;
  role: string;
  tech: string[];
  links: ProjectLink[];
  problem: string;
  whyItMatters: string;
  whatIBuilt: string[];
  architecture: ArchitectureStep[];
  features: string[];
  challenges: Challenge[];
  resultsStatus: string;
  accent: "coral" | "cyan" | "violet" | "amber";
};

export const projects: Project[] = [
  {
    slug: "cyber-saarthi",
    kind: "flagship",
    status: "Live",
    title: "Cyber सारथी",
    plainTitle: "Cyber Sarthi",
    subtitle: "A cybersecurity-awareness platform, live in production",
    summary:
      "A full learning-to-certificate platform for cyber-awareness education — built end to end and now live with thousands of registered participants.",
    timeframe: "Jun – Jul 2026 · MeraPath Education Ltd. internship",
    role:
      "Co-built as one of a 2-person software development team, alongside a 15+ member content and ground-execution team.",
    tech: [
      "Next.js 13.5",
      "TypeScript",
      "Tailwind CSS",
      "Supabase (Postgres, Auth, Storage)",
      "pdf-lib",
      "qrcode / jsQR",
      "Gmail SMTP",
      "2Factor.in OTP",
      "Vercel",
    ],
    links: [{ label: "cybersarthi.in", href: "https://cybersarthi.in" }],
    problem:
      "Cyber-awareness training usually stops at a workshop deck: a session runs once, a handful of people see it, and there's no way to measure whether anything landed. MeraPath needed the workshop content to live as a real platform — one people could register for, learn from, get tested on, and walk away from with a verifiable certificate.",
    whyItMatters:
      "A cybersecurity-awareness program is only as good as its distribution. Turning a workshop into a self-serve platform — with a graded quiz, a leaderboard, and a QR-verifiable certificate — is what makes the content scale past a single room, and what gives the program something measurable to point to.",
    whatIBuilt: [
      "The full participant journey: registration → learning modules → quiz → auto-generated certificate with QR verification.",
      "\"Cyber Score\" — a scenario-based quiz plus an interactive \"arena\" of mini-games (an OTP scam simulator, a scam-detective exercise, a password-strength lab) that turn awareness training into something people actually engage with.",
      "A role-based admin panel: participant, trainer, and citizen management; scoped sub-admin permissions; bulk email/WhatsApp messaging; and a CMS for lesson content — genres, topics, storyboards, quizzes.",
      "Email automation over Gmail SMTP and phone-OTP verification via 2Factor.in, with rate limiting and resend cooldowns.",
      "Security hardening across the app — server-side auth guards, rate limiting, security headers — plus a 5,300+ line dead-code cleanup and a documentation rewrite (schema, auth, architecture) once the platform stabilized.",
    ],
    architecture: [
      { label: "Register", detail: "Participant sign-up, phone OTP via 2Factor.in" },
      { label: "Learn", detail: "CMS-authored modules: genres, topics, storyboards" },
      { label: "Quiz", detail: "Scenario-based quiz engine with auto-scoring" },
      { label: "Certify", detail: "pdf-lib certificate generation, QR-code verification" },
      { label: "Administer", detail: "Role-based admin: participants, trainers, sub-admins, CMS" },
      { label: "Notify", detail: "Gmail SMTP + WhatsApp bulk messaging, leaderboard, CSV export" },
    ],
    features: [
      "Authentication & phone-OTP verification",
      "Learning repository & cyber-awareness modules",
      "Scenario-based quiz engine with automatic scoring",
      "\"Cyber Score\" arena — OTP scam simulator, scam detective, password lab",
      "Leaderboard",
      "Role-based admin dashboard with scoped sub-admins",
      "CMS for lessons (genres, topics, storyboards, quizzes)",
      "Certificate generation with QR verification",
      "Bulk email & WhatsApp automation",
      "Security-hardened, production-deployed architecture",
    ],
    challenges: [
      {
        challenge:
          "Shipping fast with a two-person dev team while the platform was actively being used meant bugs surfaced in production: quiz retake logic, silent save failures, stale-data caching, OTP relogin issues, session leaks in the navbar.",
        resolution:
          "Ran full end-to-end QA passes across registration, quiz, certificate, email, and admin flows, and fixed each issue as it was found — 178+ commits shipped to main across 6+ production deployments.",
      },
      {
        challenge:
          "The codebase accumulated dead code and inconsistent patterns as features shipped quickly under a workshop deadline.",
        resolution:
          "Led a cleanup pass that removed 5,300+ lines of dead code, deduplicated components and hooks, and rewrote the core docs (schema, auth, architecture) so the codebase stayed maintainable past the internship.",
      },
    ],
    resultsStatus:
      "Live in production at cybersarthi.in with 5,000+ registered users. 178+ commits shipped to main, 6+ production deployments via Vercel.",
    accent: "coral",
  },
  {
    slug: "tender-command-centre",
    kind: "flagship",
    status: "Internal MVP",
    title: "AI Tender Command Centre",
    plainTitle: "AI Tender Command Centre",
    subtitle: "AI-powered intelligence for large government tenders",
    summary:
      "An AI pipeline that reads dense government tender documents — up to ~300 pages — and turns them into structured, searchable, trackable data.",
    timeframe: "Jun 2026 · MeraPath Education Ltd. internship",
    role: "Proposed the concept to leadership and built the MVP solo — database, AI pipeline, API, and dashboard.",
    tech: [
      "Python",
      "FastAPI",
      "PostgreSQL / Supabase",
      "React",
      "Tailwind CSS",
      "PyMuPDF",
      "Playwright",
      "Groq LLM API",
      "RAG / embeddings",
    ],
    links: [],
    problem:
      "Government tenders are published as long, unstructured PDFs — sometimes close to 300 pages — with the details that actually matter (deadlines, EMD, estimated cost, issuing authority, eligibility, geography) buried inside. Screening them manually for relevance and risk doesn't scale.",
    whyItMatters:
      "If tender screening can be automated reliably, an organization can evaluate far more opportunities in the same amount of time, and catch details a manual first pass might miss — without needing a human to read every page of every tender that comes in.",
    whatIBuilt: [
      "A scraping layer (Playwright) that pulls tenders from portals into a structured pipeline.",
      "A document-processing stage (PyMuPDF) that handles large, multi-hundred-page PDFs.",
      "An AI extraction layer using RAG — embeddings, vector retrieval, and LLM grounding via the Groq API — to pull out key fields: important dates, EMD, estimated cost, budget, issuing authority, and geographic information.",
      "A REST API (8 endpoints) backed by PostgreSQL/Supabase, and a live React + Tailwind dashboard connected to it in real time for tracking and reviewing extracted tenders.",
      "The BRD, wireframes, and risk-assessment framework that guided the MVP build.",
    ],
    architecture: [
      { label: "Discover", detail: "Playwright scrapers pull tenders from portals" },
      { label: "Process", detail: "PyMuPDF handles large multi-hundred-page PDFs" },
      { label: "Extract", detail: "RAG + Groq LLM pull dates, EMD, cost, authority, geography" },
      { label: "Structure", detail: "Normalized records land in PostgreSQL / Supabase" },
      { label: "Serve", detail: "FastAPI REST layer — 8 endpoints" },
      { label: "Track", detail: "Live React + Tailwind dashboard for review & alerts" },
    ],
    features: [
      "Large PDF processing (up to ~300 pages per tender)",
      "AI-assisted extraction: dates, EMD, estimated cost, budget, issuing authority, geography",
      "RAG pipeline — embeddings, vector retrieval, LLM grounding",
      "REST API (8 endpoints)",
      "Live tracking dashboard",
      "Alerting groundwork for time-sensitive tenders",
    ],
    challenges: [
      {
        challenge:
          "Initial plans assumed paid-tier access to Anthropic and Gemini APIs, which weren't available during the internship.",
        resolution:
          "Re-architected the extraction layer around the Groq API instead, and used the constraint as the reason to learn and implement RAG from scratch — embeddings, vector retrieval, and grounding — rather than relying on long-context prompting alone.",
      },
      {
        challenge:
          "Tender PDFs vary wildly in structure, length, and formatting quality across issuing authorities.",
        resolution:
          "Built the document-processing stage around PyMuPDF with enough tolerance to handle documents approaching 300 pages, and scoped the MVP's extraction fields around what could be reliably grounded rather than everything that might theoretically be useful.",
      },
    ],
    resultsStatus:
      "Working MVP: live dashboard connected to a real API and database. Proposed to MeraPath leadership alongside a broader \"MeraPath EduOS\" concept. Internal tool, not yet public.",
    accent: "cyan",
  },
  {
    slug: "ai-medical-scribe",
    kind: "build",
    status: "Concept",
    title: "AI Medical Scribe",
    plainTitle: "AI Medical Scribe",
    subtitle: "Voice-to-structured-documentation, for clinicians",
    summary:
      "An early-stage product concept: doctors speak a consultation naturally, and AI converts it into structured prescription and documentation records — cutting the time spent on paperwork instead of patients.",
    timeframe: "Independent concept / exploration",
    role: "Independent exploration",
    tech: ["Concept stage — architecture not yet built"],
    links: [],
    problem:
      "Clinical documentation eats into time doctors could spend with patients — writing up prescriptions and consultation notes by hand or by slow structured-entry forms is repetitive and error-prone.",
    whyItMatters:
      "Reducing documentation overhead is one of the more concrete, well-scoped ways AI can help in healthcare without requiring clinical decision-making — it's a transcription-and-structuring problem, not a diagnosis problem.",
    whatIBuilt: [
      "Currently a scoped product concept: voice input during a consultation → AI-assisted structuring into prescriptions and documentation.",
      "Not yet built — this is an active area of exploration, listed here deliberately as a concept rather than a shipped product.",
    ],
    architecture: [],
    features: [],
    challenges: [],
    resultsStatus: "Concept stage — no code shipped yet.",
    accent: "violet",
  },
  {
    slug: "heart-attack-detection-band",
    kind: "build",
    status: "Prototype",
    title: "Heart Attack Detection Band",
    plainTitle: "Heart Attack Detection Band",
    subtitle: "Wearable hardware + software, built solo",
    summary:
      "A solo wearable prototype that fuses heart-rate, SpO2, and ECG signals into a rule-based layer aimed at surfacing early cardiac-risk warnings in real time.",
    timeframe: "Self-initiated, during college orientation",
    role: "Solo project, built out of personal curiosity",
    tech: ["ESP32 (Bluetooth, USB-C)", "MAX30102 (heart-rate / SpO2)", "AD8232 (single-lead ECG)", "Companion mobile app"],
    links: [],
    problem:
      "Early warning signs of a cardiac event are often present in physiological signals minutes before the event itself — but usually only a clinical setting is equipped to catch them.",
    whyItMatters:
      "A low-cost wearable that fuses multiple signals rather than relying on one sensor gives a more honest picture of what's actually happening physiologically, and was a chance to work across the full hardware-to-software stack alone.",
    whatIBuilt: [
      "An ESP32-based wearable combining a MAX30102 heart-rate/SpO2 sensor and an AD8232 single-lead ECG sensor to capture real-time cardiac signals.",
      "A rule-based detection layer that fuses heart rate, blood oxygen, and ECG waveform data, aimed at surfacing early-warning indicators 15–30 minutes ahead of a potential cardiac event.",
      "Real-time alerts through an onboard buzzer and a companion Bluetooth-connected mobile app.",
    ],
    architecture: [],
    features: [
      "Multi-sensor fusion (HR, SpO2, ECG waveform)",
      "Rule-based early-warning detection layer",
      "Onboard buzzer alerts",
      "Companion Bluetooth mobile app",
    ],
    challenges: [],
    resultsStatus: "Working solo prototype.",
    accent: "amber",
  },
];

export const flagshipProjects = projects.filter((p) => p.kind === "flagship");
export const otherBuilds = projects.filter((p) => p.kind === "build");

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
