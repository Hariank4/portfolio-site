import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/content/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const accentHex: Record<string, string> = {
  coral: "#ff6b3d",
  cyan: "#6bd6e8",
  violet: "#b79bff",
  amber: "#ffc15e",
};

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const accent = project ? accentHex[project.accent] : "#ff6b3d";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          color: "#f3f1ec",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, color: accent, letterSpacing: 4 }}>
          {(project?.status ?? "PROJECT").toUpperCase()} — CASE STUDY
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 600 }}>
            {project?.plainTitle ?? "Project"}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#9c9a97", maxWidth: 900 }}>
            {project?.subtitle ?? ""}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
