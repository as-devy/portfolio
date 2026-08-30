import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { siteConfig } from "@/data/site";

// Image metadata
export const alt = siteConfig.title;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Read assets once at module scope (statically optimized)
const heroData = await readFile(
  join(process.cwd(), "public/images/hero-img.jpg"),
  "base64",
);
const heroSrc = `data:image/jpeg;base64,${heroData}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background: "#05070d",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(232,237,247,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(232,237,247,0.035) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Cyan glow orb - top-left */}
        <div
          style={{
            position: "absolute",
            top: "-180px",
            left: "-120px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Violet glow orb - bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "-160px",
            right: "340px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,108,255,0.14) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Left content panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "64px 56px",
            flex: 1,
            zIndex: 2,
          }}
        >
          {/* Accent badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#22d3ee",
                boxShadow: "0 0 10px #22d3ee",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: "15px",
                color: "#22d3ee",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Portfolio
            </span>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: "62px",
              fontWeight: 800,
              color: "#e8edf7",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Omar</span>
            <span>Elbedwehy</span>
          </div>

          {/* Role pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "40px",
            }}
          >
            {["Full-Stack Dev", "UI/UX Designer", "Security"].map((role) => (
              <div
                key={role}
                style={{
                  display: "flex",
                  padding: "7px 16px",
                  borderRadius: "999px",
                  border: "1px solid rgba(34,211,238,0.3)",
                  background: "rgba(34,211,238,0.08)",
                  fontSize: "15px",
                  color: "#22d3ee",
                  fontWeight: 500,
                }}
              >
                {role}
              </div>
            ))}
          </div>

          {/* URL */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "2px",
                background: "#22d3ee",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: "16px",
                color: "#8b95a8",
                letterSpacing: "0.04em",
              }}
            >
              omar-elbedwehy.vercel.app
            </span>
          </div>
        </div>

        {/* Right: hero photo */}
        <div
          style={{
            position: "relative",
            width: "380px",
            height: "630px",
            display: "flex",
            flexShrink: 0,
          }}
        >
          {/* Gradient fade on the left edge of the photo */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "120px",
              background: "linear-gradient(90deg, #05070d 0%, transparent 100%)",
              zIndex: 2,
              display: "flex",
            }}
          />
          {/* Gradient fade at the bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "180px",
              background: "linear-gradient(0deg, #05070d 0%, transparent 100%)",
              zIndex: 2,
              display: "flex",
            }}
          />
          <img
            src={heroSrc}
            style={{
              width: "380px",
              height: "630px",
              objectFit: "cover",
              objectPosition: "50% 18%",
              opacity: 0.85,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
