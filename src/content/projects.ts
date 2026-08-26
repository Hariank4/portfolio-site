// All project / case-study content. Sourced from the CV and the 45-day
// internship report — figures like "5,000+ users" and "178+ commits" are
// quoted directly from that report, not estimated. Two projects ("flagship")
// get full case-study pages at /work/[slug]; the other two are lighter
// "also building" entries shown inline on the home page.

import type { SiteImage } from "./images";

export type ArchitectureStep = { label: string; detail: string };
export type Challenge = { challenge: string; resolution: string };
export type ProjectLink = { label: string; href: string };

/**
 * Existing approaches in the same space, and how this project differs. Optional
 * — only worth filling in where the honest answer is "this category already
 * exists, here is the specific gap I'm addressing" rather than a novelty claim.
 */
export type PriorArt = { approach: string; difference: string };

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
  priorArt?: PriorArt[];
  /** Photographs of the real thing. Optional — only cyber-saarthi has any, and
      a project with nothing to show is better off with no gallery than with a
      stock-looking filler shot. */
  gallery?: SiteImage[];
  /** A cycling carousel of related shots (team photos) sharing one cell
      beside the gallery's second image. */
  carousel?: SiteImage[];
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
    // No public link: this was a paid client engagement (MeraPath), not his
    // own product to promote traffic to.
    links: [],
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
    gallery: [
      {
        src: "/work/cs-platform.jpg",
        alt: "The Cyber सारथी platform open in a browser during a review session, showing the landing page with a photo from an awareness workshop.",
        caption: "The platform, mid-review",
      },
      {
        src: "/work/cs-recognition.jpg",
        alt: "Hariank with two members of the MeraPath team, in front of a screen showing Cyber सारथी branding.",
        caption: "MeraPath Education Ltd.",
      },
    ],
    carousel: [
      {
        src: "/work/cs-team-0.jpg",
        alt: "The Cyber सारथी team working at a table between two Cyber सारथी / MeraPath step-and-repeat banners.",
        caption: "The team",
      },
      {
        src: "/work/cs-team-1.jpg",
        alt: "The Cyber सारथी team in front of a screen showing the project's branding at the MeraPath office.",
      },
      {
        src: "/work/cs-team-2.jpg",
        alt: "Four of the Cyber सारथी team together at the MeraPath office.",
      },
      {
        src: "/work/cs-team-3.jpg",
        alt: "A group selfie with the Cyber सारथी team at the MeraPath office.",
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
    slug: "class-attendance-monitor",
    kind: "build",
    status: "Concept",
    title: "Class Attendance Monitor",
    plainTitle: "Class Attendance Monitor",
    subtitle: "Anti-proxy classroom attendance via randomized presence checkpoints",
    summary:
      "A checkpoint-verification system that marks classroom attendance by confirming presence at several server-randomized moments across a session — not a single scan — closing the most common proxy-attendance loopholes by design.",
    timeframe: "Independent concept / exploration",
    role: "Independent design study",
    tech: [
      "Concept stage — architecture designed, not yet built",
      "Progressive Web App",
      "Node.js / Python + PostgreSQL (proposed)",
      "WIFI: QR network join",
      "Local LAN-only checkpoint server",
    ],
    links: [],
    problem:
      "Manual and single-scan attendance methods — roll call, RFID taps, QR scans, one Bluetooth ping — verify presence at a single instant, not for a session's duration. That gap is easy to exploit: a student answers roll call for an absent classmate, or hands a friend their phone for a five-second check-in.",
    whyItMatters:
      "Sampling presence at several unpredictable moments across a class, instead of once, raises the cost of faking attendance from a five-second favor to coordinating detectable presence at times neither party can predict — closer to a real anti-proxy mechanism than a digital roll call. None of the individual pieces here are new: BLE, Wi-Fi, QR, geofencing and device binding have all been used for attendance before. The question this project actually asks is whether a specific combination of them — randomized, server-held checkpoints proven over a classroom-local network, in a browser — is a practical answer to the single-event problem the existing categories share.",
    whatIBuilt: [
      "Designed a checkpoint-verification architecture: the server privately picks 3 random moments in a class session and marks a student present if at least 2 are confirmed — the schedule is never sent to any client, so it can't be gamed.",
      "Iterated through three candidate architectures end to end — native BLE, web + rotating QR, web + instructor-hosted local Wi-Fi — evaluating each against real platform constraints (iOS Bluetooth restrictions, browser mixed-content rules, QR forwarding) rather than picking one and hoping.",
      "Reviewed the existing categories of automated attendance first, and concluded the individual mechanisms are all well-established — so the project is framed around whether a particular combination closes a known gap, not around inventing anything.",
      "Not yet built — this is active design work, listed here deliberately as a concept rather than a shipped product.",
    ],
    architecture: [
      {
        label: "Iteration A — Native app + BLE",
        detail:
          "Flutter app, instructor's device broadcasts a rotating BLE token. Ruled out: native iOS builds need Xcode, a Mac, and an Apple Developer account — none available for this project.",
      },
      {
        label: "Iteration B — Web + rotating QR",
        detail:
          "PWA, checkpoint QR refreshed at random moments. Ruled out: no iOS browser supports Web Bluetooth at all (a WebKit-level restriction), and a QR code is just a photographable image — forwardable to someone off-site.",
      },
      {
        label: "Iteration C — Web + instructor-hosted local Wi-Fi (recommended)",
        detail:
          "The instructor's laptop hosts the network; each checkpoint is confirmed by reaching a LAN-only endpoint. Closes the forwarding hole structurally — a screenshot has no network route to a private local IP.",
      },
    ],
    features: [
      "3 server-randomized checkpoint moments per session, never disclosed to the client, so presence can't be gamed by learning the schedule",
      "2-of-3 checkpoint threshold for a present mark — tunable, tolerant of normal Wi-Fi flakiness",
      "Manual instructor override on every session, with a required reason — treated as a first-class feature, not a fallback",
      "Standard WIFI: QR format for network join, recognized natively by the iOS and Android camera apps — no custom scanner needed",
    ],
    challenges: [
      {
        challenge:
          "No iOS browser supports Web Bluetooth at all — a WebKit-level restriction, not a background-mode limitation",
        resolution:
          "Dropped BLE entirely for the web path rather than building a platform-specific fallback; the local-Wi-Fi mechanism works identically on iOS and Android through one code path.",
      },
      {
        challenge:
          "A photographed QR code can be forwarded to someone outside the room and redeemed remotely",
        resolution:
          "Moved the checkpoint check to a LAN-only endpoint hosted on the instructor's device — a forwarded screenshot has no route to a private local IP, closing the hole structurally instead of patching it with geofencing.",
      },
      {
        challenge:
          "A background fetch() from the app's HTTPS page to the instructor's plain-HTTP local server is silently blocked by mixed-content rules",
        resolution:
          "Caught in design review before implementation: checkpoint confirmation is done as a full page navigation instead of a background request, since mixed-content restrictions apply to subresource fetches, not top-level navigation.",
      },
    ],
    priorArt: [
      {
        approach:
          "RFID / smart-card swipe — a card tapped against a reader on the way in.",
        difference:
          "A card is transferable: hand it to a classmate and the system records you as present. Presence here is tied to a device already bound to one account, and re-checked at moments neither party knows in advance.",
      },
      {
        approach:
          "Biometric — fingerprint or face at a fixed station.",
        difference:
          "Hard to fake, but needs dedicated hardware in every room, queues at high enrolment, and still only proves you were at the door once. This needs no hardware beyond a laptop, and samples across the session rather than at entry.",
      },
      {
        approach:
          "Static QR / barcode — one code displayed or posted, scanned once.",
        difference:
          "A code is just an image: photograph it, send it to a friend at home, and they redeem it. Confirmation here requires reaching an endpoint that only exists on the room's network, which a forwarded screenshot cannot route to.",
      },
      {
        approach:
          "GPS / geofencing — device location checked against a radius.",
        difference:
          "Indoor GPS drifts well beyond a single room and is spoofable with mock-location tooling. Network reachability is a coarser signal about the world, but a much harder one to fake from a bedroom.",
      },
      {
        approach:
          "Single-ping Bluetooth or Wi-Fi check-in — one detection marks you present.",
        difference:
          "This is the closest relative, and the gap it leaves is the whole point: it detects arrival, not attendance. A device can be handed over or walked out the moment the ping lands. Repeated randomized checkpoints are what turn a single event into a sampled one.",
      },
    ],
    resultsStatus:
      "Concept stage — three architectures designed and compared against the existing categories above. No code shipped yet, and no claim that any individual mechanism is novel; the open question is whether this particular combination measurably improves proxy resistance, which would take a built prototype and real testing to answer.",
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
    tech: ["ESP32 (Bluetooth, USB-C)", "MAX30100 (heart-rate / SpO2)", "AD8232 (single-lead ECG)", "Companion mobile app"],
    links: [],
    problem:
      "Early warning signs of a cardiac event are often present in physiological signals minutes before the event itself — but usually only a clinical setting is equipped to catch them.",
    whyItMatters:
      "A low-cost wearable that fuses multiple signals rather than relying on one sensor gives a more honest picture of what's actually happening physiologically, and was a chance to work across the full hardware-to-software stack alone.",
    whatIBuilt: [
      "An ESP32-based wearable combining a MAX30100 heart-rate/SpO2 sensor and an AD8232 single-lead ECG sensor to capture real-time cardiac signals.",
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
    challenges: [
      {
        challenge:
          "Research surfaced sweat lactate as a physiological stress signal relevant to cardiac risk, detectable via an enzymatic lactate sensor.",
        resolution:
          "Those sensors are cost-prohibitive and not sold as off-the-shelf consumer hardware, so the signal was scoped out. The shipped prototype fuses HR, SpO2, and ECG instead — all from sensors (MAX30100, AD8232) that are actually accessible to a solo, self-funded build.",
      },
    ],
    gallery: [
      {
        src: "/work/band-reading.jpg",
        alt: "The prototype taking a live reading — the pulse sensor lit against a fingertip, wired to an ESP32 on a breadboard.",
        caption: "Taking a reading",
      },
      {
        src: "/work/band-pulse-sensor.jpg",
        alt: "The MAX30100 pulse and blood-oxygen sensor breakout board held between two fingers.",
        caption: "MAX30100 pulse / SpO₂",
      },
      {
        src: "/work/band-ecg.jpg",
        alt: "The AD8232 single-lead ECG breakout wired on the breadboard, with electrode leads plugged into its jack.",
        caption: "AD8232 single-lead ECG",
      },
      {
        src: "/work/band-esp32.jpg",
        alt: "The ESP32 development board seated on the breadboard, powered over USB-C.",
        caption: "ESP32",
      },
    ],
    resultsStatus: "Working solo prototype.",
    accent: "amber",
  },
];

export const flagshipProjects = projects.filter((p) => p.kind === "flagship");
export const otherBuilds = projects.filter((p) => p.kind === "build");

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
