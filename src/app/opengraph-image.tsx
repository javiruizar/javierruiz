import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 15% 10%, #10204a 0%, #050508 55%)",
          color: "#f0f0f5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #2563eb, #0891b2)",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            JR
          </div>
          <div style={{ fontSize: 34, fontWeight: 600 }}>Javier Ruiz</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Diseño web, SEO y Google Business
          </div>
          <div style={{ fontSize: 34, color: "#60a5fa" }}>Pozoblanco · Los Pedroches · Toda España</div>
        </div>
        <div style={{ fontSize: 26, color: "#8b8ba7" }}>javierruiz.org</div>
      </div>
    ),
    size
  );
}
